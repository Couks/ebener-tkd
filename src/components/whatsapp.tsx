"use client"

import type React from "react"
import { useState, useEffect } from "react"
import whatsapp from "@/assets/whatsapp.png"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const WhatsappButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [isButtonVisible, setIsButtonVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Verificar se o usuário já fechou o widget nesta sessão
    const hasUserDismissed = sessionStorage.getItem("whatsappWidgetDismissed")

    if (hasUserDismissed === "true") {
      setIsDismissed(true)
    } else {
      // Mostrar o botão após 5 segundos se não foi fechado
      const timeout = setTimeout(() => {
        setIsButtonVisible(true)
      }, 5000)

      return () => clearTimeout(timeout)
    }
  }, [])

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsButtonVisible(false)
    setIsDismissed(true)
    sessionStorage.setItem("whatsappWidgetDismissed", "true")
  }

  // Se o usuário fechou o widget, não renderizamos nada
  if (isDismissed) return null

  return (
    <AnimatePresence>
      {isButtonVisible && (
        <motion.div
          className="fixed bottom-12 right-12 z-30"
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{
            scale: 1,
            rotate: 0,
            opacity: 1,
            y: [0, -10, 0],
          }}
          exit={{
            scale: 0,
            rotate: 180,
            opacity: 0,
            x: 100,
          }}
          transition={{
            duration: 0.8,
            y: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        >
          {/* Botão para fechar o widget */}
          <motion.button
            className="absolute -top-3 -right-3 bg-gray-800 text-white rounded-full p-1 z-10 shadow-md hover:bg-red-500 transition-colors"
            onClick={handleDismiss}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={16} />
          </motion.button>

          {/* Efeito de ping */}
          <motion.div
            className={`absolute -inset-2 bg-green-500 rounded-full opacity-25`}
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              opacity: isHovered ? [0.25, 0.4, 0.25] : 0.25,
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
              repeatType: "reverse",
            }}
          />

          {/* Botão principal do WhatsApp */}
          <motion.a
            href="https://wa.me/5521981654811"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Tooltip */}
            <motion.div
              className="absolute right-full mr-3 bg-white rounded-lg px-3 py-2 shadow-lg whitespace-nowrap"
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : 20,
              }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-800 font-medium">Fale conosco no WhatsApp!</p>
              <div className="absolute right-0 top-1/2 -mt-2 -mr-1 w-0 h-0 border-8 border-transparent border-l-white" />
            </motion.div>

            {/* Ícone do WhatsApp */}
            <motion.div
              className="rounded-full shadow-lg"
              whileHover={{
                boxShadow: "0 0 15px rgba(37, 211, 102, 0.8)",
              }}
            >
              <Image
                src={whatsapp || "/placeholder.svg"}
                alt="WhatsApp"
                className="size-14 rounded-full"
                loading="lazy"
              />
            </motion.div>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WhatsappButton
