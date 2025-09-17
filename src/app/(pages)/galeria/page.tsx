"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ZoomIn,
  Loader2,
  ImageIcon,
  Calendar,
} from "lucide-react";
import IntroSection from "@/components/sobre/intro-section";
import quemSomos from "@/assets/images/t_2025-02-12.jpeg";
import Head from "@/components/head";
import { LightboxModal } from "@/components/ui/lightbox"; // Import the new Lightbox
import Script from "next/script";

const introBgImage = quemSomos;

// Define event type
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrls: string[];
  category: string;
}

// Helper function to format date
const formatDateToLocale = (dateString: string) => {
  const date = new Date(dateString + "T00:00:00"); // Ensure UTC interpretation
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('pt-BR', options);
};

export default function Galeria() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: events.map((event, index) => ({
      "@type": "Event",
      name: event.title,
      startDate: event.date,
      description: event.description,
      image: event.imageUrls,
      location: {
        "@type": "Place",
        name: "Ebener TKD",
        address: "Rua Abélia 197, Jardim Guanabara, Rio de Janeiro - RJ",
      },
    })),
  };

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Event[] = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setEvents([]); // Ensure events is an empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const openModal = (eventImages: string[], imageIndex: number) => {
    setLightboxImages(eventImages);
    setLightboxStartIndex(imageIndex);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="bg-black min-h-screen">
      <Head
        title="Eventos Ebener TKD"
        ogTitle="Eventos Ebener TKD"
        description="Reviva os momentos mais marcantes e especiais dos eventos de Taekwondo da Ebener TKD, com fotos, descrições e datas."
        ogDescription="Reviva os momentos mais marcantes e especiais dos eventos de Taekwondo da Ebener TKD, com fotos, descrições e datas."
        keywords={[
          "Taekwondo",
          "Eventos",
          "Fotos",
          "Momentos",
          "Especiais",
          "Campeonatos",
          "Festivais",
          "Aulões",
        ]}
      />
      {/* Hero Section */}
      <IntroSection
        title="Nossos Eventos"
        subtitle="Reviva os momentos mais marcantes e especiais dos eventos de Taekwondo da Ebener TKD, com fotos, descrições e datas."
        backgroundImage={introBgImage.src}
        buttonText="Ver Eventos"
        buttonLink="#eventos"
      />

      <Script
        id="event-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      {/* Events Section */}
      <section
        id="eventos"
        className="relative overflow-hidden bg-secondary-900 py-20 md:py-28"
      >
        {/* Decorative elements */}
        <div
          className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary-500/10 blur-3xl md:h-72 md:w-72"
          aria-hidden="true"
        ></div>
        <div
          className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary-500/10 blur-3xl md:h-72 md:w-72"
          aria-hidden="true"
        ></div>

        <div className="container relative z-10 mx-auto px-4">
          {/* Section header */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary-500/10 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary-500"></span>
              <span className="text-sm font-medium text-primary-400">
                Momentos especiais
              </span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Galeria de <span className="text-primary-500">Eventos</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Explore nossa coleção de fotos que capturam a essência do
              Taekwondo na Ebener TKD.
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary-500" />
              <p className="text-gray-300">Carregando eventos...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="py-20 text-center">
              <ImageIcon className="mx-auto mb-4 h-16 w-16 text-gray-600" />
              <h3 className="mb-2 text-xl font-bold text-white">
                Nenhum evento encontrado
              </h3>
              <p className="mx-auto max-w-md text-gray-400">
                Ainda não há eventos na galeria. Volte mais tarde!
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  className="rounded-2xl bg-secondary-800 p-6 shadow-2xl md:p-8"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Text Content */}
                  <div className="mb-6 text-center">
                    <span className="mb-3 inline-block rounded-full bg-primary-500/10 px-3 py-1 text-sm font-medium text-primary-400">
                      {event.category}
                    </span>
                    <h3 className="mb-3 text-3xl font-bold text-white md:text-4xl">
                      {event.title}
                    </h3>
                    {event.date && (
                      <p className="mb-4 flex items-center justify-center gap-2 text-gray-400">
                        <Calendar
                          size={20}
                          className="flex-shrink-0 text-primary-500"
                        />
                        {formatDateToLocale(event.date)}
                      </p>
                    )}
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300">
                      {event.description}
                    </p>
                  </div>

                  {/* Image Grid */}
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {event.imageUrls
                      .slice(0, 3)
                      .map((imageSrc, imageIndex) => (
                        <motion.div
                          key={imageIndex}
                          className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-secondary-700 shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          onClick={() =>
                            openModal(event.imageUrls, imageIndex)
                          }
                        >
                          <Image
                            src={imageSrc}
                            alt={`${event.title} - ${imageIndex + 1}`}
                            fill
                            sizes="(max-width: 768px) 40vw, 20vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                            <ZoomIn className="h-8 w-8 text-white" />
                          </div>
                        </motion.div>
                      ))}

                    {event.imageUrls.length > 3 && (
                      <motion.div
                        className="group relative flex aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl bg-secondary-700 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        onClick={() =>
                          openModal(event.imageUrls, 3)
                        }
                      >
                        <Image
                          src={event.imageUrls[3]}
                          alt={`Ver mais de ${event.title}`}
                          fill
                          sizes="(max-width: 768px) 40vw, 20vw"
                          className="object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-50"
                        />
                        <div className="absolute inset-0 bg-black/60"></div>
                        <div className="relative z-10 text-center text-white">
                          <p className="text-4xl font-bold">
                            +{event.imageUrls.length - 3}
                          </p>
                          <p>Ver mais</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={closeModal}
        images={lightboxImages}
        startIndex={lightboxStartIndex}
      />
    </div>
  );
}
