import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";

export const metadata: Metadata = {
  title: "YatrAI — Discover India Like Never Before",
  description:
    "Let our AI craft the perfect, personalized itinerary for your next unforgettable journey. From historic wonders to hidden gems.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
    </>
  );
}
