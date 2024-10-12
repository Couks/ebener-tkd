"use client";

import CallToActionSection from "@/components/call-to-action";
import BenefitsSection from "@/components/sobre/benefits-section";
import IntroSection from "@/components/sobre/intro-section";
import ServicesSection from "@/components/sobre/services-section";
import TestimonialsSection from "@/components/sobre/testimonials-section";

export default function Home() {
  return (
    <>
      <IntroSection />
      <BenefitsSection />
      <ServicesSection />
      <TestimonialsSection />
      <CallToActionSection />
    </>
  );
}
