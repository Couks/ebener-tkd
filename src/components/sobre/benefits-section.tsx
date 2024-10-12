import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import {
  Brain,
  Shield,
  HeartPulse,
  Dumbbell,
  Smile,
  ShieldCheck,
  Star,
  Sword,
} from "lucide-react"; // Ícones do lucide-react

export default function BenefitsSection() {
  return (
    <section className="bg-white py-12 text-right">
      <div className="container mx-auto text-left">
        <h2 className="text-4xl font-bold text-secondary-500 mb-8">
          Benefícios do Taekwondo
        </h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop
          autoplay={{ delay: 1500 }}
          effect="coverflow"
          modules={[Pagination, Autoplay, EffectCoverflow]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {/* Mentalidade e Vida */}
          <SwiperSlide>
            <div className="w-full bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col min-h-[200px] hover:shadow-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Brain className="mr-2 text-secondary-800 size-8" /> Mentalidade
                e Vida
              </h3>
              <p className="text-lg font-medium">
                Aprenda técnicas de mentalidade e motivação para alcançar
                resultados em suas vidas.
              </p>
            </div>
          </SwiperSlide>

          {/* Resistência */}
          <SwiperSlide>
            <div className="w-full bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col min-h-[200px] hover:shadow-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <HeartPulse className="mr-2 text-secondary-800 size-8" />{" "}
                Resistência
              </h3>
              <p className="text-lg font-medium">
                Aprenda técnicas de resistência e agilidade para fortalecer seu
                corpo e permanecer em movimento.
              </p>
            </div>
          </SwiperSlide>

          {/* Autodefesa */}
          <SwiperSlide>
            <div className="w-full bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col min-h-[200px] hover:shadow-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <ShieldCheck className="mr-2 text-secondary-800 size-8" />{" "}
                Autodefesa
              </h3>
              <p className="text-lg font-medium">
                O Taekwondo ensina técnicas eficazes de autodefesa,
                proporcionando confiança.
              </p>
            </div>
          </SwiperSlide>

          {/* Condicionamento Físico */}
          <SwiperSlide>
            <div className="w-full bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col min-h-[200px] hover:shadow-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Dumbbell className="mr-2 text-secondary-800 size-8" />{" "}
                Condicionamento Físico
              </h3>
              <p className="text-lg font-medium">
                Melhore sua saúde com treinos que fortalecem o corpo, aumentam a
                flexibilidade e resistência.
              </p>
            </div>
          </SwiperSlide>

          {/* Confiança */}
          <SwiperSlide>
            <div className="w-full bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col min-h-[200px] hover:shadow-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Smile className="mr-2 text-secondary-800 size-8" /> Confiança
              </h3>
              <p className="text-lg font-medium">
                Desenvolva uma confiança inabalável ao atingir metas pessoais e
                superar desafios.
              </p>
            </div>
          </SwiperSlide>

          {/* Autoestima */}
          <SwiperSlide>
            <div className="w-full bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col min-h-[200px] hover:shadow-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Star className="mr-2 text-secondary-800 size-8" /> Autoestima
              </h3>
              <p className="text-lg font-medium">
                O Taekwondo aumenta a autoestima ao incentivar o respeito
                próprio e a superação de limites.
              </p>
            </div>
          </SwiperSlide>

          {/* Crescimento Intelectual */}
          <SwiperSlide>
            <div className="w-full bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col min-h-[200px] hover:shadow-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Brain className="mr-2 text-secondary-800 size-8" /> Crescimento
                Intelectual
              </h3>
              <p className="text-lg font-medium">
                Desenvolva a concentração, foco e disciplina mental que podem
                ser aplicados em todas as áreas da vida.
              </p>
            </div>
          </SwiperSlide>

          {/* Disciplina */}
          <SwiperSlide>
            <div className="w-full bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col min-h-[200px] hover:shadow-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Sword className="mr-2 text-secondary-800 size-8" /> Disciplina
              </h3>
              <p className="text-lg font-medium">
                Desenvolva uma boa e eficaz disciplina para superar desafios,
                essencial para o sucesso dentro e fora do tatame.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
