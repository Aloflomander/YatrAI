"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Metadata } from "next";

/* ── Types ── */

type GroupType = "solo" | "couple" | "family" | "friends";
type TravelStyle =
  | "adventure"
  | "heritage"
  | "relaxation"
  | "food"
  | "nature"
  | "spiritual"
  | "nightlife"
  | "shopping";

interface FormData {
  destination: string;
  startDate: string;
  durationDays: number;
  groupSize: number;
  groupType: GroupType;
  budgetPerHead: number;
  travelStyles: TravelStyle[];
}

/* ── Constants ── */

const quickDestinations = ["Goa", "Rajasthan", "Bali", "Himachal Pradesh"];

const durationOptions = [
  { value: 3, label: "3 Days" },
  { value: 5, label: "5 Days" },
  { value: 7, label: "7 Days" },
  { value: 10, label: "10 Days" },
  { value: 14, label: "14 Days" },
];

const groupTypes: { value: GroupType; label: string; icon: string }[] = [
  { value: "solo", label: "Solo", icon: "person" },
  { value: "couple", label: "Couple", icon: "favorite" },
  { value: "family", label: "Family", icon: "family_restroom" },
  { value: "friends", label: "Friends", icon: "group" },
];

const travelStyleOptions: { value: TravelStyle; label: string; icon: string }[] = [
  { value: "adventure", label: "Adventure", icon: "hiking" },
  { value: "heritage", label: "Heritage", icon: "museum" },
  { value: "relaxation", label: "Relaxation", icon: "spa" },
  { value: "food", label: "Food & Cuisine", icon: "restaurant" },
  { value: "nature", label: "Nature", icon: "park" },
  { value: "spiritual", label: "Spiritual", icon: "self_improvement" },
  { value: "nightlife", label: "Nightlife", icon: "nightlife" },
  { value: "shopping", label: "Shopping", icon: "shopping_bag" },
];

const budgetRanges = [
  { value: 5000, label: "₹5,000", sublabel: "Backpacker" },
  { value: 15000, label: "₹15,000", sublabel: "Budget" },
  { value: 30000, label: "₹30,000", sublabel: "Mid-Range" },
  { value: 60000, label: "₹60,000", sublabel: "Premium" },
  { value: 100000, label: "₹1,00,000+", sublabel: "Luxury" },
];

/* ── Component ── */

export default function PlanPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>({
    destination: "",
    startDate: "",
    durationDays: 5,
    groupSize: 2,
    groupType: "couple",
    budgetPerHead: 15000,
    travelStyles: ["adventure"],
  });

  const updateForm = (updates: Partial<FormData>) =>
    setForm((prev) => ({ ...prev, ...updates }));

  const toggleStyle = (style: TravelStyle) => {
    setForm((prev) => ({
      ...prev,
      travelStyles: prev.travelStyles.includes(style)
        ? prev.travelStyles.filter((s) => s !== style)
        : [...prev.travelStyles, style],
    }));
  };

  /* ── API Call: Generate Itinerary ── */

  const handleGenerateItinerary = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        destination: form.destination,
        start_date: form.startDate || new Date().toISOString().split("T")[0],
        duration_days: form.durationDays,
        group_size: form.groupSize,
        group_type: form.groupType,
        budget_per_head_inr: form.budgetPerHead,
        travel_style: form.travelStyles,
      };

      const res = await fetch("http://localhost:8000/api/itinerary/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          errData?.detail || `Server error (${res.status}). Please try again.`
        );
      }

      const itinerary = await res.json();

      // Store itinerary + form context in localStorage
      localStorage.setItem("yatrai_itinerary", JSON.stringify(itinerary));
      localStorage.setItem(
        "yatrai_trip_context",
        JSON.stringify({
          groupSize: form.groupSize,
          groupType: form.groupType,
          startDate: form.startDate,
        })
      );

      router.push("/itinerary/result");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Step Validation ── */

  const canProceed = () => {
    if (step === 1) return form.destination.trim().length > 0;
    if (step === 2) return form.groupSize > 0;
    if (step === 3) return form.travelStyles.length > 0 && form.budgetPerHead > 0;
    return true;
  };

  /* ── Render ── */

  return (
    <div className="min-h-screen bg-surface-container-low">
      {/* Progress Bar */}
      <div className="bg-surface-white border-b border-outline-variant/30">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, label: "Where & When" },
              { num: 2, label: "Your Group" },
              { num: 3, label: "Budget & Preferences" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                      step >= s.num
                        ? "bg-primary text-white"
                        : "bg-outline-variant/30 text-on-surface-variant"
                    }`}
                  >
                    {step > s.num ? (
                      <span className="material-symbols-outlined text-sm">check</span>
                    ) : (
                      s.num
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 font-semibold whitespace-nowrap ${
                      step >= s.num ? "text-primary" : "text-on-surface-variant"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    className={`flex-1 h-[2px] mx-4 mt-[-20px] transition-colors duration-300 ${
                      step > s.num ? "bg-primary" : "bg-outline-variant/30"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-[800px] mx-auto px-5 md:px-16 py-12">
        {/* ── STEP 1: Where & When ── */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h2
              className="text-2xl md:text-3xl font-bold text-on-surface mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Where do you want to go?
            </h2>
            <p className="text-on-surface-variant mb-8">
              Pick a destination or type your own.
            </p>

            {/* Destination Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-on-surface mb-2">
                Destination
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  location_on
                </span>
                <input
                  id="plan-destination"
                  type="text"
                  value={form.destination}
                  onChange={(e) => updateForm({ destination: e.target.value })}
                  placeholder="e.g. Goa, Rajasthan, Bali..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-outline-variant bg-surface-white text-on-surface placeholder-outline focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Quick Select Chips */}
            <div className="flex flex-wrap gap-3 mb-8">
              {quickDestinations.map((dest) => (
                <button
                  key={dest}
                  onClick={() => updateForm({ destination: dest })}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    form.destination === dest
                      ? "bg-primary text-white shadow-md"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  {dest}
                </button>
              ))}
            </div>

            {/* Date Picker */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-on-surface mb-2">
                Start Date
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  calendar_month
                </span>
                <input
                  id="plan-start-date"
                  type="date"
                  value={form.startDate}
                  onChange={(e) => updateForm({ startDate: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-outline-variant bg-surface-white text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Duration Dropdown */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-on-surface mb-2">
                Duration
              </label>
              <div className="flex flex-wrap gap-3">
                {durationOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateForm({ durationDays: opt.value })}
                    className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      form.durationDays === opt.value
                        ? "bg-primary text-white shadow-md"
                        : "bg-surface-white border border-outline-variant text-on-surface hover:border-primary"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() => setStep(2)}
              disabled={!canProceed()}
              className="w-full md:w-auto bg-accent-saffron text-white px-8 py-3.5 rounded-[50px] font-semibold text-sm btn-scale shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
            >
              Next: Your Group
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        )}

        {/* ── STEP 2: Your Group ── */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            <h2
              className="text-2xl md:text-3xl font-bold text-on-surface mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Who&apos;s traveling?
            </h2>
            <p className="text-on-surface-variant mb-8">
              Tell us about your group so we can tailor the experience.
            </p>

            {/* Group Type */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-on-surface mb-3">
                Travel Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {groupTypes.map((gt) => (
                  <button
                    key={gt.value}
                    onClick={() => updateForm({ groupType: gt.value })}
                    className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all cursor-pointer ${
                      form.groupType === gt.value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-outline-variant/50 bg-surface-white text-on-surface-variant hover:border-primary/50"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {gt.icon}
                    </span>
                    <span className="text-sm font-semibold">{gt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Group Size */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-on-surface mb-3">
                Group Size
              </label>
              <div className="flex items-center gap-4 bg-surface-white rounded-xl border border-outline-variant p-4 w-fit">
                <button
                  onClick={() =>
                    updateForm({ groupSize: Math.max(1, form.groupSize - 1) })
                  }
                  className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl hover:bg-primary/20 transition-colors cursor-pointer"
                >
                  −
                </button>
                <span className="text-2xl font-bold text-on-surface w-12 text-center">
                  {form.groupSize}
                </span>
                <button
                  onClick={() =>
                    updateForm({ groupSize: Math.min(20, form.groupSize + 1) })
                  }
                  className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl hover:bg-primary/20 transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3.5 rounded-[50px] font-semibold text-sm border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!canProceed()}
                className="bg-accent-saffron text-white px-8 py-3.5 rounded-[50px] font-semibold text-sm btn-scale shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              >
                Next: Budget & Preferences
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Budget & Preferences ── */}
        {step === 3 && (
          <div className="animate-fade-in-up">
            <h2
              className="text-2xl md:text-3xl font-bold text-on-surface mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Budget & Travel Style
            </h2>
            <p className="text-on-surface-variant mb-8">
              Set your budget and pick what matters most to you.
            </p>

            {/* Budget Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-on-surface mb-3">
                Budget Per Person (Total Trip)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {budgetRanges.map((br) => (
                  <button
                    key={br.value}
                    onClick={() => updateForm({ budgetPerHead: br.value })}
                    className={`flex flex-col items-center gap-1 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      form.budgetPerHead === br.value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-outline-variant/50 bg-surface-white text-on-surface-variant hover:border-primary/50"
                    }`}
                  >
                    <span className="text-base font-bold">{br.label}</span>
                    <span className="text-xs">{br.sublabel}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Style Multi-Select */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-on-surface mb-3">
                Travel Style (select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {travelStyleOptions.map((ts) => (
                  <button
                    key={ts.value}
                    onClick={() => toggleStyle(ts.value)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      form.travelStyles.includes(ts.value)
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-outline-variant/50 bg-surface-white text-on-surface-variant hover:border-primary/50"
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">{ts.icon}</span>
                    <span className="text-sm font-semibold">{ts.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Banner */}
            <div className="bg-surface-white rounded-xl border border-outline-variant p-5 mb-8">
              <h3
                className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-3"
              >
                Trip Summary
              </h3>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full font-semibold">
                  📍 {form.destination || "Not selected"}
                </span>
                <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full font-semibold">
                  📅 {form.durationDays} days
                </span>
                <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full font-semibold">
                  👥 {form.groupSize} {form.groupType}
                </span>
                <span className="bg-accent-saffron/10 text-accent-saffron px-3 py-1.5 rounded-full font-semibold">
                  💰 ₹{form.budgetPerHead.toLocaleString("en-IN")}/head
                </span>
              </div>
            </div>

            {/* Navigation & Generate Button */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3.5 rounded-[50px] font-semibold text-sm border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
                >
                  ← Back
                </button>

                {/* Generate Button / Loading State */}
                {isLoading ? (
                  <div className="flex-1 flex items-center justify-center gap-3 bg-primary/10 text-primary px-8 py-3.5 rounded-[50px] font-semibold text-sm">
                    <svg
                      className="animate-spin h-5 w-5 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
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
                    ✨ Your AI travel agent is crafting your perfect trip...
                  </div>
                ) : (
                  <button
                    id="generate-itinerary-btn"
                    onClick={handleGenerateItinerary}
                    disabled={!canProceed()}
                    className="flex-1 bg-accent-saffron text-white px-8 py-3.5 rounded-[50px] font-semibold text-sm btn-scale shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                  >
                    Generate My Itinerary
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </button>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 bg-error-container text-on-error-container px-5 py-3 rounded-xl text-sm">
                  <span className="material-symbols-outlined text-base">error</span>
                  {error}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
