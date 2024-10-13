"use client";

import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/autoplay";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import treinoPersonalizado from "@/assets/images/treino-personalizado.jpeg";
import aulasEmGrupo from "@/assets/images/aulas-em-grupo.jpeg";
import eventos from "@/assets/images/eventos-e-competicoes.jpeg";

export default function ServicesSection() {
  return (
    <section className="bg-secondary-700 py-12 text-right">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-bold text-white mb-8">Nossos Treinos</h2>
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
                <h3 className="text-2xl font-bold mb-2">
                  Treinos Personalizados
                </h3>
                <p className="text-lg font-medium">
                  Treinos adaptados ao seu nível e objetivo, com acompanhamento
                  especializado.
                </p>
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
                <h3 className="text-2xl font-bold mb-2">Aulas em Grupo</h3>
                <p className="text-lg font-medium">
                  Participe de aulas dinâmicas e motivadoras com nossos
                  instrutores qualificados.
                </p>
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
                <h3 className="text-2xl font-bold mb-2">
                  Eventos e Competições
                </h3>
                <p className="text-lg font-medium">
                  Envolva-se em competições para aprimorar suas habilidades e
                  conhecer outros atletas.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
