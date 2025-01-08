import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion"; // Importação do motion para aplicar efeitos de animação

export default function MissionAndValues() {
  return (
    <section className="mx-2 md:container md:mx-auto bg-secondary-800 m-2 rounded-3xl">
      <div className="px-8 py-16 text-center space-y-12">
        <div className="max-w-3xl mx-auto">
          <motion.h2 // Aplicação do efeito de animação ao título
            className="text-4xl md:text-5xl font-bold text-primary-500 mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            Missão e Valores
          </motion.h2>
          <motion.p // Aplicação do efeito de animação ao parágrafo
            className="text-lg md:text-2xl font-medium text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            Nossa <span className="text-primary-500 font-bold">missão</span> é
            formar atletas e indivíduos em todas as idades e níveis no
            taekwondo, transmitindo técnicas avançadas e valores essenciais,
            como respeito, disciplina e resiliência.
          </motion.p>
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
              <motion.h3 // Aplicação do efeito de animação ao título do card
                className="text-2xl md:text-3xl font-bold mb-6 text-primary-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                Respeito às Diferenças
              </motion.h3>
              <motion.p // Aplicação do efeito de animação ao parágrafo do card
                className="text-lg md:text-xl font-medium"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                Alunos de todos os níveis e capacidades são bem-vindos.
              </motion.p>
            </div>
          </SwiperSlide>

          {/* Card Dedicação */}
          <SwiperSlide>
            <div className="w-full bg-secondary-500/30 backdrop-blur-sm text-white rounded-2xl shadow-xl p-8 flex flex-col min-h-[200px] border border-primary-500/20 hover:border-primary-500 transition-all duration-300">
              <motion.h3 // Aplicação do efeito de animação ao título do card
                className="text-2xl md:text-3xl font-bold mb-6 text-primary-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                Dedicação
              </motion.h3>
              <motion.p // Aplicação do efeito de animação ao parágrafo do card
                className="text-lg md:text-xl font-medium"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                Buscamos a excelência através da superação pessoal diária.
              </motion.p>
            </div>
          </SwiperSlide>

          {/* Card Formação Integral */}
          <SwiperSlide>
            <div className="w-full bg-secondary-500/30 backdrop-blur-sm text-white rounded-2xl shadow-xl p-8 flex flex-col min-h-[200px] border border-primary-500/20 hover:border-primary-500 transition-all duration-300">
              <motion.h3 // Aplicação do efeito de animação ao título do card
                className="text-2xl md:text-3xl font-bold mb-6 text-primary-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                Formação Integral
              </motion.h3>
              <motion.p // Aplicação do efeito de animação ao parágrafo do card
                className="text-lg md:text-xl font-medium"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                Desenvolvemos atletas e indivíduos resilientes para a vida.
              </motion.p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
