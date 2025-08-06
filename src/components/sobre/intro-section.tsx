"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  height = "h-[90vh]",
  buttonText = "Explore more",
  buttonLink = "",
}: IntroSectionProps) {
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

  return (
    <section
      ref={sectionRef}
      className={`relative flex items-center justify-center text-white ${height} overflow-hidden`}
    >
      {/* Background image with overlay */}
      <motion.div
        className="absolute inset-2 rounded-3xl overflow-hidden"
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
        className="relative z-10 container mx-auto px-6 sm:px-24 flex flex-col items-start justify-center"
        style={{
          y: isMounted ? contentY : 0,
          opacity: isMounted ? opacity : 1,
        }}
      >
        <div className="max-w-4xl">
          {/* Title with word-by-word animation */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {titleWords.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * index,
                  ease: "easeOut",
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-md sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href={buttonLink} className="inline-block">
              <motion.button
                className="bg-primary-500 hover:bg-primary-600 rounded-full text-black text-base sm:text-lg font-bold px-6 py-4 sm:py-5 flex items-center gap-2 group shadow-lg hover:shadow-primary-500/30 transition-all duration-300"
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
