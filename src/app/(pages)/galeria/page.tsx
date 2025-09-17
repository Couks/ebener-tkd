"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Loader2,
  ImageIcon,
  Calendar, // Added Calendar icon
} from "lucide-react";
import IntroSection from "@/components/sobre/intro-section";
import quemSomos from "@/assets/images/t_2025-02-12.jpeg";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import Head from "@/components/head";

// Placeholder for IntroSection background image
const introBgImage = quemSomos; // Use a placeholder image or a default one

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [currentEventImages, setCurrentEventImages] = useState<string[]>([]);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    setSelectedIndex(-1);
    setCurrentEventImages([]);
    document.body.style.overflow = ""; // Restore scrolling
  }, [setSelectedImage, setSelectedIndex, setCurrentEventImages]);

  const navigateImage = useCallback((direction: number) => {
    if (selectedIndex === -1 || currentEventImages.length === 0) return;

    const newIndex = (selectedIndex + direction + currentEventImages.length) % currentEventImages.length;
    setSelectedImage(currentEventImages[newIndex]);
    setSelectedIndex(newIndex);
  }, [selectedIndex, currentEventImages, setSelectedImage, setSelectedIndex]);

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

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage || selectedIndex === -1) return;

      switch (e.key) {
        case "ArrowLeft":
          navigateImage(-1);
          break;
        case "ArrowRight":
          navigateImage(1);
          break;
        case "Escape":
          closeModal();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, selectedIndex, currentEventImages, navigateImage, closeModal]);

  // Handle click outside modal to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    if (selectedImage) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedImage, closeModal]);

  // Navigation functions
  const openModal = (imageSrc: string, eventImages: string[], imageIndex: number) => {
    setSelectedImage(imageSrc);
    setCurrentEventImages(eventImages);
    setSelectedIndex(imageIndex);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
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

      {/* Events Section */}
      <section id="eventos" className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-8">
          {/* Section header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center gap-2 bg-primary-500/20 px-4 py-2 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-primary-500"></span>
              <span className="text-sm font-medium text-primary-500">
                Momentos especiais
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
              Galeria de <span className="text-primary-500">Eventos</span>
            </h2>

            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Explore nossa coleção de fotos que capturam a essência do
              Taekwondo na Ebener TKD em nossos eventos
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
              <p className="text-gray-300">Carregando eventos...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <ImageIcon className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Nenhum evento encontrado
              </h3>
              <p className="text-gray-400 max-w-md">
                Não encontramos eventos para exibir no momento. Volte mais tarde!
              </p>
            </div>
          ) : (
            <>
              {events.map((event, eventIndex) => (
                <motion.div
                  key={event.id}
                  className={`mb-16 last:mb-0 bg-secondary-800/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden p-6 md:p-8 transform transition-all duration-200 hover:shadow-2xl hover:scale-[1.01]`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Bloco de Informações do Evento (Texto) */}
                  <div className="flex flex-col items-center md:items-start text-center md:text-left mb-6">
                    <h3 className="text-4xl lg:text-5xl font-extrabold text-white mb-2 text-balance leading-tight transition-colors duration-200">
                      {event.title}
                    </h3>
                    {event.date && (
                      <p className="text-lg font-medium text-gray-300 flex items-center gap-2 mb-2">
                        <Calendar size={20} className="text-primary-500 flex-shrink-0" />
                        {formatDateToLocale(event.date)}
                      </p>
                    )}
                    {event.category && (
                      <span className="inline-flex items-center rounded-full bg-primary-500/20 px-3 py-1 text-sm font-medium text-primary-500 mt-2">
                        {event.category}
                      </span>
                    )}
                  </div>

                  {/* Bloco de Imagens (4 colunas para desktop, 2 para mobile) */}
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-6" /* Adicionado mb-6 para espaçamento com a descrição */
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {event.imageUrls.slice(0, 3).map((imageSrc, imageIndex) => (
                      <motion.div
                        key={imageIndex}
                        className="relative group overflow-hidden rounded-lg bg-secondary-700 aspect-square cursor-pointer shadow-lg"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }}
                        onClick={() => openModal(imageSrc, event.imageUrls, imageIndex)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                          <Button
                            variant="secondary"
                            size="icon"
                            className="bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm"
                          >
                            <ZoomIn size={24} />
                          </Button>
                        </div>
                        <Image
                          src={imageSrc}
                          alt={`${event.title} - ${imageIndex + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw" /* 25vw para 4 colunas no desktop */
                          className="object-cover transition-transform duration-200 group-hover:scale-110"
                        />
                      </motion.div>
                    ))}

                    {event.imageUrls.length > 3 && ( /* Box "Ver Mais fotos" na 4ª posição */
                      <motion.div
                        className="relative group overflow-hidden rounded-lg bg-secondary-700 aspect-square cursor-pointer shadow-lg flex flex-col items-center justify-center"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }}
                        onClick={() => openModal(event.imageUrls[3], event.imageUrls, 3)} /* Abre da 4ª imagem */
                      >
                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 text-white p-4">
                          <span className="text-5xl font-extrabold mb-2">
                            +{event.imageUrls.length - 3}
                          </span>
                          <span className="text-lg font-semibold">ver mais fotos</span>
                        </div>
                        <Image
                          src={event.imageUrls[3] || "/placeholder.svg"} /* Mostra a 4ª imagem borrada */
                          alt={`Ver mais imagens do evento ${event.title}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw" /* Ajuste de sizes */
                          className="object-cover filter brightness-50 transition-transform duration-200 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 flex items-center justify-center">
                          <Button
                            variant="secondary"
                            size="icon"
                            className="bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm"
                          >
                            <ZoomIn size={24} />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Descrição do Evento (abaixo das imagens) */}
                  <p className="text-lg text-gray-300 leading-relaxed text-center md:text-left mt-4">
                    {event.description}
                  </p>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 z-0" onClick={closeModal}></div>

            <motion.div
              ref={modalRef}
              className="relative z-10 max-w-7xl w-full max-h-[90vh] flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Modal Header */}
              <div className="flex justify-end items-center p-4 bg-secondary-900 rounded-t-xl">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-primary-500"
                  onClick={closeModal}
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="relative bg-black flex-grow flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt={`Imagem ${selectedIndex + 1}`}
                    className="object-contain max-h-[70vh]"
                    width={1200}
                    height={800}
                    priority
                  />
                </div>

                {/* Navigation Arrows */}
                {!isMobile && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-primary-500 text-white hover:text-black rounded-full h-12 w-12"
                      onClick={() => navigateImage(-1)}
                    >
                      <ChevronLeft size={24} />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-primary-500 text-white hover:text-black rounded-full h-12 w-12"
                      onClick={() => navigateImage(1)}
                    >
                      <ChevronRight size={24} />
                    </Button>
                  </>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-secondary-900 rounded-b-xl flex justify-between items-center">
                <div className="text-gray-400 text-sm">
                  {selectedIndex + 1} de {currentEventImages.length}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-primary-500 text-black hover:bg-primary-600"
                    onClick={() => navigateImage(-1)}
                  >
                    <ChevronLeft size={16} className="mr-1" />
                    Anterior
                  </Button>

                  <Button
                    variant="default"
                    className="bg-primary-500 text-black hover:bg-primary-600 transition"
                    size="sm"
                    onClick={() => navigateImage(1)}
                  >
                    Próxima
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
