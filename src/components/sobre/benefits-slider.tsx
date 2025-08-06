"use client";

import { useState, useRef, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface BenefitsSliderProps {
  benefits: Benefit[];
}

export default function BenefitsSlider({ benefits }: BenefitsSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % benefits.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [benefits.length, isAutoplay]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoplay(false);
    // Reativa autoplay após 5 segundos
    setTimeout(() => setIsAutoplay(true), 5000);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % benefits.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + benefits.length) % benefits.length);
  };

  return (
    <div className="mb-16">
      {/* Slider Container */}
      <div className="relative w-full max-w-md mx-auto h-[400px] overflow-hidden rounded-2xl">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="min-w-full h-full bg-white dark:bg-gray-800 shadow-xl flex flex-col"
            >
              <div
                className={`h-1/3 bg-gradient-to-r ${benefit.color} flex items-center justify-center p-8`}
              >
                <div className="w-20 h-20 text-white">{benefit.icon}</div>
              </div>
              <div className="p-6 h-2/3 flex flex-col">
                <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 flex-grow">
                  {benefit.description}
                </p>
                
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
          aria-label="Slide anterior"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
          aria-label="Próximo slide"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center mt-8 gap-2">
        {benefits.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "bg-primary-500 w-8"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Autoplay indicator */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsAutoplay(!isAutoplay)}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
        >
          {isAutoplay ? "⏸️ Pausar" : "▶️ Reproduzir"} slides automáticos
        </button>
      </div>
    </div>
  );
}
