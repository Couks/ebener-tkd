"use client";

import CallToActionSection from "@/components/call-to-action";
import BenefitsSection from "@/components/sobre/benefits-section";
import IntroSection from "@/components/sobre/intro-section";
import ServicesSection from "@/components/sobre/services-section";
import TestimonialsSection from "@/components/sobre/testimonials-section";
import bannerHomepage from "@/assets/images/t_banner_home.jpeg";
import AboutSection from "@/components/sobre/about-section";

export default function Home() {
  return (
    <>
      <IntroSection
        title="Academia de Taekwondo na Ilha do Governador"
        subtitle="A maior e mais tradicional academia de artes marciais da região. Metodologia exclusiva e professores certificados."
        backgroundImage={bannerHomepage.src}
        buttonText="Agende uma Aula Grátis"
        buttonLink="/planos"
      />
      <AboutSection />
      <BenefitsSection />
      <ServicesSection />
      <TestimonialsSection />
      <CallToActionSection />
    </>
  );
}
