"use client";

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
  return (
    <section className="relative overflow-hidden bg-secondary-900 py-20 md:py-28 text-white">
      {/* Decorative elements */}
      <div
        className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary-500/10 blur-3xl md:h-72 md:w-72"
        aria-hidden="true"
      ></div>
      <div
        className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary-500/10 blur-3xl md:h-72 md:w-72"
        aria-hidden="true"
      ></div>

      <div className="container relative z-10 mx-auto flex flex-col items-center space-y-8 px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-primary-500/20 px-4 py-2 rounded-full"
        >
          <Sparkles className="text-primary-500 h-4 w-4" />
          <span className="text-sm font-medium text-primary-500">
            Comece agora
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl"
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
          className="text-lg text-gray-300 leading-relaxed max-w-2xl"
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
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            "Aula experimental gratuita",
            "Instrutores qualificados",
            "Horários flexíveis",
          ].map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-3 p-4 rounded-lg bg-white/5 justify-center"
            >
              <CheckCircle2 className="text-primary-500 h-5 w-5 flex-shrink-0" />
              <span className="text-gray-200 text-sm md:text-base">
                {benefit}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="https://api.whatsapp.com/send/?phone=5521981654811&text&type=phone_number&app_absent=0"
              target="_blank"
              className="block"
            >
              <Button className="bg-primary-500 hover:bg-primary-600 text-black font-bold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-primary-500/30 transition-all duration-100 flex items-center gap-3 group">
                <MessageCircle className="h-5 w-5" />
                Agende pelo WhatsApp
                <ArrowRight className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link href="/planos" className="block">
              <Button
                variant="default"
                className="bg-transparent border-2 border-gray-500 text-white  font-medium text-lg px-8 py-6 rounded-xl transition-all duration-100 flex items-center gap-3 w-full hover:bg-secondary-950"
              >
                <Calendar className="h-5 w-5" />
                Ver horários de aulas
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
