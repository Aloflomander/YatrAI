"""Itinerary generation API router."""

from __future__ import annotations

import logging

from fastapi import APIRouter, HTTPException

from backend.models.itinerary import (
    GenerateErrorResponse,
    ItineraryRequest,
    ItineraryResponse,
)
from backend.services.claude_service import generate_itinerary

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/itinerary", tags=["Itinerary"])


@router.post(
    "/generate",
    response_model=ItineraryResponse,
    responses={
        500: {"model": GenerateErrorResponse, "description": "AI generation failed"},
        504: {"model": GenerateErrorResponse, "description": "AI service timed out"},
    },
    summary="Generate an AI-powered travel itinerary",
)
async def generate(request: ItineraryRequest) -> ItineraryResponse:
    """Accept trip preferences and return a Claude-generated itinerary."""
    try:
        itinerary = await generate_itinerary(request)
        return itinerary
    except TimeoutError:
        raise HTTPException(
            status_code=504,
            detail="The AI service timed out. Please try again.",
        )
    except ValueError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate itinerary: {e}",
        )
    except Exception as e:
        logger.exception("Unexpected error during itinerary generation")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again later.",
        )
