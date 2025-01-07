"use client";

import CallToActionSection from "@/components/call-to-action";
import BenefitsSection from "@/components/sobre/benefits-section";
import IntroSection from "@/components/sobre/intro-section";
import ServicesSection from "@/components/sobre/services-section";
import TestimonialsSection from "@/components/sobre/testimonials-section";
import quemSomos from "@/assets/images/aulas-em-grupo.jpeg";

export default function Home() {
  return (
    <>
      <IntroSection
        title="Ebener TaeKwonDo"
        subtitle="Transforme sua vida com Taekwondo na maior academia da Ilha do Governador"
        backgroundImage={quemSomos.src}
        buttonText="Saiba mais"
      />
      <BenefitsSection />
      <ServicesSection />
      <TestimonialsSection />
      <CallToActionSection />
    </>
  );
}
