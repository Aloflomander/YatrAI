"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* ── Types matching backend ItineraryResponse ── */

interface TransportInfo {
  to_destination: string;
  local: string;
}

interface AccommodationInfo {
  name: string;
  type: string;
  cost_per_night_inr: number;
  booking_url: string | null;
}

interface DayPlan {
  day: number;
  theme: string;
  morning: string;
  afternoon: string;
  evening: string;
  estimated_spend_inr: number;
}

interface Itinerary {
  id: string;
  destination: string;
  duration_days: number;
  cost_per_head_inr: number;
  transport: TransportInfo;
  accommodation: AccommodationInfo;
  days: DayPlan[];
  tips: string[];
  warnings: string[];
}

interface TripContext {
  groupSize: number;
  groupType: string;
  startDate: string;
}

/* ── Helpers ── */

function formatINR(amount: number): string {
  return amount.toLocaleString("en-IN");
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "Flexible dates";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ── Component ── */

export default function ItineraryResultPage() {
  const router = useRouter();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [tripContext, setTripContext] = useState<TripContext | null>(null);
  const [expandedDay, setExpandedDay] = useState<number>(1);

  useEffect(() => {
    const stored = localStorage.getItem("yatrai_itinerary");
    const context = localStorage.getItem("yatrai_trip_context");

    if (!stored) {
      router.push("/plan");
      return;
    }

    try {
      setItinerary(JSON.parse(stored));
      if (context) setTripContext(JSON.parse(context));
    } catch {
      router.push("/plan");
    }
  }, [router]);

  const handleSaveTrip = () => {
    router.push('/login?redirect=save');
  };

  if (!itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-container-low">
        <div className="flex items-center gap-3 text-primary">
          <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span className="font-semibold">Loading your itinerary...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-low pb-24">
      {/* ═══════════════════════════════════════
          HEADER BAR — Teal gradient
         ═══════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-primary to-[#095555] text-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left: Destination Info */}
            <div>
              <p className="text-primary-light/80 text-sm font-semibold mb-1 uppercase tracking-wider">
                Your AI-Generated Itinerary
              </p>
              <h1
                className="text-3xl md:text-4xl font-bold mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {itinerary.destination}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">calendar_month</span>
                  {tripContext?.startDate
                    ? formatDate(tripContext.startDate)
                    : "Flexible dates"}{" "}
                  · {itinerary.duration_days} days
                </span>
                <span className="bg-accent-saffron px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-md">
                  ₹{formatINR(itinerary.cost_per_head_inr)} / head
                </span>
              </div>
            </div>

            {/* Right: Save Button */}
            <button
              onClick={handleSaveTrip}
              className="flex items-center gap-2 px-6 py-3 rounded-[50px] border-2 border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-base">bookmark_add</span>
              Save Trip
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SUMMARY CARDS ROW
         ═══════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Transport Card */}
          <div className="bg-surface-white rounded-xl p-6 shadow-md border border-outline-variant/20">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-primary text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  directions
                </span>
              </div>
              <h3 className="font-bold text-on-surface" style={{ fontFamily: "var(--font-heading)" }}>
                Transport
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-primary mt-0.5">
                  flight
                </span>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {itinerary.transport.to_destination}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-primary mt-0.5">
                  directions_car
                </span>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {itinerary.transport.local}
                </p>
              </div>
            </div>
          </div>

          {/* Accommodation Card */}
          <div className="bg-surface-white rounded-xl p-6 shadow-md border border-outline-variant/20">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-primary text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  hotel
                </span>
              </div>
              <h3 className="font-bold text-on-surface" style={{ fontFamily: "var(--font-heading)" }}>
                Accommodation
              </h3>
            </div>
            <p className="font-semibold text-on-surface text-base mb-1">
              {itinerary.accommodation.name}
            </p>
            <p className="text-sm text-on-surface-variant mb-3">
              {itinerary.accommodation.type}
            </p>
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
              ₹{formatINR(itinerary.accommodation.cost_per_night_inr)} / night
            </span>
          </div>

          {/* Trip Stats Card */}
          <div className="bg-surface-white rounded-xl p-6 shadow-md border border-outline-variant/20">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-primary text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  analytics
                </span>
              </div>
              <h3 className="font-bold text-on-surface" style={{ fontFamily: "var(--font-heading)" }}>
                Trip Stats
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {itinerary.duration_days}
                </p>
                <p className="text-xs text-on-surface-variant font-medium">Days</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {tripContext?.groupSize || "—"}
                </p>
                <p className="text-xs text-on-surface-variant font-medium">Travelers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent-saffron">
                  ₹{formatINR(itinerary.cost_per_head_inr)}
                </p>
                <p className="text-xs text-on-surface-variant font-medium">Per Head</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent-saffron capitalize">
                  {tripContext?.groupType || "—"}
                </p>
                <p className="text-xs text-on-surface-variant font-medium">Group Type</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          DAY-BY-DAY SECTION
         ═══════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 mt-10">
        <h2
          className="text-xl md:text-2xl font-bold text-on-surface mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Day-by-Day Itinerary
        </h2>

        <div className="space-y-4">
          {itinerary.days.map((day) => {
            const isOpen = expandedDay === day.day;
            return (
              <div
                key={day.day}
                className="bg-surface-white rounded-xl border border-outline-variant/20 shadow-sm overflow-hidden transition-shadow hover:shadow-md"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setExpandedDay(isOpen ? -1 : day.day)}
                  className="w-full flex items-center justify-between px-6 py-5 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {day.day}
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-on-surface text-base">
                        Day {day.day} — {day.theme}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block bg-accent-saffron/10 text-accent-saffron px-3 py-1 rounded-full text-xs font-bold">
                      ₹{formatINR(day.estimated_spend_inr)}
                    </span>
                    <span
                      className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </div>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-6 pb-6 border-t border-outline-variant/20 animate-fade-in-up">
                    {/* Spend badge (mobile) */}
                    <div className="sm:hidden mt-4 mb-4">
                      <span className="bg-accent-saffron/10 text-accent-saffron px-3 py-1 rounded-full text-xs font-bold">
                        Estimated spend: ₹{formatINR(day.estimated_spend_inr)}
                      </span>
                    </div>

                    {/* Morning */}
                    <div className="flex gap-4 py-4 border-b border-outline-variant/10">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center">
                          <span className="material-symbols-outlined text-amber-600 text-lg">
                            wb_sunny
                          </span>
                        </div>
                        <div className="w-[2px] flex-1 bg-outline-variant/20 mt-2" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-accent-saffron uppercase tracking-wider mb-1">
                          Morning
                        </p>
                        <p className="text-sm text-on-surface leading-relaxed">
                          {day.morning}
                        </p>
                      </div>
                    </div>

                    {/* Afternoon */}
                    <div className="flex gap-4 py-4 border-b border-outline-variant/10">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center">
                          <span className="material-symbols-outlined text-sky-600 text-lg">
                            wb_cloudy
                          </span>
                        </div>
                        <div className="w-[2px] flex-1 bg-outline-variant/20 mt-2" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
                          Afternoon
                        </p>
                        <p className="text-sm text-on-surface leading-relaxed">
                          {day.afternoon}
                        </p>
                      </div>
                    </div>

                    {/* Evening */}
                    <div className="flex gap-4 py-4">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="material-symbols-outlined text-indigo-600 text-lg">
                            dark_mode
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                          Evening
                        </p>
                        <p className="text-sm text-on-surface leading-relaxed">
                          {day.evening}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TIPS & WARNINGS
         ═══════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tips */}
          {itinerary.tips.length > 0 && (
            <div className="bg-surface-white rounded-xl p-6 shadow-sm border border-outline-variant/20">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="material-symbols-outlined text-green-600"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  lightbulb
                </span>
                <h3
                  className="font-bold text-on-surface"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Pro Tips
                </h3>
              </div>
              <ul className="space-y-3">
                {itinerary.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-500 text-base mt-0.5 shrink-0">
                      check_circle
                    </span>
                    <span className="text-sm text-on-surface-variant leading-relaxed">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings */}
          {itinerary.warnings.length > 0 && (
            <div className="bg-surface-white rounded-xl p-6 shadow-sm border border-outline-variant/20">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="material-symbols-outlined text-accent-saffron"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  warning
                </span>
                <h3
                  className="font-bold text-on-surface"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Warnings
                </h3>
              </div>
              <ul className="space-y-3">
                {itinerary.warnings.map((warn, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-accent-saffron text-base mt-0.5 shrink-0">
                      warning
                    </span>
                    <span className="text-sm text-on-surface-variant leading-relaxed">
                      {warn}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STICKY BOTTOM CTA BAR
         ═══════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface-white border-t border-outline-variant/30 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-40">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-4 flex items-center justify-between">
          <Link
            href="/plan"
            className="flex items-center gap-2 text-on-surface-variant font-semibold text-sm hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Plan Another Trip
          </Link>
          <button
            onClick={handleSaveTrip}
            className="bg-primary text-white px-6 py-3 rounded-[50px] font-semibold text-sm btn-scale shadow-md flex items-center gap-2 cursor-pointer hover:shadow-lg"
          >
            <span className="material-symbols-outlined text-base">bookmark_add</span>
            Save to My Itineraries
          </button>
        </div>
      </div>
    </div>
  );
}
