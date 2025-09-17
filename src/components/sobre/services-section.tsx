"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Calendar,
  Users,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Play,
  Pause,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  cta: string;
  ctaLink: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Treinos Personalizados",
    description:
      "Treinos adaptados ao seu nível e objetivo, com acompanhamento especializado para maximizar seu desenvolvimento.",
    image: treinoPersonalizado,
    icon: Calendar,
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
    icon: Users,
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
    icon: Trophy,
    features: [
      "Preparação para competições",
      "Eventos nacionais e estaduais",
      "Suporte durante competições",
    ],
    cta: "Ver galeria",
    ctaLink: "/galeria",
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setHasMounted(true);
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }

    if (isAutoPlaying && !isMobile && hasMounted) {
      autoPlayTimeoutRef.current = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % services.length);
      }, 5000);
    }

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [activeIndex, isAutoPlaying, isMobile, hasMounted]);

  const handleTabClick = (index: number) => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    setActiveIndex(index);
    setIsAutoPlaying(false);

    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  if (!hasMounted) {
    // Render a skeleton or null to avoid SSR mismatch
    return null;
  }

  const activeService = services[activeIndex];

  return (
    <section className="py-20 md:py-28 bg-secondary-900">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center gap-2 bg-primary-500/10 border border-primary-500/20 px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            <span className="text-sm font-medium text-primary-400">
              Treinamento especializado
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Nossos Serviços
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Conheça os diferentes tipos de treinamento e atividades que
            oferecemos para sua evolução no Taekwondo.
          </p>
        </motion.div>

        {/* Mobile view - Stacked cards */}
        {isMobile && (
          <div className="space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-secondary-800 rounded-2xl overflow-hidden shadow-lg border border-secondary-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center text-black">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 mb-4">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 mb-5">
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

                  <Link href={service.ctaLink} passHref>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-primary-500 hover:bg-primary-600 text-black font-bold py-3 px-6 rounded-xl transition-colors duration-100 flex items-center justify-center gap-2 group"
                    >
                      {service.cta}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Desktop view - Tabbed interface */}
        {!isMobile && (
          <div className="grid grid-cols-12 gap-x-12 items-start">
            {/* Tab selectors */}
            <div className="col-span-4 flex flex-col gap-4 sticky top-24">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => handleTabClick(index)}
                  className={cn(
                    "relative text-left p-4 rounded-xl transition-all duration-300 ease-in-out group overflow-hidden",
                    activeIndex === index
                      ? "bg-secondary-800"
                      : "hover:bg-secondary-800/50"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out",
                        activeIndex === index
                          ? "bg-primary-500 text-black"
                          : "bg-secondary-700 text-primary-400 group-hover:bg-primary-500 group-hover:text-black"
                      )}
                    >
                      <service.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4
                        className={cn(
                          "font-bold text-lg transition-colors",
                          activeIndex === index
                            ? "text-white"
                            : "text-gray-300 group-hover:text-white"
                        )}
                      >
                        {service.title}
                      </h4>
                    </div>
                  </div>
                  {activeIndex === index && (
                    <motion.div
                      layoutId="active-service-highlight"
                      className="absolute inset-0 border-2 border-primary-500 rounded-xl"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(255, 215, 0, 0.1), transparent)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                  {/* Autoplay Progress Bar */}
                  {activeIndex === index && isAutoPlaying && (
                    <motion.div
                      key={activeIndex} // Force re-render on index change
                      className="absolute bottom-0 left-0 h-1 bg-primary-500/70"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
              {/* Autoplay Controls */}
              <div className="flex justify-center mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="bg-secondary-800/80 border-secondary-700 text-gray-300 hover:bg-secondary-700 hover:text-white"
                >
                  {isAutoPlaying ? (
                    <Pause className="h-4 w-4 mr-2" />
                  ) : (
                    <Play className="h-4 w-4 mr-2" />
                  )}
                  {isAutoPlaying ? "Pausar" : "Retomar"}
                </Button>
              </div>
            </div>

            {/* Content display */}
            <div className="col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-secondary-800 rounded-2xl overflow-hidden shadow-2xl border border-secondary-700"
                >
                  <div className="grid grid-cols-12 min-h-[480px]">
                    {/* Image column */}
                    <div className="col-span-5 relative">
                      <Image
                        src={activeService.image}
                        alt={activeService.title}
                        fill
                        className="object-cover"
                        sizes="30vw"
                        priority
                      />
                    </div>

                    {/* Content column */}
                    <div className="col-span-7 p-8 flex flex-col">
                      {/* Top content */}
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400">
                            <activeService.icon className="h-8 w-8" />
                          </div>
                          <h3 className="text-3xl font-bold text-white">
                            {activeService.title}
                          </h3>
                        </div>
                        <p className="text-gray-300 text-base leading-relaxed">
                          {activeService.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="my-auto py-6">
                        <h4 className="mb-3 text-lg font-semibold text-white">
                          Principais Focos do Treinamento:
                        </h4>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {activeService.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-center gap-3 rounded-lg bg-secondary-700/50 p-3"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.2 + idx * 0.1,
                                type: "spring",
                                stiffness: 200,
                              }}
                            >
                              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary-500" />
                              <span className="text-sm text-gray-300">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-auto">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Button
                            asChild
                            className="group inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-base font-bold text-black transition-all duration-200 hover:bg-primary-600"
                          >
                            <Link href={activeService.ctaLink}>
                              {activeService.cta}
                              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
