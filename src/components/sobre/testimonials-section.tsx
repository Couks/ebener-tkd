"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Quote, ArrowRight, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton" // Import Skeleton

// Define testimonial interface - updated to match API
interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  image_url: string | null;
  achievement?: string | null;
  year: string | null;
}

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/testimonials');
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error(error);
        // Handle error state if needed
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Return loading state or empty state if no testimonials
  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-12 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <div className="mt-16 max-w-5xl mx-auto">
            <Skeleton className="h-[400px] w-full rounded-3xl" />
            <div className="mt-8 flex justify-center gap-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <Skeleton className="w-16 h-16 rounded-full" />
              <Skeleton className="w-16 h-16 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null; // Or some placeholder
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0  -z-10"></div>



      <div className="container mx-auto px-4">
        {/* Header section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            Depoimentos dos <span className="text-primary-500">nossos alunos</span>
          </h2>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Histórias reais de transformação através do Taekwondo
          </p>
        </motion.div>

        {/* Testimonials showcase */}
        <div className="relative max-w-5xl mx-auto" ref={containerRef}>
          {/* Large decorative quote */}
          <div className="absolute -top-10 -left-10 text-primary-500/10 hidden md:block">
            <Quote className="w-32 h-32" />
          </div>

          {/* Testimonial cards */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[activeTestimonial].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="bg-secondary-700 rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="md:grid md:grid-cols-2">
                  {/* Image column */}
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={testimonials[activeTestimonial].image_url || "/placeholder.svg"}
                      alt={testimonials[activeTestimonial].name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                    {/* Mobile name overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-4 md:hidden">
                      <p className="font-bold text-2xl text-white">{testimonials[activeTestimonial].name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300">{testimonials[activeTestimonial].role}</span>
                        {testimonials[activeTestimonial].achievement && (
                          <span className="bg-primary-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                            {testimonials[activeTestimonial].achievement}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content column */}
                  <div className="p-6 md:p-8 lg:p-10">
                    {/* Desktop name */}
                    <div className="hidden md:block mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-2xl text-white">{testimonials[activeTestimonial].name}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-300">{testimonials[activeTestimonial].role}</span>
                            {testimonials[activeTestimonial].achievement && (
                              <span className="bg-primary-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                                {testimonials[activeTestimonial].achievement}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="bg-secondary-600 px-3 py-1 rounded-full text-sm text-gray-300">
                          {testimonials[activeTestimonial].year}
                        </div>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 text-primary-500/20 w-8 h-8" />
                      <p className="text-white text-lg md:text-xl leading-relaxed pl-6 md:pl-8">
                        {testimonials[activeTestimonial].quote}
                      </p>
                    </div>

                    {/* Mobile year */}
                    <div className="mt-4 md:hidden">
                      <div className="bg-secondary-600 px-3 py-1 rounded-full text-sm text-gray-300 inline-block">
                        {testimonials[activeTestimonial].year}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Testimonial navigation */}
          <div className="mt-8 flex justify-center gap-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`relative w-12 h-3 rounded-full transition-all duration-300 ${
                  activeTestimonial === index ? "bg-primary-500" : "bg-secondary-600 hover:bg-secondary-500"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              >
                {activeTestimonial === index && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-primary-500 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Testimonial thumbnails */}
          <div className="mt-8 flex justify-center gap-4">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                onClick={() => setActiveTestimonial(index)}
                className={`relative rounded-full overflow-hidden transition-all duration-300 ${
                  activeTestimonial === index
                    ? "ring-4 ring-primary-500 ring-offset-2 ring-offset-secondary-800"
                    : "opacity-70 hover:opacity-100"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Avatar className="w-16 h-16">
                  <AvatarImage src={testimonial.image_url || undefined} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {activeTestimonial === index && (
                  <motion.div
                    layoutId="activeBorder"
                    className="absolute inset-0 border-2 border-primary-500 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>


      </div>
    </section>
  )
}

