"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "./button";

interface LightboxModalProps {
  images: string[];
  startIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function LightboxModal({
  images,
  startIndex = 0,
  isOpen,
  onClose,
}: LightboxModalProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex, isOpen]);

  // Preload images
  useEffect(() => {
    if (isOpen && images.length > 1) {
      const nextIndex = (currentIndex + 1) % images.length;
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      new window.Image().src = images[nextIndex];
      new window.Image().src = images[prevIndex];
    }
  }, [currentIndex, images, isOpen]);

  const navigate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex(
        (prevIndex) => (prevIndex + newDirection + images.length) % images.length
      );
    },
    [images.length]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, navigate, onClose]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  if (!isOpen) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 hover:text-white"
        onClick={onClose}
      >
        <X size={24} />
      </Button>

      {/* Main Image */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -10000) {
                navigate(1);
              } else if (swipe > 10000) {
                navigate(-1);
              }
            }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            {isLoading && (
              <Loader2 className="h-12 w-12 text-white animate-spin absolute z-0" />
            )}
            <Image
              src={images[currentIndex]}
              alt={`Imagem ${currentIndex + 1}`}
              className="object-contain"
              fill
              sizes="100vw"
              priority
              onLoadStart={() => setIsLoading(true)}
              onLoad={() => setIsLoading(false)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 hover:text-white h-12 w-12 rounded-full hidden md:flex"
        onClick={(e) => {
          e.stopPropagation();
          navigate(-1);
        }}
      >
        <ChevronLeft size={32} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 hover:text-white h-12 w-12 rounded-full hidden md:flex"
        onClick={(e) => {
          e.stopPropagation();
          navigate(1);
        }}
      >
        <ChevronRight size={32} />
      </Button>

      {/* Thumbnails */}
      <div
        className="absolute bottom-4 left-0 right-0 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex justify-center gap-2 overflow-x-auto p-2 scrollbar-hide">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => {
                  if (index === currentIndex) return;
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`relative h-16 w-16 cursor-pointer rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                  currentIndex === index
                    ? "ring-2 ring-primary-500 scale-110"
                    : "opacity-60 hover:opacity-100 hover:scale-105"
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
