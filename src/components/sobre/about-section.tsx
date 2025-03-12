"use client";

import Image from "next/image";
import historia1 from "@/assets/images/evento_taca.jpeg";
import historia2 from "@/assets/images/image8.jpeg";
import { motion } from "framer-motion";
import { ArrowRight, Award, Calendar, Medal, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AboutSection() {
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const anosExperiencia = anoAtual - 1993;

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      if (currentDate.getMonth() === 0 && currentDate.getDate() === 1) {
        setAnoAtual(currentDate.getFullYear());
      }
    }, 86400000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants for consistent animations
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const slideIn = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="mx-auto max-w-[95%] sm:max-w-[90%] md:container bg-secondary-800 rounded-3xl overflow-hidden py-12 sm:py-16 md:py-20 mt-8 sm:mt-12 relative">
      {/* Content container */}
      <div className="relative px-5 sm:px-8 md:px-12 z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-500 mb-4">
            Bem-vindo à Ebener TKD!
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left column - Main text and stats */}
          <motion.div
            className="lg:col-span-5 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            variants={slideIn}
          >
            <div className="text-base sm:text-lg md:text-2xl text-gray-200 leading-relaxed space-y-4">
              <p>
                Somos a maior e mais{" "}
                <span className="text-primary-500 font-semibold">
                  tradicional
                </span>{" "}
                academia de{" "}
                <span className="text-primary-500 font-semibold">
                  Taekwondo
                </span>{" "}
                na Ilha do Governador, liderada pelo mestre Ebener dos Santos
                Pinto, faixa preta 3º Dan e profissional com quase{" "}
                {anosExperiencia} anos de{" "}
                <span className="text-primary-500 font-semibold">
                  experiência
                </span>{" "}
                no esporte.
              </p>
              <p>
                Desde 1993, o mestre Ebener dedica sua vida ao{" "}
                <span className="text-primary-500 font-semibold">
                  Taekwondo
                </span>
                , unindo paixão, disciplina e{" "}
                <span className="text-primary-500 font-semibold">
                  excelência
                </span>{" "}
                na formação de atletas.
              </p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <motion.div
                className="bg-secondary-700/50 backdrop-blur-sm p-4 rounded-xl border border-secondary-600"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Calendar className="text-primary-500 mb-2" size={28} />
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {anosExperiencia}
                </h3>
                <p className="text-sm text-gray-300">Anos de experiência</p>
              </motion.div>
              <motion.div
                className="bg-secondary-700/50 backdrop-blur-sm p-4 rounded-xl border border-secondary-600"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Medal className="text-primary-500 mb-2" size={28} />
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  3º
                </h3>
                <p className="text-sm text-gray-300">Dan Faixa Preta</p>
              </motion.div>
            </div>
            {/* Feature highlight */}

            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-secondary-700/50 backdrop-blur-sm p-4 rounded-xl border border-secondary-600 flex items-center gap-4 mt-6"
            >
              <Users className="text-primary-500 flex-shrink-0" size={24} />
              <p className="text-sm text-gray-300">
                Aulas para todas as idades e níveis de experiência
              </p>
            </motion.div>
          </motion.div>

          {/* Center column - Main image */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative h-full flex items-center justify-center">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-primary-500 rounded-tl-lg opacity-70"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-primary-500 rounded-br-lg opacity-70"></div>

              {/* Main image */}
              <div className="relative w-full h-auto aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <Image
                  src={historia1 || "/placeholder.svg?height=600&width=450"}
                  alt="Mestre Ebener dos Santos Pinto em ação"
                  className="object-cover w-full h-full"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-sm font-medium">Mestre Ebener</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column - Secondary image and CTA */}
          <motion.div
            className="lg:col-span-4 flex flex-col justify-between mt-8 xs:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            variants={slideIn}
          >
            {/* Secondary image */}
            <div className="relative mb-6">
              <div className="relative w-full h-auto aspect-video overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={historia2 || "/placeholder.svg?height=400&width=600"}
                  alt="Academia Ebener TKD em atividade"
                  className="object-cover w-full h-full"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Floating achievement badge */}
              <motion.div
                className="absolute -top-5 -right-5 bg-primary-500 text-black font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-2"
                initial={{ rotate: 10, scale: 0 }}
                whileInView={{ rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.8,
                }}
              >
                <Award size={18} />
                <span className="text-sm">Desde 1993</span>
              </motion.div>
            </div>

            {/* Text and CTA */}
            <div className="space-y-6">
              <p className="text-base sm:text-lg md:text-2xl text-gray-200 leading-relaxed">
                Aqui acolhemos alunos de todos os níveis, promovendo um ambiente
                de respeito, aprendizado e{" "}
                <span className="text-primary-500 font-semibold">
                  crescimento
                </span>{" "}
                para todos. Venha fazer parte dessa{" "}
                <span className="text-primary-500 font-semibold">história</span>
                !
              </p>

              {/* CTA Button */}
              <Link href="/sobre" className="block">
                <motion.button
                  className="w-full bg-primary-500 hover:bg-primary-600 rounded-xl text-black text-lg font-bold px-8 py-4 flex items-center justify-center gap-2 group transition-colors"
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Saiba Mais sobre a Ebener TKD
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Timeline indicator */}
        <motion.div
          className="mt-12 sm:mt-16 pt-8 border-t border-secondary-600 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-secondary-700/50 backdrop-blur-sm rounded-full">
            <span className="w-3 h-3 bg-primary-500 rounded-full"></span>
            <p className="text-sm text-gray-300">
              Uma jornada de excelência desde 1993
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
