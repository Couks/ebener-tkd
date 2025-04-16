"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn, Loader2, ImageIcon, RefreshCw } from "lucide-react"
import IntroSection from "@/components/sobre/intro-section"
import quemsSomos from "@/assets/images/e_ebener_E_alan.jpg"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import Head from "@/components/head"

// Import all images from the directory
const importAll = (r: object) => (r as any).keys().map(r)
const images = importAll((require as any).context("@/assets/images", false, /\.(png|jpe?g|svg)$/))

// Define image type
interface GalleryImage {
  src: string
  alt: string
  category: string
  width: number
  height: number
  aspectRatio: number
  filename: string
}

// Define category mapping
const CATEGORY_PREFIXES = {
  t_: "Treinos",
  c_: "Competições",
  g_: "Graduações",
  e_: "Eventos",
}

// Process images to add metadata based on filename prefixes
const processImages = (images: any[]): GalleryImage[] => {
  return images.map((image, index) => {
    // Get the filename from the path
    const pathParts = image.default.src.split("/")
    const filename = pathParts[pathParts.length - 1]

    // Determine category based on prefix
    let category = "Outros"
    for (const [prefix, categoryName] of Object.entries(CATEGORY_PREFIXES)) {
      if (filename.toLowerCase().startsWith(prefix)) {
        category = categoryName
        break
      }
    }

    // Generate alt text from filename (remove prefix and extension)
    const altText = filename
      .replace(/^[a-z]_/i, "") // Remove prefix
      .replace(/\.(jpg|jpeg|png|gif|svg)$/i, "") // Remove extension
      .replace(/-|_/g, " ") // Replace dashes and underscores with spaces

    // Generate random dimensions for demonstration
    // In a real app, you would get these from the actual images
    const width = Math.floor(Math.random() * 500) + 500 // 500-1000px
    const height = Math.floor(Math.random() * 500) + 500 // 500-1000px
    const aspectRatio = width / height

    return {
      src: image.default,
      alt: altText || `Imagem de Taekwondo ${index + 1}`,
      category,
      width,
      height,
      aspectRatio,
      filename,
    }
  })
}

export default function Galeria() {
  // Process and shuffle images
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([])
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<string>("Todos")
  const [categories, setCategories] = useState<string[]>([])
  const [visibleCount, setVisibleCount] = useState(12)

  const isMobile = useMediaQuery("(max-width: 768px)")
  const modalRef = useRef<HTMLDivElement>(null)

  // Initialize gallery
  useEffect(() => {
    const processedImages = processImages(images)
    setGalleryImages(processedImages)
    setFilteredImages(processedImages)

    // Extract unique categories and sort them in a specific order
    const allCategories = Array.from(new Set(processedImages.map((img) => img.category)))

    // Define the preferred order
    const preferredOrder = ["Treinos", "Competições", "Graduações", "Eventos", "Outros"]

    // Sort categories according to preferred order
    const sortedCategories = allCategories.sort((a, b) => {
      const indexA = preferredOrder.indexOf(a)
      const indexB = preferredOrder.indexOf(b)
      return indexA - indexB
    })

    setCategories(sortedCategories)

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Handle filtering
  useEffect(() => {
    let results = [...galleryImages]

    // Apply category filter
    if (activeFilter !== "Todos") {
      results = results.filter((img) => img.category === activeFilter)
    }

    setFilteredImages(results)
    setVisibleCount(12) // Reset pagination when filters change
  }, [activeFilter, galleryImages])

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return

      switch (e.key) {
        case "ArrowLeft":
          navigateImage(-1)
          break
        case "ArrowRight":
          navigateImage(1)
          break
        case "Escape":
          closeModal()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, selectedIndex, filteredImages])

  // Handle click outside modal to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal()
      }
    }

    if (selectedImage) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [selectedImage])

  // Navigation functions
  const openModal = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setSelectedIndex(index)
    document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  }

  const closeModal = () => {
    setSelectedImage(null)
    setSelectedIndex(-1)
    document.body.style.overflow = "" // Restore scrolling
  }

  const navigateImage = (direction: number) => {
    if (selectedIndex === -1) return

    const newIndex = (selectedIndex + direction + filteredImages.length) % filteredImages.length
    setSelectedImage(filteredImages[newIndex])
    setSelectedIndex(newIndex)
  }

  // Load more images
  const loadMore = () => {
    setVisibleCount((prev) => prev + 12)
  }

  // Reset filters
  const resetFilters = () => {
    setActiveFilter("Todos")
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <div className="bg-secondary-950 min-h-screen">
      <Head
        title="Galeria de Fotos"
        ogTitle="Galeria de Fotos"
        description="Veja os momentos especiais dos nossos alunos em ação, desde iniciantes até faixas pretas, compartilhando a energia e dedicação ao Taekwondo"
        ogDescription="Veja os momentos especiais dos nossos alunos em ação, desde iniciantes até faixas pretas, compartilhando a energia e dedicação ao Taekwondo"
        keywords={[
          "Taekwondo",
          "Galeria de Fotos",
          "Momentos Especiais",
          "Alunos",
          "Iniciantes",
          "Faixas Pretas",
          "Energia",
          "Dedicação",
        ]}
      />
      {/* Hero Section */}
      <IntroSection
        title="Nossa Galeria de Fotos"
        subtitle="Veja os momentos especiais dos nossos alunos em ação, desde iniciantes até faixas pretas, compartilhando a energia e dedicação ao Taekwondo"
        backgroundImage={quemsSomos.src}
        buttonText="Ver fotos"
        buttonLink="#galeria"
      />

      {/* Gallery Section */}
      <section id="galeria" className="py-16 md:py-24 relative">
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
              <span className="text-sm font-medium text-primary-500">Momentos especiais</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
              Galeria de <span className="text-primary-500">Imagens</span>
            </h2>

            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Explore nossa coleção de fotos que capturam a essência do Taekwondo na Ebener TKD
            </p>
          </motion.div>

          {/* Filters */}
          <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Button
                variant={activeFilter === "Todos" ? "default" : "outline"}
                className={`rounded-full ${activeFilter === "Todos" ? "bg-primary-500 text-black hover:bg-primary-600" : "hover:text-primary-500"}`}
                onClick={() => setActiveFilter("Todos")}
              >
                Todos
              </Button>

              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeFilter === category ? "default" : "outline"}
                  className={`rounded-full ${activeFilter === category ? "bg-primary-500 text-black hover:bg-primary-600" : "hover:text-primary-500"}`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </Button>
              ))}

              {activeFilter !== "Todos" && (
                <Button
                  variant="ghost"
                  className="rounded-full text-gray-400 hover:text-primary-500"
                  onClick={resetFilters}
                >
                  <RefreshCw size={16} className="mr-2" />
                  Limpar filtros
                </Button>
              )}
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
              <p className="text-gray-300">Carregando imagens...</p>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <ImageIcon className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Nenhuma imagem encontrada</h3>
              <p className="text-gray-400 max-w-md">
                Não encontramos imagens que correspondam aos seus filtros. Tente ajustar seus critérios de busca.
              </p>
              <Button variant="outline" className="mt-6" onClick={resetFilters}>
                Limpar filtros
              </Button>
            </div>
          ) : (
            <>
              {/* Masonry Gallery */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredImages.slice(0, visibleCount).map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative group overflow-hidden rounded-xl bg-secondary-800"
                    variants={itemVariants}
                    style={{
                      aspectRatio: "1/1",
                    }}
                    whileHover={{ y: -5 }}
                    onClick={() => openModal(image, index)}
                  >
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="bg-black/50 hover:bg-primary-500 text-white hover:text-black"
                      >
                        <ZoomIn size={20} />
                      </Button>
                    </div>

                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                      <span className="text-xs font-medium text-primary-500 bg-black/30 px-2 py-1 rounded-full">
                        {image.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More Button */}
              {visibleCount < filteredImages.length && (
                <div className="flex justify-center mt-12">
                  <Button onClick={loadMore} variant="secondary" className="rounded-2xl">
                    Carregar mais imagens
                  </Button>
                </div>
              )}
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
              <div className="flex justify-between items-center p-4 bg-secondary-900 rounded-t-xl">
                <div>
                  <span className="text-xs font-medium text-primary-500 bg-primary-500/10 px-2 py-1 rounded-full">
                    {selectedImage.category}
                  </span>
                 
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-primary-500"
                    onClick={closeModal}
                  >
                    <X size={20} />
                  </Button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="relative bg-secondary-950 flex-grow flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={selectedImage.src || "/placeholder.svg"}
                    alt={selectedImage.alt}
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
                  {selectedIndex + 1} de {filteredImages.length}
                </div>

                <div className="flex gap-2">
                  <Button variant="default" size="sm" className="bg-primary-500 text-black hover:bg-primary-600" onClick={() => navigateImage(-1)}>
                    <ChevronLeft size={16} className="mr-1" />
                    Anterior
                  </Button>

                  <Button variant="default" className="bg-primary-500 text-black hover:bg-primary-600 transition" size="sm" onClick={() => navigateImage(1)}>
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
  )
}

