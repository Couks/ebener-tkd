"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  Variants,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";

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
  height = "h-[100vh]",
  buttonText = "Explore mais",
  buttonLink = "",
}: IntroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // More subtle parallax effect
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Handle mounting for SSR compatibility
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Split title into words for staggered animation
  const titleWords = title.split(" ");
  const subtitleWords = subtitle.split(" ");

  const titleContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const titleWordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: "100%",
      rotateZ: "2deg",
      rotateX: "-10deg",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      rotateX: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: "easeOut",
      },
    },
  };

  const subtitleContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: shouldReduceMotion ? 0 : titleWords.length * 0.1,
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const subtitleWordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className={`relative flex items-center justify-center text-white ${height} overflow-hidden`}
    >
      {/* Background image with overlay */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ y: isMounted ? backgroundY : 0 }}
      >
        <div className="relative w-full h-full">
          <Image
            src={backgroundImage || "/placeholder.svg"}
            alt="Background"
            className="object-cover rounded-b-3xl object-top"
            fill
            priority
            style={{
              objectFit: "cover",
            }}
          />
          {/* Gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/80 rounded-b-3xl"></div>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 container mx-auto px-8 flex flex-col items-start justify-center"
        style={{
          y: isMounted ? contentY : 0,
          opacity: isMounted ? opacity : 1,
        }}
        initial="hidden"
        animate={isMounted ? "visible" : "hidden"}
      >
        <div className="max-w-4xl">
          {/* Title with word-by-word animation */}
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            variants={titleContainerVariants}
          >
            {titleWords.map((word, index) => (
              <div
                key={index}
                className="inline-block mr-[0.25em]"
                style={{ overflow: "hidden" }}
              >
                <motion.span
                  className="inline-block"
                  variants={titleWordVariants}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-md sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-xl"
            variants={subtitleContainerVariants}
          >
            {subtitleWords.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-[0.2em]"
                variants={subtitleWordVariants}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.5,
              delay: shouldReduceMotion
                ? 0
                : titleWords.length * 0.1 + subtitleWords.length * 0.04,
            }}
          >
            <Link href={buttonLink} className="inline-block">
              <motion.button
                className="bg-primary-500 hover:bg-primary-600 rounded-full text-black text-base sm:text-lg font-bold px-6 py-4 sm:py-5 flex items-center gap-2 group shadow-lg hover:shadow-primary-500/30 transition-all duration-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {buttonText}
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
