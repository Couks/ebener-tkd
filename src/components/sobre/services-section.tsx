"use client";

import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/autoplay";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion"; // Importação do motion para aplicar efeitos de animação

import treinoPersonalizado from "@/assets/images/treino-personalizado.jpeg";
import aulasEmGrupo from "@/assets/images/image4.jpeg";
import eventos from "@/assets/images/eventos-e-competicoes.jpeg";

export default function ServicesSection() {
  return (
    <section className="mx-2 md:container md:mx-auto bg-secondary-800 py-12 px-4 m-2 rounded-3xl text-right">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-4xl font-bold bg-clip-text text-primary-500"
        >
          Nossos Serviços
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto"
        >
          Conheça os diferentes tipos de treinamento e atividades que oferecemos
          para sua evolução no Taekwondo
        </motion.p>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop
        autoplay={{ delay: 5000 }}
        modules={[Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        <SwiperSlide>
          <div className="relative w-full">
            {/* Imagem */}
            <Image
              src={treinoPersonalizado.src}
              alt="Treino Personalizado"
              width={500}
              height={500}
              className="w-[500px] h-[500px] object-cover rounded-lg shadow-lg"
            />
            {/* Card de Informações */}
            <div className="absolute bottom-0 bg-gray-50 p-4 rounded-b-lg shadow-md">
              <motion.h3 // Aplicação do efeito de animação ao título
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >
                Treinos Personalizados
              </motion.h3>
              <motion.p // Aplicação do efeito de animação ao parágrafo
                className="text-lg font-medium"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >
                Treinos adaptados ao seu nível e objetivo, com acompanhamento
                especializado.
              </motion.p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full">
            {/* Imagem */}
            <Image
              src={aulasEmGrupo.src}
              alt="Aulas em Grupo"
              width={500}
              height={500}
              className="w-[500px] h-[500px] object-cover rounded-lg shadow-lg"
            />
            {/* Card de Informações */}
            <div className="absolute bottom-0 bg-gray-50 p-4 rounded-b-lg shadow-md">
              <motion.h3 // Aplicação do efeito de animação ao título
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >
                Aulas em Grupo
              </motion.h3>
              <motion.p // Aplicação do efeito de animação ao parágrafo
                className="text-lg font-medium"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >
                Participe de aulas dinâmicas e motivadoras com nossos
                instrutores qualificados.
              </motion.p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full">
            {/* Imagem */}
            <Image
              src={eventos.src}
              alt="Eventos e Competições"
              width={500}
              height={500}
              className="w-[500px] h-[500px] object-cover rounded-lg shadow-lg"
            />
            {/* Card de Informações */}
            <div className="absolute bottom-0 bg-gray-50 p-4 rounded-b-lg shadow-md">
              <motion.h3 // Aplicação do efeito de animação ao título
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >
                Eventos e Competições
              </motion.h3>
              <motion.p // Aplicação do efeito de animação ao parágrafo
                className="text-lg font-medium"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
              >
                Envolva-se em competições para aprimorar suas habilidades e
                conhecer outros atletas.
              </motion.p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
