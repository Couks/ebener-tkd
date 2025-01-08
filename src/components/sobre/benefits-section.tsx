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
} from "lucide-react";

export default function BenefitsSection() {
  return (
    <section className="bg-transparent py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-clip-text text-primary-500">
            Benefícios do Taekwondo
          </h2>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Descubra como o Taekwondo pode transformar sua vida física e
            mentalmente
          </p>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop
          autoplay={{ delay: 2500 }}
          effect="coverflow"
          modules={[Pagination, Autoplay, EffectCoverflow]}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12 pt-12"
        >
          {/* Mentalidade e Vida */}
          <SwiperSlide>
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-primary-500">
              <div className="flex gap-4">
                <div className="bg-primary-500/10 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <Brain className="text-primary-500 size-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Mentalidade e Vida
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Aprenda técnicas de mentalidade e motivação para alcançar
                    resultados em suas vidas.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Resistência */}
          <SwiperSlide>
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-primary-500">
              <div className="flex gap-4">
                <div className="bg-primary-500/10 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <HeartPulse className="text-primary-500 size-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Resistência
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Aprenda técnicas de resistência e agilidade para fortalecer
                    seu corpo e permanecer em movimento.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Autodefesa */}
          <SwiperSlide>
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-primary-500">
              <div className="flex gap-4">
                <div className="bg-primary-500/10 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-primary-500 size-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Autodefesa
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    O Taekwondo ensina técnicas eficazes de autodefesa,
                    proporcionando confiança.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Condicionamento Físico */}
          <SwiperSlide>
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-primary-500">
              <div className="flex gap-4">
                <div className="bg-primary-500/10 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <Dumbbell className="text-primary-500 size-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Condicionamento Físico
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Melhore sua saúde com treinos que fortalecem o corpo,
                    aumentam a flexibilidade e resistência.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Confiança */}
          <SwiperSlide>
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-primary-500">
              <div className="flex gap-4">
                <div className="bg-primary-500/10 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <Smile className="text-primary-500 size-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Confiança
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Desenvolva uma confiança inabalável ao atingir metas
                    pessoais e superar desafios.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Autoestima */}
          <SwiperSlide>
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-primary-500">
              <div className="flex gap-4">
                <div className="bg-primary-500/10 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <Star className="text-primary-500 size-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Autoestima
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    O Taekwondo aumenta a autoestima ao incentivar o respeito
                    próprio e a superação de limites.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Crescimento Intelectual */}
          <SwiperSlide>
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-primary-500">
              <div className="flex gap-4">
                <div className="bg-primary-500/10 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <Brain className="text-primary-500 size-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Crescimento Intelectual
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Desenvolva a concentração, foco e disciplina mental que
                    podem ser aplicados em todas as áreas da vida.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Disciplina */}
          <SwiperSlide>
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-primary-500">
              <div className="flex gap-4">
                <div className="bg-primary-500/10 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <Sword className="text-primary-500 size-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    Disciplina
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Desenvolva uma boa e eficaz disciplina para superar
                    desafios, essencial para o sucesso dentro e fora do tatame.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
