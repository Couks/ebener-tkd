"use client";

import Image from "next/image";
import historia1 from "@/assets/images/e_china.jpeg";
import { motion } from "framer-motion";
import { ArrowRight, Award, Calendar, Medal, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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
    <section className="bg-secondary-900 py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div
            className="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary-500/10 px-4 py-2"
            variants={fadeIn}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary-500"></span>
            <span className="text-sm font-medium text-primary-400">
              Nossa História
            </span>
          </motion.div>
          <motion.h2
            className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl"
            variants={fadeIn}
          >
            Bem-vindo à <span className="text-primary-500">Ebener TKD</span>
          </motion.h2>
          <motion.p
            className="mx-auto max-w-3xl text-lg text-gray-400"
            variants={fadeIn}
          >
            A maior e mais tradicional academia de Taekwondo na Ilha do
            Governador, liderada pelo Mestre Ebener dos Santos Pinto.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row lg:gap-8">
          {/* Left Column: Image */}
          <motion.div
            className="relative w-full max-w-md lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={slideInLeft}
          >
            <div className="relative aspect-[3/4] h-auto w-full overflow-hidden rounded-2xl border border-secondary-700/30 shadow-xl">
              <Image
                src={historia1}
                alt="Mestre Ebener dos Santos Pinto em ação"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-bold">Mestre Ebener</p>
                <p className="text-sm text-gray-300">Faixa Preta 3º Dan</p>
              </div>
              <motion.div
                className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-primary-500 py-2 px-3 text-sm font-bold text-black shadow-lg"
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
            </div>
          </motion.div>

          {/* Right Column: Text, Stats, and CTA */}
          <motion.div
            className="flex w-full flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            variants={slideInRight}
          >
            <div className="max-w-prose space-y-4 text-lg leading-relaxed text-gray-300">
              <p>
                Somos liderados pelo Mestre Ebener dos Santos Pinto, faixa preta
                3º Dan e profissional com quase{" "}
                <span className="font-semibold text-primary-400">
                  {anosExperiencia} anos de experiência
                </span>{" "}
                no esporte.
              </p>
              <p>
                Desde 2010, o Mestre Ebener dedica sua vida ao Taekwondo, unindo
                paixão, disciplina e excelência na formação de atletas. Aqui
                acolhemos alunos de todos os níveis, promovendo um ambiente de
                respeito, aprendizado e crescimento para todos.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 flex w-full max-w-lg flex-col gap-4 sm:flex-row">
              <motion.div
                className="flex flex-1 items-center gap-4 rounded-2xl border border-secondary-700 bg-secondary-800/80 p-5 text-left shadow-md"
                whileHover={{ y: -5, scale: 1.03 }}
              >
                <div className="flex items-center justify-center rounded-xl bg-primary-500/10 p-3">
                  <Calendar className="text-primary-500" size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold leading-tight text-white">
                    {anosExperiencia}
                  </h3>
                  <p className="truncate text-sm text-gray-400">
                    Anos de experiência
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex flex-1 items-center gap-4 rounded-2xl border border-secondary-700 bg-secondary-800/80 p-5 text-left shadow-md"
                whileHover={{ y: -5, scale: 1.03 }}
              >
                <div className="flex items-center justify-center rounded-xl bg-primary-500/10 p-3">
                  <Medal className="text-primary-500" size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold leading-tight text-white">
                    3º
                  </h3>
                  <p className="truncate text-sm text-gray-400">
                    Dan Faixa Preta
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Feature Highlight */}
            <motion.div
              className="mt-4 flex w-full max-w-lg items-center gap-4 rounded-2xl border border-secondary-700 bg-secondary-800/80 p-5 text-left shadow-md"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex items-center justify-center rounded-xl bg-primary-500/10 p-3">
                <Users className="text-primary-500" size={28} />
              </div>
              <p className="flex-1 font-medium text-gray-300">
                Aulas para todas as idades e níveis de experiência.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div className="mt-8" variants={fadeIn}>
              <Button
                asChild
                className="group flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-5 text-lg font-bold text-black transition-all duration-200 hover:bg-primary-600"
              >
                <Link href="/sobre">
                  Conheça nossa história
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
