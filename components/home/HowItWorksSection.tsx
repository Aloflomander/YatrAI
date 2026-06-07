const steps = [
  {
    icon: "chat_bubble",
    title: "Tell Us Your Vibe",
    description:
      "Share your interests, budget, and travel style. Be as vague or specific as you like.",
  },
  {
    icon: "auto_awesome",
    title: "AI Builds Your Plan",
    description:
      "Our smart engine crafts a minute-by-minute itinerary tailored perfectly to you.",
  },
  {
    icon: "luggage",
    title: "Travel Worry-Free",
    description:
      "Book everything with one click and access your itinerary offline on our mobile app.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-16 md:py-20 bg-surface-container-low"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold text-on-surface mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Your Dream Trip in 3 Steps
          </h2>
          <p className="text-base text-on-surface-variant">
            Planning travel has never been this smart or effortless.
          </p>
        </div>

        {/* Steps */}
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:flex absolute top-1/2 left-[15%] right-[15%] -translate-y-1/2 z-0 items-center">
            <div className="flex-1 h-[2px] border-t-2 border-dashed border-primary" />
            <span
              className="material-symbols-outlined text-primary -mx-1"
              style={{ fontSize: "16px" }}
            >
              arrow_forward_ios
            </span>
            <div className="flex-1 h-[2px] border-t-2 border-dashed border-primary" />
            <span
              className="material-symbols-outlined text-primary -mx-1"
              style={{ fontSize: "16px" }}
            >
              arrow_forward_ios
            </span>
            <div className="flex-1 h-[2px] border-t-2 border-dashed border-primary" />
          </div>

          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`relative z-10 flex flex-col items-center bg-surface-white p-8 card-hover-effect border border-surface-container w-full md:w-1/3 text-center animate-fade-in-up`}
              style={{ animationDelay: `${i * 200}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-deep-teal">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {step.icon}
                </span>
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {step.title}
              </h3>
              <p className="text-base text-on-surface-variant leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
