export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface-container-low">
      {/* ═══════════════════════════════════════
          MISSION SECTION — 2-column layout
         ═══════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Text Content */}
          <div>
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Our Mission
            </span>
            <h1
              className="text-3xl md:text-4xl lg:text-[42px] font-bold text-on-surface leading-tight mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Reimagining Travel for the Modern Indian Explorer.
            </h1>
            <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
              We believe exploring the world shouldn&apos;t be complicated.
              YatrAI blends cutting-edge artificial intelligence with the
              warmth of Indian hospitality to craft journeys as unique as you
              are. From the bustling streets of Varanasi to the serene
              backwaters of Kerala, or the majestic peaks of the Swiss Alps,
              your perfect itinerary is just a prompt away.
            </p>
          </div>

          {/* Right: Visual Placeholder */}
          <div className="relative flex items-center justify-center">
            <div className="w-full max-w-[420px] aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary to-[#095555] shadow-xl flex items-center justify-center overflow-hidden relative">
              {/* Decorative circles */}
              <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
              <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-white/5" />

              {/* Phone mockup */}
              <div className="relative z-10 w-[200px] bg-[#0a2e2e] rounded-[28px] p-2 shadow-2xl border border-white/10">
                <div className="bg-surface-white rounded-[22px] overflow-hidden">
                  {/* Status bar */}
                  <div className="bg-primary px-4 py-2 flex items-center justify-between">
                    <span className="text-white text-[8px] font-bold">
                      ▷ YatrAI
                    </span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    </div>
                  </div>

                  {/* Mock content */}
                  <div className="p-3 space-y-2">
                    <div className="h-16 rounded-lg bg-gradient-to-r from-primary/20 to-accent-saffron/20" />
                    <div className="h-2 bg-outline-variant/20 rounded w-3/4" />
                    <div className="h-2 bg-outline-variant/20 rounded w-1/2" />
                    <div className="h-10 rounded-lg bg-primary/10 mt-2" />
                    <div className="h-10 rounded-lg bg-primary/10" />
                    <div className="h-8 rounded-full bg-accent-saffron/80 flex items-center justify-center">
                      <span className="text-white text-[7px] font-bold">
                        Plan My Trip →
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating accent badge */}
              <div className="absolute bottom-8 right-6 bg-accent-saffron text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg z-20">
                AI-Powered ✨
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          THE YATRAI ADVANTAGE — 2x2 Grid
         ═══════════════════════════════════════ */}
      <section className="bg-surface-white py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="text-center mb-12">
            <h2
              className="text-2xl md:text-3xl font-bold text-on-surface mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              The YatrAI Advantage
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              What makes us different from every other travel planner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 — Hyper-Personalized AI */}
            <div className="group bg-surface-container-low rounded-xl p-7 border border-outline-variant/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <span
                  className="material-symbols-outlined text-primary text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  psychology
                </span>
              </div>
              <h3
                className="text-lg font-bold text-on-surface mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Hyper-Personalized AI
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Our proprietary AI doesn&apos;t just suggest popular spots. It
                analyzes thousands of data points to curate itineraries that
                match your exact pacing, culinary preferences, budget
                constraints, and budget goals, learning and adapting with every
                trip you plan.
              </p>
            </div>

            {/* Card 2 — Culinary Context */}
            <div className="group bg-surface-container-low rounded-xl p-7 border border-outline-variant/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-accent-saffron/10 flex items-center justify-center mb-5 group-hover:bg-accent-saffron/20 transition-colors">
                <span
                  className="material-symbols-outlined text-accent-saffron text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  restaurant
                </span>
              </div>
              <h3
                className="text-lg font-bold text-on-surface mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Culinary Context
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Finding pure veg options in Paris or authentic Jain food in
                Tokyo? Our system inherently understands the dietary preferences
                of Indian travelers, ensuring you never compromise on meals
                abroad.
              </p>
            </div>

            {/* Card 3 — Built for Families */}
            <div className="group bg-surface-container-low rounded-xl p-7 border border-outline-variant/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <span
                  className="material-symbols-outlined text-primary text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  family_restroom
                </span>
              </div>
              <h3
                className="text-lg font-bold text-on-surface mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Built for Families
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                We know Indian travel often means multi-generational groups. Our
                algorithms prioritize accessibility, spacious accommodations, and
                activities that cater to both energetic kids and relaxed seniors.
              </p>
            </div>

            {/* Card 4 — Seamless Trust & Security */}
            <div className="group bg-surface-container-low rounded-xl p-7 border border-outline-variant/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-accent-saffron/10 flex items-center justify-center mb-5 group-hover:bg-accent-saffron/20 transition-colors">
                <span
                  className="material-symbols-outlined text-accent-saffron text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified_user
                </span>
              </div>
              <h3
                className="text-lg font-bold text-on-surface mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Seamless Trust &amp; Security
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Your peace of mind is paramount. From verified local partners to
                24/7 WhatsApp concierge support during your trip, we wrap our AI
                efficiency in a blanket of human reliability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
