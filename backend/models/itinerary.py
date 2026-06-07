"""Pydantic models for itinerary request/response."""

from __future__ import annotations

from datetime import date
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


# ── Enums ──


class GroupType(str, Enum):
    SOLO = "solo"
    COUPLE = "couple"
    FAMILY = "family"
    FRIENDS = "friends"


class TravelStyle(str, Enum):
    ADVENTURE = "adventure"
    HERITAGE = "heritage"
    RELAXATION = "relaxation"
    FOOD = "food"
    NATURE = "nature"
    SPIRITUAL = "spiritual"
    NIGHTLIFE = "nightlife"
    SHOPPING = "shopping"


# ── Request ──


class ItineraryRequest(BaseModel):
    destination: str = Field(..., min_length=1, max_length=200, examples=["Goa"])
    start_date: date = Field(..., examples=["2026-01-15"])
    duration_days: int = Field(..., ge=1, le=30, examples=[5])
    group_size: int = Field(..., ge=1, le=20, examples=[4])
    group_type: GroupType = Field(default=GroupType.FRIENDS, examples=["friends"])
    budget_per_head_inr: int = Field(..., ge=1000, le=500000, examples=[18000])
    travel_style: list[TravelStyle] = Field(
        default_factory=lambda: [TravelStyle.ADVENTURE],
        examples=[["adventure", "food"]],
    )


# ── Response Sub-Models ──


class TransportInfo(BaseModel):
    to_destination: str
    local: str


class AccommodationInfo(BaseModel):
    name: str
    type: str
    cost_per_night_inr: int
    booking_url: Optional[str] = None


class DayPlan(BaseModel):
    day: int
    theme: str
    morning: str
    afternoon: str
    evening: str
    estimated_spend_inr: int


# ── Response ──


class ItineraryResponse(BaseModel):
    id: str = Field(..., description="Unique itinerary ID")
    destination: str
    duration_days: int
    cost_per_head_inr: int
    transport: TransportInfo
    accommodation: AccommodationInfo
    days: list[DayPlan]
    tips: list[str] = Field(default_factory=list)
    warnings: list[str] = Field(default_factory=list)


class GenerateErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None
