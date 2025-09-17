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
        title="Sua Academia de Luta na Ilha do Governador"
        subtitle="Transforme seu corpo e mente com o Taekwondo. Oferecemos um caminho de disciplina, autoconfiança e condicionamento físico para todas as idades. Mais que uma arte marcial, um estilo de vida."
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
