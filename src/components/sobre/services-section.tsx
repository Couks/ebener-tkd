"use client";

import type React from "react";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  Users,
  Trophy,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// Import images
import treinoPersonalizado from "@/assets/images/t_sombrinha.jpeg";
import exameAmarelas from "@/assets/images/g_exame_amarelas.jpeg";
import eventos from "@/assets/images/c_grand_Slam_duda_2025.jpg";

// Define service interface
interface Service {
  id: number;
  title: string;
  description: string;
  image: any;
  icon: React.ReactNode;
  features: string[];
  cta: string;
  ctaLink: string;
}

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Services data
  const services: Service[] = [
    {
      id: 1,
      title: "Treinos Personalizados",
      description:
        "Treinos adaptados ao seu nível e objetivo, com acompanhamento especializado para maximizar seu desenvolvimento.",
      image: treinoPersonalizado,
      icon: <Calendar />,
      features: [
        "Avaliação individual de habilidades",
        "Acompanhamento constante",
        "Flexibilidade de horários",
      ],
      cta: "Agende seu treino",
      ctaLink: "/contato",
    },
    {
      id: 2,
      title: "Aulas em Grupo",
      description:
        "Participe de aulas dinâmicas e motivadoras com instrutores qualificados em um ambiente de aprendizado coletivo.",
      image: exameAmarelas,
      icon: <Users />,
      features: [
        "Ambiente motivador e colaborativo",
        "Desenvolvimento de espírito de equipe",
        "Horários flexíveis",
      ],
      cta: "Ver turmas",
      ctaLink: "/planos",
    },
    {
      id: 3,
      title: "Eventos e Competições",
      description:
        "Envolva-se em competições para aprimorar suas habilidades e conhecer outros atletas do mundo do Taekwondo.",
      image: eventos,
      icon: <Trophy />,
      features: [
        "Preparação para competições",
        "Eventos nacionais e estaduais",
        "Suporte durante competições",
      ],
      cta: "Galeria",
      ctaLink: "/galeria",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isMobile) return;

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isMobile, services.length]);

  // Navigation handlers
  const goNext = useCallback(() => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % services.length);

    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [services.length]);

  const goPrev = useCallback(() => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);

    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [services.length]);

  const goToSlide = useCallback((index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);

    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goPrev();
      } else if (event.key === "ArrowRight") {
        goNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goPrev, goNext]);

  return (
    <section className="mx-auto max-w-[95%] sm:max-w-[95%] md:container py-16 md:py-24 mt-8 sm:mt-12 relative">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-secondary-800 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/90 to-secondary-800/95"></div>
      </div>

      {/* Content container */}
      <div className="relative px-5 sm:px-8 md:px-12 z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center gap-2 bg-primary-500/20 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 rounded-full bg-primary-500"></div>
            <span className="text-sm font-medium text-primary-500">
              Treinamento especializado
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
            Nossos Serviços
          </h2>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Conheça os diferentes tipos de treinamento e atividades que
            oferecemos para sua evolução no Taekwondo
          </p>
        </motion.div>

        {/* Mobile view - Stacked cards */}
        {isMobile && (
          <div className="space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-secondary-700/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={service.image.src || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-black">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-gray-300 mb-4 text-lg">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-5">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-gray-300"
                      >
                        <ChevronRight className="size-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={service.ctaLink}>
                    <button className="w-full bg-primary-500 hover:bg-primary-600 text-black font-medium py-3 px-6 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2">
                      {service.cta}
                      <ArrowRight className="size-4" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Desktop view - Custom carousel with Framer Motion */}
        {!isMobile && (
          <div className="relative" ref={carouselRef}>
            {/* Carousel container */}
            <div className="relative h-[500px] overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: "0%", opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    opacity: { duration: 0.3 },
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <div className="grid grid-cols-12 h-full gap-6 bg-secondary-800 rounded-2xl">
                    {/* Image column */}
                    <div className="col-span-6 relative rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={
                          services[activeIndex].image.src || "/placeholder.svg"
                        }
                        alt={services[activeIndex].title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1200px) 50vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>

                      {/* Floating badge */}
                      <motion.div
                        className="absolute top-6 left-6 bg-primary-500/90 backdrop-blur-sm text-black font-bold py-2 px-4 rounded-full flex items-center gap-2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.3,
                          type: "spring",
                          stiffness: 300,
                        }}
                      >
                        <div className="w-5 h-5">
                          {services[activeIndex].icon}
                        </div>
                        <span>{services[activeIndex].title}</span>
                      </motion.div>
                    </div>

                    {/* Content column */}
                    <div className="col-span-6 flex flex-col justify-center pr-8">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="space-y-6"
                      >
                        <h3 className="text-3xl font-bold text-white">
                          {services[activeIndex].title}
                        </h3>
                        <p className="text-gray-300 text-lg">
                          {services[activeIndex].description}
                        </p>

                        <div className="space-y-3 py-4 border-y border-gray-700">
                          {services[activeIndex].features.map(
                            (feature, idx) => (
                              <motion.div
                                key={idx}
                                className="flex items-start gap-3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                              >
                                <ChevronRight className="size-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">{feature}</span>
                              </motion.div>
                            )
                          )}
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <Link href={services[activeIndex].ctaLink}>
                            <button className="bg-primary-500 hover:bg-primary-600 text-black font-medium py-3 px-6 rounded-xl transition-colors duration-300 flex items-center gap-2 group">
                              {services[activeIndex].cta}
                              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </Link>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Custom navigation */}
            <div className="flex items-center justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2 z-10 px-4">
              <motion.button
                onClick={goPrev}
                className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-primary-500 hover:text-black transition-colors"
                aria-label="Slide anterior"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="size-6" />
              </motion.button>
              <motion.button
                onClick={goNext}
                className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-primary-500 hover:text-black transition-colors"
                aria-label="Próximo slide"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="size-6" />
              </motion.button>
            </div>

            {/* Custom pagination with progress indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {services.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-primary-500 w-10"
                      : "bg-gray-600 w-3"
                  }`}
                  aria-label={`Ir para slide ${index + 1}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Auto-play progress indicator */}
                  {activeIndex === index && isAutoPlaying && (
                    <motion.div
                      className="absolute inset-0 bg-primary-400 rounded-full origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Auto-play controls */}
            <div className="flex justify-center mt-4 gap-2">
              <motion.button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  isAutoPlaying
                    ? "bg-primary-500 text-black"
                    : "bg-gray-600 text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAutoPlaying ? "Pausar" : "Reproduzir"}
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
