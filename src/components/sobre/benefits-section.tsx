import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import {
  Brain,
  HeartPulse,
  Dumbbell,
  Smile,
  ShieldCheck,
  Star,
  Sword,
} from "lucide-react";
import { motion } from "framer-motion"; // Importação do motion para aplicar efeitos de animação

export default function BenefitsSection() {
  return (
    <section className="bg-transparent py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 // Aplicação do efeito de animação ao título
            className="text-4xl font-bold bg-clip-text text-primary-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            Benefícios do Taekwondo
          </motion.h2>
          <motion.p // Aplicação do efeito de animação ao parágrafo
            className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            Descubra como o Taekwondo pode transformar sua vida física e
            mentalmente
          </motion.p>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop
          pagination={{ clickable: true, type: "progressbar" }}
          autoplay={{ delay: 6000 }}
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
            <div className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-primary-500">
              <div className="flex gap-4">
                <div className="bg-primary-500/10 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <Brain className="text-primary-500 size-8" />
                </div>
                <div>
                  <motion.h3 // Aplicação do efeito de animação ao título
                    className="text-2xl font-bold mb-4 text-gray-800"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                  >
                    Mentalidade e Vida
                  </motion.h3>
                  <motion.p // Aplicação do efeito de animação ao parágrafo
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                  >
                    Aprenda técnicas de mentalidade e motivação para alcançar
                    resultados em suas vidas.
                  </motion.p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Resistência */}
          <SwiperSlide>
            <div className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-primary-500">
              <div className="flex gap-4">
                <div className="bg-primary-500/10 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <HeartPulse className="text-primary-500 size-8" />
                </div>
                <div>
                  <motion.h3 // Aplicação do efeito de animação ao título
                    className="text-2xl font-bold mb-4 text-gray-800"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                  >
                    Resistência
                  </motion.h3>
                  <motion.p // Aplicação do efeito de animação ao parágrafo
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                  >
                    Aprenda técnicas de resistência e agilidade para fortalecer
                    seu corpo e permanecer em movimento.
                  </motion.p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Autodefesa */}
          <SwiperSlide>
            <div className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-primary-500">
              <div className="flex gap-4">
                <div className="bg-primary-500/10 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-primary-500 size-8" />
                </div>
                <div>
                  <motion.h3 // Aplicação do efeito de animação ao título
                    className="text-2xl font-bold mb-4 text-gray-800"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                  >
                    Autodefesa
                  </motion.h3>
                  <motion.p // Aplicação do efeito de animação ao parágrafo
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                  >
                    O Taekwondo ensina técnicas eficazes de autodefesa,
                    proporcionando confiança.
                  </motion.p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Condicionamento Físico */}
          <SwiperSlide>
            <div className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-primary-500">
              <div className="flex gap-4">
                <div className="bg-primary-500/10 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <Dumbbell className="text-primary-500 size-8" />
                </div>
                <div>
                  <motion.h3 // Aplicação do efeito de animação ao título
                    className="text-2xl font-bold mb-4 text-gray-800"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                  >
                    Condicionamento Físico
                  </motion.h3>
                  <motion.p // Aplicação do efeito de animação ao parágrafo
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                  >
                    Melhore sua saúde com treinos que fortalecem o corpo,
                    aumentam a flexibilidade e resistência.
                  </motion.p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Confiança */}
          <SwiperSlide>
            <div className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-primary-500">
              <div className="flex gap-4">
                <div className="bg-primary-500/10 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <Smile className="text-primary-500 size-8" />
                </div>
                <div>
                  <motion.h3 // Aplicação do efeito de animação ao título
                    className="text-2xl font-bold mb-4 text-gray-800"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                  >
                    Confiança
                  </motion.h3>
                  <motion.p // Aplicação do efeito de animação ao parágrafo
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                  >
                    Desenvolva uma confiança inabalável ao atingir metas
                    pessoais e superar desafios.
                  </motion.p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Autoestima */}
          <SwiperSlide>
            <div className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-primary-500">
              <div className="flex gap-4">
                <div className="bg-primary-500/10 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <Star className="text-primary-500 size-8" />
                </div>
                <div>
                  <motion.h3 // Aplicação do efeito de animação ao título
                    className="text-2xl font-bold mb-4 text-gray-800"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                  >
                    Autoestima
                  </motion.h3>
                  <motion.p // Aplicação do efeito de animação ao parágrafo
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                  >
                    O Taekwondo aumenta a autoestima ao incentivar o respeito
                    próprio e a superação de limites.
                  </motion.p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Crescimento Intelectual */}
          <SwiperSlide>
            <div className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-primary-500">
              <div className="flex gap-4">
                <div className="bg-primary-500/10 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <Brain className="text-primary-500 size-8" />
                </div>
                <div>
                  <motion.h3 // Aplicação do efeito de animação ao título
                    className="text-2xl font-bold mb-4 text-gray-800"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                  >
                    Crescimento Intelectual
                  </motion.h3>
                  <motion.p // Aplicação do efeito de animação ao parágrafo
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                  >
                    Desenvolva a concentração, foco e disciplina mental que
                    podem ser aplicadas em todas as áreas da vida.
                  </motion.p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Disciplina */}
          <SwiperSlide>
            <div className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-primary-500">
              <div className="flex gap-4">
                <div className="bg-primary-500/10 rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                  <Sword className="text-primary-500 size-8" />
                </div>
                <div>
                  <motion.h3 // Aplicação do efeito de animação ao título
                    className="text-2xl font-bold mb-4 text-gray-800"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                  >
                    Disciplina
                  </motion.h3>
                  <motion.p // Aplicação do efeito de animação ao parágrafo
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                  >
                    Desenvolva uma boa e eficaz disciplina para superar
                    desafios, essencial para o sucesso dentro e fora do tatame.
                  </motion.p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
