import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectCube,
  EffectCards,
  EffectFade,
} from "swiper/modules";

export default function ServicesSection() {
  return (
    <section className="bg-primary-500 py-12 text-right">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-bold text-white mb-8">Nossos Serviços</h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop
          effect="fade"
          autoplay={{ delay: 1500 }}
          modules={[Autoplay, EffectFade]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          <SwiperSlide>
            <div className="w-full bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col min-h-[200px]">
              <h3 className="text-2xl font-bold mb-4">
                Treinos Personalizados
              </h3>
              <p className="text-lg font-medium mb-4">
                Treinos adaptados ao seu nível e objetivo, com acompanhamento
                especializado.
              </p>
              {/* Adicione outros elementos aqui, se necessário */}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col min-h-[200px]">
              <h3 className="text-2xl font-bold mb-4">Aulas em Grupo</h3>
              <p className="text-lg font-medium mb-4">
                Participe de aulas dinâmicas e motivadoras com nossos
                instrutores qualificados.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col min-h-[200px]">
              <h3 className="text-2xl font-bold mb-4">Eventos e Competições</h3>
              <p className="text-lg font-medium mb-4">
                Envolva-se em competições e eventos para aprimorar suas
                habilidades e conhecer outros atletas.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
