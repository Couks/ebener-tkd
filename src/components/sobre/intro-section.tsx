"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface IntroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  height?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function IntroSection({
  title,
  subtitle,
  backgroundImage,
  height = "h-screen",
  buttonText = "Explore more",
  buttonLink = "",
}: IntroSectionProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      className={`relative flex items-start justify-start text-white ${height} overflow-hidden`}
    >
      {/* Imagem de fundo com overlay escuro */}
      <div
        className="absolute inset-0 overflow-hidden pb-2 px-2"
        style={{ transform: `translateY(${scrollPosition * 0.5}px)` }}
      >
        <div className="w-full h-full">
          <Image
            src={backgroundImage}
            alt={title}
            className="object-cover w-full h-full brightness-50 rounded-b-3xl"
            width={1920}
            height={1080}
            priority
          />
        </div>
      </div>

      {/* Conteúdo principal */}
      <div
        className="relative z-10 container mx-auto max-w-7xl px-8 pt-36"
        style={{ transform: `translateY(${scrollPosition * 0.8}px)` }}
      >
        <div className="max-w-4xl">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-lg md:text-3xl text-gray-200 mb-8 max-w-xl"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
          <a href={buttonLink} rel="noopener noreferrer">
            <motion.button
              className="bg-primary-500 hover:bg-primary-600 rounded-full text-white font-bold px-6 py-6 flex items-center gap-2 group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {buttonText}
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </motion.button>
          </a>
        </div>
      </div>
    </section>
  );
}
