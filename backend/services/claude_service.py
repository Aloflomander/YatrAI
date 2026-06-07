"""Claude API integration for AI itinerary generation."""

from __future__ import annotations

import json
import logging
import os
import uuid
from pathlib import Path
from typing import Any

from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / ".env")

import anthropic

from backend.models.itinerary import (
    AccommodationInfo,
    DayPlan,
    ItineraryRequest,
    ItineraryResponse,
    TransportInfo,
)

logger = logging.getLogger(__name__)

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
MODEL = "claude-sonnet-4-5"
MAX_TOKENS = 2000
TEMPERATURE = 0.7


def _build_system_prompt() -> str:
    """India-focused travel agent system prompt."""
    return """You are YatrAI, an expert Indian travel planner with deep knowledge of:
- Indian Railways (IRCTC routes, train names, class options, realistic fares in INR)
- Indian road conditions, state transport buses, local auto/cab pricing
- Budget accommodation (OYO, Zostel, dharamshalas for pilgrimage routes)
- Indian dietary needs (pure veg, Jain food, halal options)
- Seasonal patterns: hill station closures (Rohtang Nov-May), 
  monsoon alerts (Goa/Kerala June-Sept), pilgrimage crowds (Char Dham May-June)
- Local hidden gems beyond tourist traps
- Realistic INR pricing for Indian travelers (not USD tourist pricing)

For international destinations, provide:
- Best flight routes from major Indian cities (Delhi/Mumbai/Bengaluru)
- Visa requirements for Indian passport holders
- Currency exchange tips and realistic daily budgets in INR equivalent

Always respond ONLY with valid JSON matching the exact schema provided. 
No markdown, no explanation, no preamble. Just the JSON object."""


def _build_user_prompt(params: ItineraryRequest) -> str:
    """Construct the user prompt from request parameters."""
    styles = ", ".join(s.value for s in params.travel_style)
    return f"""Generate a {params.duration_days}-day itinerary for {params.destination}.

Trip details:
- Group: {params.group_size} people, type: {params.group_type.value}
- Budget: ₹{params.budget_per_head_inr:,} per head total
- Travel style: {styles}
- Start date: {params.start_date.isoformat()}

Return ONLY this JSON schema (no other text):
{{
  "destination": "{params.destination}",
  "duration_days": {params.duration_days},
  "cost_per_head_inr": <number>,
  "transport": {{
    "to_destination": "<string>",
    "local": "<string>"
  }},
  "accommodation": {{
    "name": "<string>",
    "type": "<string>",
    "cost_per_night_inr": <number>,
    "booking_url": null
  }},
  "days": [
    {{
      "day": <number>,
      "theme": "<string>",
      "morning": "<string>",
      "afternoon": "<string>",
      "evening": "<string>",
      "estimated_spend_inr": <number>
    }}
  ],
  "tips": ["<string>"],
  "warnings": ["<string>"]
}}"""


async def generate_itinerary(params: ItineraryRequest) -> ItineraryResponse:
    """Call Claude to generate a structured travel itinerary.

    Falls back to mock data if ANTHROPIC_API_KEY is not set.
    """
    if not ANTHROPIC_API_KEY:
        logger.warning("ANTHROPIC_API_KEY not set — returning mock itinerary")
        return _mock_itinerary(params)

    client = anthropic.AsyncAnthropic(api_key=ANTHROPIC_API_KEY)

    try:
        message = await client.messages.create(
            model=MODEL,
            max_tokens=MAX_TOKENS,
            temperature=TEMPERATURE,
            system=_build_system_prompt(),
            messages=[
                {"role": "user", "content": _build_user_prompt(params)},
            ],
        )

        # Extract text content from the response
        raw_text = message.content[0].text
        # Strip markdown fences if Claude wraps it
        if raw_text.startswith("```"):
            raw_text = raw_text.split("\n", 1)[1]
            raw_text = raw_text.rsplit("```", 1)[0]

        data: dict[str, Any] = json.loads(raw_text)

        return ItineraryResponse(
            id=uuid.uuid4().hex[:12],
            destination=data["destination"],
            duration_days=data["duration_days"],
            cost_per_head_inr=data["cost_per_head_inr"],
            transport=TransportInfo(**data["transport"]),
            accommodation=AccommodationInfo(**data["accommodation"]),
            days=[DayPlan(**d) for d in data["days"]],
            tips=data.get("tips", []),
            warnings=data.get("warnings", []),
        )

    except anthropic.APITimeoutError:
        logger.error("Claude API timed out")
        raise
    except anthropic.APIError as e:
        logger.error("Claude API error: %s", e)
        raise
    except (json.JSONDecodeError, KeyError, TypeError) as e:
        logger.error("Failed to parse Claude response: %s — falling back to mock", e)
        return _mock_itinerary(params)


# ── Mock Fallback ──


def _mock_itinerary(params: ItineraryRequest) -> ItineraryResponse:
    """Return a realistic mock itinerary when no API key is available."""
    mock_days = []
    activities = [
        {
            "theme": "Arrival & Exploration",
            "morning": "Arrive and check into your accommodation. Freshen up and grab a local breakfast.",
            "afternoon": f"Explore the main attractions of {params.destination}. Stop for lunch at a popular local restaurant — try the regional specialty.",
            "evening": "Evening walk through the market area. Dinner at a well-reviewed restaurant nearby.",
        },
        {
            "theme": "Cultural Immersion",
            "morning": "Visit the most iconic landmark/temple/beach of the area. Hire a local guide for deeper insights.",
            "afternoon": "Lunch at a heritage restaurant. Afternoon visit to a museum or cultural center.",
            "evening": "Sunset viewpoint visit. Street food tour for dinner — try 3-4 local snacks.",
        },
        {
            "theme": "Adventure & Nature",
            "morning": "Early morning nature activity — trekking, boat ride, or cycling through scenic routes.",
            "afternoon": "Packed lunch at a scenic spot. Visit a waterfall, national park, or beach.",
            "evening": "Relaxation at the accommodation. Dinner at a rooftop/garden restaurant.",
        },
        {
            "theme": "Local Life & Shopping",
            "morning": "Visit a local morning market. Interact with artisans and craftspeople.",
            "afternoon": "Cooking class or food tour. Learn to make a signature local dish.",
            "evening": "Shopping for souvenirs at the main bazaar. Farewell dinner at the best-rated restaurant.",
        },
        {
            "theme": "Departure Day",
            "morning": "Leisurely breakfast. Pack and check out.",
            "afternoon": "Last-minute sightseeing or revisit a favorite spot.",
            "evening": "Head to the station/airport. Depart with memories.",
        },
    ]

    daily_budget = params.budget_per_head_inr // max(params.duration_days, 1)

    for i in range(params.duration_days):
        act = activities[i % len(activities)]
        mock_days.append(
            DayPlan(
                day=i + 1,
                theme=act["theme"],
                morning=act["morning"],
                afternoon=act["afternoon"],
                evening=act["evening"],
                estimated_spend_inr=daily_budget,
            )
        )

    return ItineraryResponse(
        id=uuid.uuid4().hex[:12],
        destination=params.destination,
        duration_days=params.duration_days,
        cost_per_head_inr=params.budget_per_head_inr,
        transport=TransportInfo(
            to_destination=f"Train/Flight to {params.destination} — ₹{params.budget_per_head_inr // 5:,}",
            local="Auto-rickshaw/Cab — ₹300-500/day",
        ),
        accommodation=AccommodationInfo(
            name=f"Zostel {params.destination}"
            if daily_budget < 5000
            else f"Taj {params.destination}",
            type="Hostel" if daily_budget < 5000 else "Hotel",
            cost_per_night_inr=min(daily_budget // 3, 8000),
            booking_url=None,
        ),
        days=mock_days,
        tips=[
            f"Best time to visit {params.destination} depends on the season — check before booking.",
            "Carry a power bank and download offline maps.",
            "UPI (Google Pay/PhonePe) is widely accepted — carry some cash as backup.",
            "Book train tickets 2-3 months in advance on IRCTC for confirmed berths.",
        ],
        warnings=[
            "Check weather alerts before traveling during monsoon season (Jun-Sept).",
            "Verify COVID/local travel restrictions if any.",
        ],
    )
