"""Static destination data for the Explore page."""

from __future__ import annotations

from typing import Optional

from pydantic import BaseModel


class Destination(BaseModel):
    id: str
    name: str
    location: str
    country: str
    category: str  # beach, hill, heritage, adventure
    best_season: str
    image_url: str
    tagline: str
    is_domestic: bool


# ── Hardcoded Destination Catalog ──

DESTINATIONS: list[Destination] = [
    Destination(
        id="agra",
        name="Agra",
        location="Uttar Pradesh",
        country="India",
        category="heritage",
        best_season="Oct-Mar",
        image_url="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
        tagline="Home of the Taj Mahal — a monument to eternal love",
        is_domestic=True,
    ),
    Destination(
        id="goa",
        name="Goa",
        location="Goa",
        country="India",
        category="beach",
        best_season="Nov-Feb",
        image_url="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
        tagline="Sun, sand, and susegad — India's beach paradise",
        is_domestic=True,
    ),
    Destination(
        id="munnar",
        name="Munnar",
        location="Kerala",
        country="India",
        category="hill",
        best_season="Sep-May",
        image_url="https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80",
        tagline="Rolling tea plantations in the Western Ghats",
        is_domestic=True,
    ),
    Destination(
        id="jaipur",
        name="Jaipur",
        location="Rajasthan",
        country="India",
        category="heritage",
        best_season="Oct-Mar",
        image_url="https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
        tagline="The Pink City — where every palace tells a story",
        is_domestic=True,
    ),
    Destination(
        id="rishikesh",
        name="Rishikesh",
        location="Uttarakhand",
        country="India",
        category="adventure",
        best_season="Sep-Nov",
        image_url="https://images.unsplash.com/photo-1583396618422-03cd6fa1bfc0?w=800&q=80",
        tagline="Rafting, yoga, and the sacred Ganga — adventure meets spirituality",
        is_domestic=True,
    ),
    Destination(
        id="andaman",
        name="Andaman Islands",
        location="Andaman & Nicobar",
        country="India",
        category="beach",
        best_season="Oct-May",
        image_url="https://images.unsplash.com/photo-1589979481223-deb893043163?w=800&q=80",
        tagline="Crystal-clear waters and untouched coral reefs",
        is_domestic=True,
    ),
    Destination(
        id="shimla",
        name="Shimla",
        location="Himachal Pradesh",
        country="India",
        category="hill",
        best_season="Mar-Jun",
        image_url="https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800&q=80",
        tagline="The Queen of Hills — colonial charm meets mountain magic",
        is_domestic=True,
    ),
    Destination(
        id="hampi",
        name="Hampi",
        location="Karnataka",
        country="India",
        category="heritage",
        best_season="Oct-Feb",
        image_url="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80",
        tagline="Ruins of the Vijayanagara Empire — a UNESCO World Heritage Site",
        is_domestic=True,
    ),
    # ── International ──
    Destination(
        id="bali",
        name="Bali",
        location="Bali",
        country="Indonesia",
        category="beach",
        best_season="Apr-Oct",
        image_url="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
        tagline="Temples, rice terraces, and turquoise surf",
        is_domestic=False,
    ),
    Destination(
        id="paris",
        name="Paris",
        location="Île-de-France",
        country="France",
        category="heritage",
        best_season="Apr-Jun",
        image_url="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
        tagline="The City of Light — art, romance, and croissants",
        is_domestic=False,
    ),
    Destination(
        id="swiss-alps",
        name="Swiss Alps",
        location="Bernese Oberland",
        country="Switzerland",
        category="adventure",
        best_season="Dec-Mar",
        image_url="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
        tagline="Snow-capped peaks and chocolate-box villages",
        is_domestic=False,
    ),
    Destination(
        id="dubai",
        name="Dubai",
        location="Dubai",
        country="UAE",
        category="adventure",
        best_season="Nov-Mar",
        image_url="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        tagline="Futuristic skyline meets golden desert dunes",
        is_domestic=False,
    ),
]


def get_destinations(
    category: Optional[str] = None,
    dest_type: Optional[str] = None,
) -> list[Destination]:
    """Filter destinations by category and/or domestic/international type."""
    results = DESTINATIONS

    if category:
        results = [d for d in results if d.category == category.lower()]

    if dest_type:
        if dest_type.lower() == "domestic":
            results = [d for d in results if d.is_domestic]
        elif dest_type.lower() == "international":
            results = [d for d in results if not d.is_domestic]

    return results
