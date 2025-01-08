"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import quemSomos from "@/assets/images/WhatsApp Image 2024-07-24 at 12.19.37 (2).jpeg"; // Exemplo de imagem
import historia1 from "@/assets/images/aulas-em-grupo.jpeg"; // Imagem da história
import historia2 from "@/assets/images/WhatsApp Image 2024-07-25 at 09.11.49.jpeg"; // Imagem adicional da história
import historia3 from "@/assets/images/WhatsApp Image 2024-07-24 at 12.19.27 (1).jpeg"; // Imagem da história
import historia4 from "@/assets/images/image15.jpeg"; // Imagem adicional da história

import "swiper/swiper-bundle.css";
import TestimonialsSection from "@/components/sobre/testimonials-section";
import { Autoplay } from "swiper/modules";
import IntroSection from "@/components/sobre/intro-section";

export default function Sobre() {
  return (
    <>
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
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
          <div className="w-full md:w-1/2 text-lg md:text-xl font-medium text-gray-200 leading-relaxed">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-4 mt-4 md:mt-0">
              Quem somos?
            </h2>
            <p>
              A Ebener TKD é a maior academia de Taekwondo na Ilha do
              Governador, liderada pelo mestre <b>Ebener dos Santos Pinto</b>,
              profissional de educação física com quase 25 anos de experiência
              no esporte.
              <br />
              <br />
              Formado na Universidade Federal do Rio de Janeiro (UFRJ) e faixa
              preta 3° Dan, Ebener se destaca por sua trajetória no taekwondo,
              desde a preparação física até a gestão de atletas de alto
              rendimento.
            </p>
          </div>
        </div>

        {/* Texto à esquerda, imagem à direita */}
        <div className="flex flex-col md:flex-row-reverse items-center md:space-x-8 md:space-x-reverse mb-8">
          <div className="w-full md:w-3/5">
            <Image
              src={historia2}
              alt="Imagem da carreira de Ebener"
              className="w-full h-auto object-cover aspect-video rounded-2xl"
            />
          </div>
          <div className="w-full md:w-3/5 text-lg md:text-xl font-medium text-gray-200 leading-relaxed">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-4 mt-4 md:mt-0">
              Nossa História
            </h2>
            <p className="mb-4">
              A história da Ebener TKD é marcada por uma longa jornada de
              dedicação ao esporte. Ebener começou sua prática em 1993,
              treinando com o professor Fernando no{" "}
              <b>Cassino dos Oficiais do Galeão</b>.
              <br />
              <br />
              Desde então, o taekwondo tornou-se parte integrante de sua vida,
              abrindo portas para diversas experiências, tanto no Brasil quanto
              no exterior.
            </p>
          </div>
        </div>

        {/* Imagem à esquerda, texto à direita */}
        <div className="flex flex-col md:flex-row items-center md:space-x-8 mb-8">
          <div className="w-full md:w-3/5">
            <Image
              src={historia3}
              alt="Imagem da história de Ebener"
              className="w-full h-auto object-cover aspect-video rounded-2xl"
            />
          </div>
          <div className="w-full md:w-2/5 text-lg md:text-xl font-medium text-gray-200 leading-relaxed">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-4 mt-4 md:mt-0">
              Gestão de atletas
            </h2>
            <p>
              Como gestor e preparador físico, Ebener trabalhou com atletas de
              renome internacional, tendo sido técnico da{" "}
              <b>Seleção Brasileira Militar de Taekwond</b>o e participado de
              três campeonatos mundiais: no <b>Rio de Janeiro</b>, no <b>Irã</b>{" "}
              e na <b>China</b>. <br />
              <br />
              Além disso, ele teve a oportunidade de conviver e aprender com
              técnicos e atletas olímpicos, o que moldou sua abordagem no ensino
              do taekwondo.
            </p>
          </div>
        </div>

        {/* Texto à esquerda, imagem à direita */}
        <div className="flex flex-col md:flex-row-reverse items-center md:space-x-8 md:space-x-reverse mb-8">
          <div className="w-full md:w-3/5">
            <Image
              src={historia4}
              alt="Imagem da carreira de Ebener"
              className="w- h-auto object-cover aspect-video rounded-2xl"
            />
          </div>
          <div className="w-full md:w-3/5 text-lg md:text-xl font-medium text-gray-200 leading-relaxed">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-4 mt-4 md:mt-0">
              Perseverança
            </h2>
            <p className="mb-4">
              Um momento de grande superação pessoal foi quando sua filha
              enfrentou meses de internação. O Taekwondo foi sua âncora
              emocional e psicológica, permitindo que ele mantivesse o
              equilíbrio durante essa fase difícil.
              <br />
              <br />A experiência o fez compreender ainda mais a importância da
              arte marcial, tanto para a formação técnica quanto para o
              crescimento pessoal.
            </p>
          </div>
        </div>

        {/* Texto final */}
        <p className="text-lg md:text-2xl font-semibold text-gray-200 leading-relaxed text-center">
          Hoje, a Ebener TKD é mais do que uma academia de alto rendimento.
          Aqui, convivem atletas em todos os níveis, desde iniciantes até
          profissionais, todos unidos por um ambiente que respeita as diferenças
          e promove a superação pessoal.
        </p>
      </section>

      {/* Seção Missão e Valores */}
      <section className="container mx-auto bg-secondary-800 m-2 rounded-3xl">
        <div className="px-8 py-16 text-center space-y-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-500 mb-6">
              Missão e Valores
            </h2>
            <p className="text-lg md:text-2xl font-medium text-gray-200 leading-relaxed">
              Nossa <span className="text-primary-500 font-bold">missão</span> é
              formar atletas e indivíduos em todas as idades e níveis no
              taekwondo, transmitindo técnicas avançadas e valores essenciais,
              como respeito, disciplina e resiliência.
            </p>
          </div>

          <Swiper
            slidesPerView={1}
            spaceBetween={40}
            loop
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            effect="coverflow"
            modules={[Autoplay]}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="py-8"
          >
            {/* Card Respeito às Diferenças */}
            <SwiperSlide>
              <div className="w-full bg-secondary-500/30 backdrop-blur-sm text-white rounded-2xl shadow-xl p-8 flex flex-col min-h-[200px] border border-primary-500/20 hover:border-primary-500 transition-all duration-300">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary-500">
                  Respeito às Diferenças
                </h3>
                <p className="text-lg md:text-xl font-medium">
                  Alunos de todos os níveis e capacidades são bem-vindos.
                </p>
              </div>
            </SwiperSlide>

            {/* Card Dedicação */}
            <SwiperSlide>
              <div className="w-full bg-secondary-500/30 backdrop-blur-sm text-white rounded-2xl shadow-xl p-8 flex flex-col min-h-[200px] border border-primary-500/20 hover:border-primary-500 transition-all duration-300">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary-500">
                  Dedicação
                </h3>
                <p className="text-lg md:text-xl font-medium">
                  Buscamos a excelência através da superação pessoal diária.
                </p>
              </div>
            </SwiperSlide>

            {/* Card Formação Integral */}
            <SwiperSlide>
              <div className="w-full bg-secondary-500/30 backdrop-blur-sm text-white rounded-2xl shadow-xl p-8 flex flex-col min-h-[200px] border border-primary-500/20 hover:border-primary-500 transition-all duration-300">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary-500">
                  Formação Integral
                </h3>
                <p className="text-lg md:text-xl font-medium">
                  Desenvolvemos atletas e indivíduos resilientes para a vida.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Seção de depoimentos */}
      <TestimonialsSection />
    </>
  );
}
