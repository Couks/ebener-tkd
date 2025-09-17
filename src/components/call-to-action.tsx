"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Calendar,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function CallToActionSection() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 mx-auto max-w-[95%] sm:max-w-[95%] md:container rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-900 to-secondary-800"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Content container */}
          <div className="text-center space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary-500/20 px-4 py-2 rounded-full mb-2"
            >
              <Sparkles className="text-primary-500 h-4 w-4" />
              <span className="text-sm font-medium text-primary-500">
                Comece agora
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Pronto para começar sua{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
                jornada no Taekwondo?
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Entre em contato conosco hoje e agende uma aula experimental
              gratuita! Descubra como o Taekwondo pode transformar sua vida.
            </motion.p>

            {/* Benefits */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 text-gray-200 justify-center">
                <CheckCircle2 className="text-primary-500 h-5 w-5 flex-shrink-0" />
                <span>Aula experimental gratuita</span>
              </div>
              <div className="flex items-center gap-2 text-gray-200 justify-center">
                <CheckCircle2 className="text-primary-500 h-5 w-5 flex-shrink-0" />
                <span>Instrutores qualificados</span>
              </div>
              <div className="flex items-center gap-2 text-gray-200 justify-center">
                <CheckCircle2 className="text-primary-500 h-5 w-5 flex-shrink-0" />
                <span>Horários flexíveis</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="https://api.whatsapp.com/send/?phone=5521981654811&text&type=phone_number&app_absent=0"
                  target="_blank"
                  className="block"
                >
                  <Button className="bg-primary-500 hover:bg-primary-600 text-black font-bold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-primary-500/30 transition-all duration-200 flex items-center gap-3 min-w-64">
                    <MessageCircle className="h-5 w-5" />
                    Agende pelo WhatsApp
                    <motion.div
                      animate={isHovering ? { x: [0, 5, 0] } : { x: 0 }}
                      transition={{
                        repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
                        duration: 1,
                      }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>

              <Link href="/planos" className="block">
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-gray-500 hover:border-primary-500 text-white hover:text-primary-500 font-medium text-lg px-8 py-6 rounded-xl transition-all duration-200 flex items-center gap-3 min-w-64"
                >
                  <Calendar className="h-5 w-5" />
                  Ver horários de aulas
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
