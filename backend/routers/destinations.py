"""Destinations API router."""

from __future__ import annotations

from typing import Optional

from fastapi import APIRouter, Query

from backend.services.destinations_service import Destination, get_destinations

router = APIRouter(prefix="/api/destinations", tags=["Destinations"])


@router.get(
    "",
    response_model=list[Destination],
    summary="List travel destinations with optional filters",
)
async def list_destinations(
    category: Optional[str] = Query(
        None,
        description="Filter by category: beach, hill, heritage, adventure",
        examples=["beach"],
    ),
    type: Optional[str] = Query(
        None,
        description="Filter by type: domestic, international",
        examples=["domestic"],
    ),
) -> list[Destination]:
    """Return destinations, optionally filtered by category and/or type."""
    return get_destinations(category=category, dest_type=type)
