"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Award, Calendar, Trophy } from "lucide-react";

// Import images
import quemSomos from "@/assets/images/t_10_10_24.jpeg";
import aulasEmGrupo from "@/assets/images/t_aulas_Em_grupo.jpeg";
import ebenerold2 from "@/assets/images/t_ebener_old_2.jpeg";
import selecao from "@/assets/images/t_selecao.jpeg";
import perseveranca from "@/assets/images/c_perseveranca_sobre.jpeg";

// Import components
import TestimonialsSection from "@/components/sobre/testimonials-section";
import IntroSection from "@/components/sobre/intro-section";
import MissionAndValues from "@/components/sobre/mission-and-values";
import Head from "@/components/head";

export default function Sobre() {
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const pageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div ref={pageRef} className="bg-black">
      <Head
        title="Sobre Nós"
        ogTitle="Sobre Nós"
        description="Conheça a história da Ebener TKD"
        ogDescription="Conheça a história da Ebener TKD"
        keywords={["Taekwondo", "Ebener TKD", "História", "Sobre Nós"]}
      />
      {/* Hero Section */}
      <IntroSection
        title="A maior academia de Taekwondo na Ilha do Governador"
        subtitle="Ambiente de respeito e superação para atletas de todos os níveis."
        backgroundImage={quemSomos.src}
        buttonText="Descubra Nossa História"
        buttonLink="#historia"
      />

      {/* History Section */}
      <section
        id="historia"
        className="container mx-auto px-4 md:px-8 py-16 md:py-24 space-y-16 md:space-y-32"
      >
        {/* Who We Are */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <motion.div
            className="md:col-span-7 relative"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={aulasEmGrupo || "/placeholder.svg"}
                alt="Imagem da história de Ebener"
                width={800}
                height={500}
                className="object-cover w-full aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 grid grid-cols-2 gap-4">
                <div className="bg-black/50 backdrop-blur-sm p-3 rounded-xl">
                  <div className="flex items-center gap-2 text-primary-500 mb-1">
                    <Calendar size={16} />
                    <span className="text-sm font-medium">Desde</span>
                  </div>
                  <p className="text-xl font-bold text-white">2010</p>
                </div>
                <div className="bg-black/50 backdrop-blur-sm p-3 rounded-xl">
                  <div className="flex items-center gap-2 text-primary-500 mb-1">
                    <Award size={16} />
                    <span className="text-sm font-medium">Faixa</span>
                  </div>
                  <p className="text-xl font-bold text-white">3° Dan</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-primary-500 rounded-br-3xl -z-10"></div>
          </motion.div>

          <motion.div
            className="md:col-span-5"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-500/20 px-3 py-1.5 rounded-full mb-4">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span className="text-sm font-medium text-primary-500">
                Quem somos
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              A maior academia de{" "}
              <span className="text-primary-500">Taekwondo</span> da Ilha
            </h2>

            <div className="space-y-4 text-gray-300">
              <p>
                A{" "}
                <span className="text-primary-500 font-semibold">
                  Ebener TKD
                </span>{" "}
                é liderada pelo mestre{" "}
                <span className="text-primary-500 font-semibold">
                  Ebener dos Santos Pinto
                </span>
                , profissional de{" "}
                <span className="text-primary-500 font-semibold">
                  educação física
                </span>{" "}
                com quase {anoAtual - 1993} anos de experiência no esporte.
              </p>
              <p>
                Formado na{" "}
                <span className="text-primary-500 font-semibold">
                  Universidade Federal do Rio de Janeiro (UFRJ)
                </span>{" "}
                e faixa preta{" "}
                <span className="text-primary-500 font-semibold">3° Dan</span>,
                Ebener se destaca por sua trajetória no{" "}
                <span className="text-primary-500 font-semibold">
                  Taekwondo
                </span>
                , desde a{" "}
                <span className="text-primary-500 font-semibold">
                  preparação física
                </span>{" "}
                até a{" "}
                <span className="text-primary-500 font-semibold">
                  gestão de atletas
                </span>{" "}
                de alto rendimento.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Our History */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <motion.div
            className="md:col-span-5 md:order-2"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-500/20 px-3 py-1.5 rounded-full mb-4">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span className="text-sm font-medium text-primary-500">
                Nossa história
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Uma <span className="text-primary-500">jornada</span> de dedicação
              ao esporte
            </h2>

            <div className="space-y-4 text-gray-300">
              <p>
                A{" "}
                <span className="text-primary-500 font-semibold">história</span>{" "}
                da Ebener TKD é marcada por uma longa{" "}
                <span className="text-primary-500 font-semibold">jornada</span>{" "}
                de{" "}
                <span className="text-primary-500 font-semibold">
                  dedicação
                </span>{" "}
                ao esporte. Ebener começou sua{" "}
                <span className="text-primary-500 font-semibold">prática</span>{" "}
                em 1993, treinando com o professor Fernando no{" "}
                <span className="text-primary-500 font-semibold">
                  Cassino dos Oficiais do Galeão
                </span>
                .
              </p>
              <p>
                Desde então, o{" "}
                <span className="text-primary-500 font-semibold">
                  Taekwondo
                </span>{" "}
                tornou-se parte integrante de sua vida, abrindo portas para
                diversas{" "}
                <span className="text-primary-500 font-semibold">
                  experiências
                </span>
                , tanto no Brasil quanto no exterior.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-7 md:order-1 relative"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={ebenerold2 || "/placeholder.svg"}
                alt="Imagem da carreira de Ebener"
                width={800}
                height={500}
                className="object-cover w-full aspect-video"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

              {/* Timeline overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-black/50 backdrop-blur-sm p-4 rounded-xl inline-block">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                      <Calendar className="text-primary-500" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Início da jornada</p>
                      <p className="text-xl font-bold text-white">1993</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-primary-500 rounded-bl-3xl -z-10"></div>
          </motion.div>
        </div>

        {/* Athlete Management */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <motion.div
            className="md:col-span-7 relative"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={selecao || "/placeholder.svg"}
                alt="Imagem da história de Ebener"
                width={800}
                height={500}
                className="object-cover w-full aspect-video"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

              {/* Achievements overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-black/50 backdrop-blur-sm p-3 rounded-xl text-center">
                    <Trophy
                      className="text-primary-500 mx-auto mb-1"
                      size={20}
                    />
                    <p className="text-sm font-bold text-white">Brasil</p>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm p-3 rounded-xl text-center">
                    <Trophy
                      className="text-primary-500 mx-auto mb-1"
                      size={20}
                    />
                    <p className="text-sm font-bold text-white">Irã</p>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm p-3 rounded-xl text-center">
                    <Trophy
                      className="text-primary-500 mx-auto mb-1"
                      size={20}
                    />
                    <p className="text-sm font-bold text-white">China</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-primary-500 rounded-tr-3xl -z-10"></div>
          </motion.div>

          <motion.div
            className="md:col-span-5"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-500/20 px-3 py-1.5 rounded-full mb-4">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span className="text-sm font-medium text-primary-500">
                Gestão de atletas
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Experiência{" "}
              <span className="text-primary-500">internacional</span>
            </h2>

            <div className="space-y-4 text-gray-300">
              <p>
                Como gestor e preparador físico, Ebener trabalhou com atletas de
                renome internacional, tendo sido técnico da{" "}
                <span className="text-primary-500 font-semibold">
                  Seleção Brasileira Militar de Taekwondo
                </span>{" "}
                e participado de três campeonatos mundiais: no{" "}
                <span className="text-primary-500 font-semibold">
                  Rio de Janeiro
                </span>
                , no <span className="text-primary-500 font-semibold">Irã</span>{" "}
                e na{" "}
                <span className="text-primary-500 font-semibold">China</span>.
              </p>
              <p>
                Além disso, teve a oportunidade de conviver e aprender com
                técnicos e atletas olímpicos, o que moldou sua abordagem no
                ensino do Taekwondo.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Perseverance */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <motion.div
            className="md:col-span-5 md:order-2"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-500/20 px-3 py-1.5 rounded-full mb-4">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span className="text-sm font-medium text-primary-500">
                Perseverança
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Superação <span className="text-primary-500">pessoal</span>
            </h2>

            <div className="space-y-4 text-gray-300">
              <p>
                Um momento de{" "}
                <span className="text-primary-500 font-semibold">
                  grande superação pessoal
                </span>{" "}
                foi quando sua filha enfrentou meses de internação. O{" "}
                <span className="text-primary-500 font-semibold">
                  Taekwondo
                </span>{" "}
                foi sua âncora emocional e psicológica, permitindo que
                mantivesse o equilíbrio durante essa fase difícil.
              </p>
              <p>
                A experiência o fez compreender ainda mais a{" "}
                <span className="text-primary-500 font-semibold">
                  importância
                </span>{" "}
                da arte marcial, tanto para a{" "}
                <span className="text-primary-500 font-semibold">
                  formação técnica
                </span>{" "}
                quanto para o{" "}
                <span className="text-primary-500 font-semibold">
                  crescimento pessoal
                </span>
                .
              </p>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-7 md:order-1 relative"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={perseveranca || "/placeholder.svg"}
                alt="Imagem da carreira de Ebener"
                width={800}
                height={500}
                className="object-cover w-full aspect-video"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary-500 rounded-tl-3xl -z-10"></div>
          </motion.div>
        </div>

        {/* Summary */}
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="bg-secondary-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-t-4 border-primary-500">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Mais do que uma academia
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Hoje, a Ebener TKD é mais do que uma academia de alto rendimento.
              Aqui, convivem atletas em todos os níveis, desde iniciantes até
              profissionais, todos unidos por um ambiente que respeita as
              diferenças e promove a superação pessoal.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Mission and Values Section */}
      <MissionAndValues />

    </div>
  );
}
