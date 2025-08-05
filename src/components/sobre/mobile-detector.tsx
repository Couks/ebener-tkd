"use client";

import { useState, useEffect } from "react";
import BenefitsSlider from "./benefits-slider";

interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface MobileDetectorProps {
  benefits: Benefit[];
  children: React.ReactNode;
}

export default function MobileDetector({
  benefits,
  children,
}: MobileDetectorProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificação inicial
    checkIfMobile();
    setIsLoaded(true);

    // Listener para mudanças de tamanho
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Evita hidration mismatch renderizando apenas após o carregamento
  if (!isLoaded) {
    return null;
  }

  return <>{isMobile ? <BenefitsSlider benefits={benefits} /> : children}</>;
}
