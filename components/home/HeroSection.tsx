"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");

  const handleGenerate = () => {
    router.push(
      `/plan?destination=${encodeURIComponent(destination)}&dates=${encodeURIComponent(dates)}&guests=${encodeURIComponent(guests)}`
    );
  };

  return (
    <section
      id="hero-section"
      className="relative h-[870px] min-h-[600px] w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image — Taj Mahal */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDYDyp8A_Gv3KdGC2ps_wV0ycAs3ajMkIRdq8e1otS1YyIUNGcqvUgcFAnmsiXlJJxallIOcf4Ujakrvs3X3B9L0FvfNy2VzAtBKldwbm3L6w6HANUEs39Xh5cspyvNlAEsuXaEJXDta0erlEY8aGVweO-3mHMi1IMtAgGhtW2tZU167AGLJuHM-V_0ywqUsk-ZI3Hy-3CTap2nNHJStuBgmB-rBH1NqQ2oramIVTqoIYyPHhLyhBLh5jh05ygEhNIEmlnFVoA32U')`,
        }}
        role="img"
        aria-label="Taj Mahal in golden morning light"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient z-10" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1280px] mx-auto px-5 md:px-16 text-center flex flex-col items-center">
        <h1
          className="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Discover India Like Never Before
        </h1>
        <p className="text-surface-variant text-lg mb-10 max-w-2xl drop-shadow-md leading-relaxed">
          Let our AI craft the perfect, personalized itinerary for your next
          unforgettable journey. From historic wonders to hidden gems.
        </p>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row gap-4 items-center animate-fade-in-up">
          {/* Where */}
          <div className="flex-1 w-full flex items-center border-b md:border-b-0 md:border-r border-outline-variant pb-2 md:pb-0 px-2 group">
            <span className="material-symbols-outlined text-outline group-focus-within:text-deep-teal mr-2">
              location_on
            </span>
            <input
              id="hero-destination"
              type="text"
              placeholder="Where do you want to go?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-base text-on-surface placeholder-outline focus:outline-none"
            />
          </div>

          {/* Dates */}
          <div className="w-full md:w-auto flex items-center gap-4">
            <div className="flex items-center border-b md:border-b-0 md:border-r border-outline-variant pb-2 md:pb-0 px-2 group">
              <span className="material-symbols-outlined text-outline group-focus-within:text-deep-teal mr-2">
                calendar_month
              </span>
              <input
                id="hero-dates"
                type="text"
                placeholder="Dates"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-24 bg-transparent border-none focus:ring-0 text-base text-on-surface placeholder-outline focus:outline-none"
              />
            </div>

            {/* Guests */}
            <div className="flex items-center px-2 group">
              <span className="material-symbols-outlined text-outline group-focus-within:text-deep-teal mr-2">
                group
              </span>
              <input
                id="hero-guests"
                type="number"
                placeholder="Guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-20 bg-transparent border-none focus:ring-0 text-base text-on-surface placeholder-outline focus:outline-none"
              />
            </div>
          </div>

          {/* CTA Button */}
          <button
            id="hero-generate-btn"
            onClick={handleGenerate}
            className="w-full md:w-auto bg-accent-saffron text-white px-6 py-3 rounded-[50px] font-semibold text-sm btn-scale shadow-md flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer hover:shadow-lg"
          >
            Generate Itinerary
            <span className="material-symbols-outlined text-sm text-white">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
