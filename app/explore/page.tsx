"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* ── Types ── */

interface Destination {
  id: string;
  name: string;
  location: string;
  country: string;
  category: string;
  best_season: string;
  image_url: string;
  tagline: string;
  is_domestic: boolean;
}

type TabFilter = "all" | "domestic" | "international";
type CategoryFilter = "all" | "beach" | "hill" | "heritage" | "adventure";

/* ── Fallback Data ── */

const FALLBACK_DESTINATIONS: Destination[] = [
  {
    id: "goa",
    name: "Goa",
    location: "Goa",
    country: "India",
    category: "beach",
    best_season: "Nov-Feb",
    image_url:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    tagline: "Sun, sand, and susegad — India's beach paradise",
    is_domestic: true,
  },
  {
    id: "jaipur",
    name: "Jaipur",
    location: "Rajasthan",
    country: "India",
    category: "heritage",
    best_season: "Oct-Mar",
    image_url:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
    tagline: "The Pink City — where every palace tells a story",
    is_domestic: true,
  },
  {
    id: "munnar",
    name: "Munnar",
    location: "Kerala",
    country: "India",
    category: "hill",
    best_season: "Sep-May",
    image_url:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80",
    tagline: "Rolling tea plantations in the Western Ghats",
    is_domestic: true,
  },
  {
    id: "bali",
    name: "Bali",
    location: "Bali",
    country: "Indonesia",
    category: "beach",
    best_season: "Apr-Oct",
    image_url:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    tagline: "Temples, rice terraces, and turquoise surf",
    is_domestic: false,
  },
];

/* ── Constants ── */

const tabs: { value: TabFilter; label: string }[] = [
  { value: "all", label: "All Destinations" },
  { value: "domestic", label: "Domestic" },
  { value: "international", label: "International" },
];

const categoryTags: { value: CategoryFilter; label: string; icon: string }[] = [
  { value: "all", label: "All", icon: "apps" },
  { value: "beach", label: "Beach", icon: "beach_access" },
  { value: "hill", label: "Hill Station", icon: "landscape" },
  { value: "heritage", label: "Heritage", icon: "museum" },
  { value: "adventure", label: "Adventure", icon: "hiking" },
];

/* ── Skeleton Component ── */

function SkeletonCard() {
  return (
    <div className="bg-surface-white rounded-xl overflow-hidden shadow-sm border border-outline-variant/20 animate-pulse">
      <div className="h-52 bg-outline-variant/20" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-outline-variant/20 rounded w-3/4" />
        <div className="h-4 bg-outline-variant/20 rounded w-full" />
        <div className="flex gap-2">
          <div className="h-6 bg-outline-variant/20 rounded-full w-20" />
          <div className="h-6 bg-outline-variant/20 rounded-full w-16" />
        </div>
      </div>
    </div>
  );
}

/* ── Page Component ── */

export default function ExplorePage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* ── Fetch destinations on mount ── */
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/destinations");
        if (!res.ok) throw new Error("API error");
        const data: Destination[] = await res.json();
        setDestinations(data);
      } catch {
        // Silent fallback to hardcoded data
        setDestinations(FALLBACK_DESTINATIONS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  /* ── Client-side filtering ── */
  const filteredDestinations = destinations.filter((d) => {
    // Tab filter
    if (activeTab === "domestic" && !d.is_domestic) return false;
    if (activeTab === "international" && d.is_domestic) return false;

    // Category filter
    if (activeCategory !== "all" && d.category !== activeCategory) return false;

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        d.name.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.tagline.toLowerCase().includes(q)
      );
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-surface-container-low">
      {/* ═══════════════════════════════════════
          HERO HEADER
         ═══════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-primary to-[#095555] text-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-12 md:py-16">
          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Explore Destinations
          </h1>
          <p className="text-primary-light/80 text-base md:text-lg mb-8 max-w-xl">
            Discover India&apos;s most stunning locations and international gems
            handpicked for Indian travelers.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
              search
            </span>
            <input
              id="explore-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FILTERS
         ═══════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 pt-8 pb-2">
        {/* Type Tabs */}
        <div className="flex gap-1 bg-surface-white rounded-xl p-1.5 border border-outline-variant/20 shadow-sm w-fit mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === tab.value
                  ? "bg-primary text-white shadow-md"
                  : "text-on-surface-variant hover:bg-primary/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-3">
          {categoryTags.map((tag) => (
            <button
              key={tag.value}
              onClick={() => setActiveCategory(tag.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === tag.value
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface-white border border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-base">{tag.icon}</span>
              {tag.label}
            </button>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          DESTINATION GRID
         ═══════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-8">
        {/* Results Count */}
        {!isLoading && (
          <p className="text-sm text-on-surface-variant mb-6">
            Showing{" "}
            <span className="font-bold text-on-surface">
              {filteredDestinations.length}
            </span>{" "}
            destination{filteredDestinations.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredDestinations.length === 0 && (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-outline-variant/40 mb-4 block">
              travel_explore
            </span>
            <h3
              className="text-xl font-bold text-on-surface mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              No destinations found
            </h3>
            <p className="text-on-surface-variant mb-6">
              Try adjusting your filters or search query.
            </p>
            <button
              onClick={() => {
                setActiveTab("all");
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="text-primary font-semibold text-sm hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Destination Cards */}
        {!isLoading && filteredDestinations.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest, index) => (
              <Link
                href={`/plan?destination=${encodeURIComponent(dest.name)}`}
                key={dest.id}
                className={`group bg-surface-white rounded-xl overflow-hidden shadow-sm border border-outline-variant/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  index === 0 ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${
                    index === 0 ? "h-64 md:h-80" : "h-52"
                  }`}
                >
                  <img
                    src={dest.image_url}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-on-surface capitalize">
                    {dest.category === "hill" ? "Hill Station" : dest.category}
                  </span>

                  {/* Domestic/International Badge */}
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                      dest.is_domestic
                        ? "bg-primary/90 text-white"
                        : "bg-accent-saffron/90 text-white"
                    }`}
                  >
                    {dest.is_domestic ? "Domestic" : "International"}
                  </span>

                  {/* Bottom overlay info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3
                      className={`font-bold text-white mb-1 ${
                        index === 0 ? "text-2xl" : "text-lg"
                      }`}
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {dest.name}
                    </h3>
                    <p className="text-white/80 text-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        location_on
                      </span>
                      {dest.location}, {dest.country}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                    {dest.tagline}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                      <span className="material-symbols-outlined text-sm">
                        wb_sunny
                      </span>
                      Best: {dest.best_season}
                    </span>
                    <span className="text-sm font-semibold text-accent-saffron flex items-center gap-1 group-hover:gap-2 transition-all">
                      Plan Trip
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
