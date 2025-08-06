"use client";

import Image from "next/image";
import historia1 from "@/assets/images/e_china.jpeg"; // Certifique-se que o caminho está correto
import { motion } from "framer-motion";
import { ArrowRight, Award, Calendar, Medal, Users } from 'lucide-react';
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AboutSection() {
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const anosExperiencia = anoAtual - 1993; // Ano de fundação fictício para cálculo (ajuste se necessário)

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      if (currentDate.getMonth() === 0 && currentDate.getDate() === 1) {
        setAnoAtual(currentDate.getFullYear());
      }
    }, 86400000); // 86400000 é o número de milissegundos em um dia
    return () => clearInterval(interval);
  }, []);

  // Animation variants for consistent animations
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="mx-auto max-w-[95%] sm:max-w-[90%] md:container bg-secondary-800 rounded-3xl overflow-hidden py-12 sm:py-16 md:py-20 mt-8 sm:mt-12 relative">
      {/* Content container */}
      <div className="relative px-5 sm:px-8 md:px-12 z-10">
        {/* Main content - Two columns layout for desktop */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Column: Main text, new description, and Stats */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left" // Centraliza em mobile, alinha à esquerda em desktop
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            variants={slideInLeft}
          >
            {/* Section header now integrated */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-500 mb-4"> {/* Ajustado tamanho de fonte */}
              Bem-vindo à Ebener TKD!
            </h2>

            <div className="text-base sm:text-sm md:text-md lg:text-lg text-gray-200 leading-relaxed space-y-3 max-w-prose"> {/* Ajustado space-y */}
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
              <p className="mb-6"> {/* Ajustado mb */}
                Desde 2010, o mestre Ebener dedica sua vida ao{" "}
                <span className="text-primary-500 font-semibold">
                  Taekwondo
                </span>
                , unindo paixão, disciplina e{" "}
                <span className="text-primary-500 font-semibold">
                  excelência
                </span>{" "}
                na formação de atletas.
              </p>
              {/* NEW: Description moved from right */}
              <p className="text-base sm:text-sm md:text-md lg:text-lg text-gray-200 leading-relaxed">
                Aqui acolhemos alunos de todos os níveis, promovendo um ambiente
                de respeito, aprendizado e{" "}
                <span className="text-primary-500 font-semibold">
                  crescimento
                </span>{" "}
                para todos. Venha fazer parte dessa{" "}
                <span className="text-primary-500 font-semibold">história</span>
                !
              </p>
            </div>

            {/* Stats and Feature Cards - Improved Layout with Consistent Left Alignment */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-lg">
              {/* Experience Card */}
              <motion.div
                className="flex-1 bg-secondary-700/60 backdrop-blur-sm p-5 rounded-2xl border border-secondary-600 flex flex-row items-center gap-4 min-w-[0] shadow-md hover:shadow-lg transition-shadow duration-300 text-left"
                whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.4 } }}
              >
                <div className="flex items-center justify-center bg-primary-500/10 rounded-xl p-3">
                  <Calendar className="text-primary-500" size={32} />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <h3 className="text-3xl font-extrabold text-white leading-tight">{anosExperiencia}</h3>
                  <p className="text-xs sm:text-sm text-gray-300 truncate">Anos de experiência</p>
                </div>
              </motion.div>
              {/* Dan Card */}
              <motion.div
                className="flex-1 bg-secondary-700/60 backdrop-blur-sm p-5 rounded-2xl border border-secondary-600 flex flex-row items-center gap-4 min-w-[0] shadow-md hover:shadow-lg transition-shadow duration-300 text-left"
                whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.4 } }}
              >
                <div className="flex items-center justify-center bg-primary-500/10 rounded-xl p-3">
                  <Medal className="text-primary-500" size={32} />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <h3 className="text-3xl font-extrabold text-white leading-tight">3º</h3>
                  <p className="text-xs sm:text-sm text-gray-300 truncate">Dan Faixa Preta</p>
                </div>
              </motion.div>
            </div>

            {/* Feature highlight - now styled as a horizontal card, always left-aligned */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.4 } }}
              className="bg-secondary-700/60 backdrop-blur-sm p-5 rounded-2xl border border-secondary-600 flex flex-row items-center gap-4 mt-4 w-full max-w-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-left"
            >
              <div className="flex items-center justify-center bg-primary-500/10 rounded-xl p-3">
                <Users className="text-primary-500" size={28} />
              </div>
              <p className="text-sm sm:text-base md:text-md lg:text-lg text-gray-300 font-medium flex-1 min-w-0">
                Aulas para todas as idades e níveis de experiência
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Image, "Desde 2010" badge, and CTA button */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={slideInRight}
          >
            {/* Main image container */}
            <div className="relative w-full max-w-md">
              <div className="relative w-full h-auto aspect-[3/4] overflow-hidden rounded-2xl shadow-xl border border-secondary-700/30">
                <Image
                  src={historia1 || "/placeholder.svg"}
                  alt="Mestre Ebener dos Santos Pinto em ação"
                  className="object-cover w-full h-full"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-sm font-medium">Mestre Ebener</p>
                </div>
                {/* Floating achievement badge - Re-positioned inside image container at top-right */}
                <motion.div
                  className="absolute top-4 right-4 bg-primary-500 text-black font-bold py-2 px-3 rounded-full shadow-lg flex items-center gap-2 text-sm"
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
                  <Award size={16} />
                  <span>Desde 2010</span>
                </motion.div>

                {/* CTA Button - Re-positioned inside image container at bottom */}
                <div className="absolute bottom-4 left-4 right-4">
                  <Link href="/sobre" className="block">
                    <motion.button
                      className="w-full bg-primary-500 hover:bg-primary-600 rounded-xl text-black text-lg font-bold px-6 py-4 flex items-center justify-center gap-2 group transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{
                        scale: 1.03,
                        boxShadow:
                          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Saiba Mais sobre a Ebener TKD
                      <ArrowRight
                        className="group-hover:translate-x-1 transition-transform duration-300"
                        size={20}
                      />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}