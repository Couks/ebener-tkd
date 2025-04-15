"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, Calendar, Users, Trophy, ArrowRight } from "lucide-react"
import Link from "next/link"

// Import CSS
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

// Import images
import treinoPersonalizado from "@/assets/images/t_sombrinha.jpeg"
import exameAmarelas from "@/assets/images/g_exame_amarelas.jpeg"
import eventos from "@/assets/images/c_grand_Slam_duda_2025.jpg"

// Define service interface
interface Service {
  id: number
  title: string
  description: string
  image: any
  icon: React.ReactNode
  features: string[]
  cta: string
  ctaLink: string
}

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const swiperRef = useRef<SwiperType | null>(null)

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Services data
  const services: Service[] = [
    {
      id: 1,
      title: "Treinos Personalizados",
      description:
        "Treinos adaptados ao seu nível e objetivo, com acompanhamento especializado para maximizar seu desenvolvimento.",
      image: treinoPersonalizado,
      icon: <Calendar  />,
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
      icon: <Users  />,
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
      icon: <Trophy  />,
      features: [
        "Preparação para competições",
        "Eventos nacionais e estaduais",
        "Suporte durante competições",
      ],
      cta: "Galeria",
      ctaLink: "/galeria",
    },
  ]

  // Navigation handlers
  const goNext = () => {
    swiperRef.current?.slideNext()
  }

  const goPrev = () => {
    swiperRef.current?.slidePrev()
  }

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
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center gap-2 bg-primary-500/20 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 rounded-full bg-primary-500"></div>
            <span className="text-sm font-medium text-primary-500">Treinamento especializado</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
            Nossos Serviços
          </h2>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Conheça os diferentes tipos de treinamento e atividades que oferecemos para sua evolução no Taekwondo
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
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-gray-300 mb-4 text-lg">{service.description}</p>

                  <ul className="space-y-2 mb-5">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
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

        {/* Desktop view - Interactive slider */}
        {!isMobile && (
          <div className="relative">
            <Swiper
              effect="fade"
              slidesPerView={1}
              spaceBetween={30}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              modules={[Autoplay, Navigation, Pagination, EffectFade]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="h-[500px]"
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
                type: "bullets",
              }}
            >
              {services.map((service) => (
                <SwiperSlide key={service.id} className="h-[600px]">
                  <div className="grid grid-cols-12 h-full gap-6 bg-secondary-800 rounded-2xl">
                    {/* Image column */}
                    <div className="col-span-6 relative rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={service.image.src || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover aspect-square h-"
                        sizes="(max-width: 1200px) 50vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>

                      {/* Floating badge */}
                      <div className="absolute top-6 left-6 bg-primary-500/90 backdrop-blur-sm text-black font-bold py-2 px-4 rounded-full flex items-center gap-2">
                        <div className="w-5 h-5">{service.icon}</div>
                        <span>{service.title}</span>
                      </div>
                    </div>

                    {/* Content column */}
                    <div className="col-span-5 flex flex-col justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-6"
                        >
                          <h3 className="text-3xl font-bold text-white">{service.title}</h3>
                          <p className="text-gray-300">{service.description}</p>

                          <div className="space-y-3 py-4 border-y border-gray-700">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <ChevronRight className="size-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <Link href={service.ctaLink}>
                            <button className="bg-primary-500 hover:bg-primary-600 text-black font-medium py-3 px-6 mt-8 rounded-xl transition-colors duration-300 flex items-center gap-2 group">
                              {service.cta}
                              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </Link>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom navigation */}
            <div className="flex items-center justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2 z-10 px-4">
              <button
                onClick={goPrev}
                className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-primary-500 hover:text-black transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                onClick={goNext}
                className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-primary-500 hover:text-black transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>

            {/* Custom pagination */}
            <div className="flex justify-center mt-8 gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => swiperRef.current?.slideTo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "bg-primary-500 w-10" : "bg-gray-600"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

