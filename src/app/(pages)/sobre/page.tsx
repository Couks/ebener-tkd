"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import quemSomos from "@/assets/images/image5.jpeg"; // Exemplo de imagem
import historia1 from "@/assets/images/aulas-em-grupo.jpeg"; // Imagem da história
import historia2 from "@/assets/images/WhatsApp Image 2024-07-25 at 09.11.49.jpeg"; // Imagem adicional da história
import historia3 from "@/assets/images/WhatsApp Image 2024-07-24 at 12.19.27 (1).jpeg"; // Imagem da história
import historia4 from "@/assets/images/image15.jpeg"; // Imagem adicional da história

import "swiper/swiper-bundle.css";
import TestimonialsSection from "@/components/sobre/testimonials-section";
import IntroSection from "@/components/sobre/intro-section";
import MissionAndValues from "@/components/sobre/mission-and-values";

export default function Sobre() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      if (currentDate.getMonth() === 0 && currentDate.getDate() === 1) {
        setAnoAtual(currentDate.getFullYear());
      }
    }, 86400000); // 86400000 é o número de milissegundos em um dia
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const progress =
          sectionRef.current.getBoundingClientRect().top / window.innerHeight;
        const opacity = Math.max(0, Math.min(1, 1 - progress));
        const translateY = Math.max(-50, Math.min(0, -progress * 100));

        // Aplica as animações de acordo com o progresso do scroll
        sectionRef.current.style.opacity = `${opacity}`;
        sectionRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sectionRef}>
      <IntroSection
        title="Conheça a maior academia de Taekwondo na Ilha do Governador"
        subtitle="Aqui, convivem atletas em todos os níveis, desde iniciantes até profissionais, todos unidos por um ambiente que respeita as diferenças e promove a superação pessoal."
        backgroundImage={quemSomos.src}
        buttonText="Descubra Mais"
        buttonLink="#historia"
      />

      {/* Seção de História */}
      <section id="historia" className="container mx-auto px-8 py-12 space-y-8">
        {/* Imagem à esquerda, texto à direita */}
        <div className="flex flex-col md:flex-row items-center md:space-x-8 mb-8">
          <div className="w-full md:w-3/5">
            <Image
              src={historia1}
              alt="Imagem da história de Ebener"
              loading="lazy"
              width={800}
              height={500}
              className=" object-cover rounded-3xl"
            />
          </div>
          <div className="w-full md:w-1/2 text-lg md:text-xl font-medium text-gray-200 leading-relaxed">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-primary-500 mb-4 mt-4 md:mt-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >
              Quem somos?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >
              A <b className="text-primary-500">Ebener TKD</b> é a maior
              academia de <b className="text-primary-500">Taekwondo</b> na Ilha
              do Governador, liderada pelo mestre{" "}
              <b className="text-primary-500">Ebener dos Santos Pinto</b>,
              profissional de{" "}
              <b className="text-primary-500">educação física</b> com quase{" "}
              {anoAtual - 1993} anos de experiência no esporte.
              <br />
              <br />
              Formado na{" "}
              <b className="text-primary-500">
                Universidade Federal do Rio de Janeiro (UFRJ)
              </b>{" "}
              e faixa preta <b className="text-primary-500">3° Dan</b>, Ebener
              se destaca por sua trajetória no{" "}
              <b className="text-primary-500">Taekwondo</b>, desde a{" "}
              <b className="text-primary-500">preparação física</b> até a{" "}
              <b className="text-primary-500">gestão de atletas</b> de alto
              rendimento.
            </motion.p>
          </div>
        </div>

        {/* Texto à esquerda, imagem à direita */}
        <div className="flex flex-col md:flex-row-reverse items-center md:space-x-8 md:space-x-reverse mb-8">
          <div className="w-full md:w-3/5">
            <Image
              src={historia2}
              alt="Imagem da carreira de Ebener"
              loading="lazy"
              width={800}
              height={500}
              className="object-cover aspect-video rounded-3xl"
            />
          </div>
          <div className="w-full md:w-3/5 text-lg md:text-xl font-medium text-gray-200 leading-relaxed">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-primary-500 mb-4 mt-4 md:mt-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >
              Nossa História
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >
              A <b className="text-primary-500">história</b> da Ebener TKD é
              marcada por uma longa <b className="text-primary-500">jornada</b>{" "}
              de <b className="text-primary-500">dedicação</b> ao esporte.
              Ebener começou sua <b className="text-primary-500">prática</b> em
              1993, treinando com o professor Fernando no{" "}
              <b className="text-primary-500">Cassino dos Oficiais do Galeão</b>
              .
              <br />
              <br />
              Desde então, o <b className="text-primary-500">Taekwondo</b>{" "}
              tornou-se parte integrante de sua vida, abrindo portas para
              diversas <b className="text-primary-500">experiências</b>, tanto
              no Brasil quanto no exterior.
            </motion.p>
          </div>
        </div>

        {/* Imagem à esquerda, texto à direita */}
        <div className="flex flex-col md:flex-row items-center md:space-x-8 mb-8">
          <div className="w-full md:w-3/5">
            <Image
              src={historia3}
              alt="Imagem da história de Ebener"
              loading="lazy"
              width={800}
              className="object-cover aspect-video rounded-3xl"
            />
          </div>
          <div className="w-full md:w-2/5 text-lg md:text-xl font-medium text-gray-200 leading-relaxed">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-primary-500 mb-4 mt-4 md:mt-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >
              Gestão de atletas
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >
              Como gestor e preparador físico, Ebener trabalhou com atletas de
              renome internacional, tendo sido técnico da{" "}
              <b className="text-primary-500">
                Seleção Brasileira Militar de Taekwondo
              </b>{" "}
              e participado de três campeonatos mundiais: no{" "}
              <b className="text-primary-500">Rio de Janeiro</b>, no{" "}
              <b className="text-primary-500">Irã</b> e na{" "}
              <b className="text-primary-500">China</b>. <br />
              <br />
              Além disso, teve a oportunidade de conviver e aprender com
              técnicos e atletas olímpicos, o que moldou sua abordagem no ensino
              do Taekwondo.
            </motion.p>
          </div>
        </div>

        {/* Texto à esquerda, imagem à direita */}
        <div className="flex flex-col md:flex-row-reverse items-center md:space-x-8 md:space-x-reverse mb-8">
          <div className="w-full md:w-3/5">
            <Image
              src={historia4}
              alt="Imagem da carreira de Ebener"
              loading="lazy"
              width={800}
              height={500}
              className="object-cover aspect-video rounded-3xl"
            />
          </div>
          <div className="w-full md:w-3/5 text-lg md:text-xl font-medium text-gray-200 leading-relaxed">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-primary-500 mb-4 mt-4 md:mt-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >
              Perseverança
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >
              Um momento de{" "}
              <b className="text-primary-500">grande superação pessoal</b> foi
              quando sua filha enfrentou meses de internação. O{" "}
              <b className="text-primary-500">Taekwondo</b> foi sua âncora
              emocional e psicológica, permitindo que mantivesse o equilíbrio
              durante essa fase difícil.
              <br />
              <br />A experiência o fez compreender ainda mais a{" "}
              <b className="text-primary-500">importância</b> da arte marcial,
              tanto para a <b className="text-primary-500">formação técnica</b>{" "}
              quanto para o{" "}
              <b className="text-primary-500">crescimento pessoal</b>.
            </motion.p>
          </div>
        </div>

        {/* Texto final */}
        <motion.p
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-lg md:text-2xl font-semibold text-gray-200 leading-relaxed text-center"
        >
          Hoje, a Ebener TKD é mais do que uma academia de alto rendimento.
          Aqui, convivem atletas em todos os níveis, desde iniciantes até
          profissionais, todos unidos por um ambiente que respeita as diferenças
          e promove a superação pessoal.
        </motion.p>
      </section>

      {/* Seção Missão e Valores */}
      <MissionAndValues />

      {/* Seção de depoimentos */}
      <TestimonialsSection />
    </div>
  );
}
