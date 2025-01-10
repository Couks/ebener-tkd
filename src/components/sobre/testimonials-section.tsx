import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/bundle";
import chaves from "@/assets/alunos/matheus-chaves.jpg";
import duda from "@/assets/alunos/duda-souza.jpg";
import yas from "@/assets/alunos/yas-tonelli.jpg";

import { Pagination, Autoplay } from "swiper/modules";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  return (
    <section className="container mx-auto rounded-3xl py-16 overflow-hidden">
      <div className="text-center mb-12">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-primary-500"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          O que dizem nossos alunos
        </motion.h2>
        <motion.p
          className="text-gray-200 text-lg mt-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          Histórias reais de transformação através do Taekwondo
        </motion.p>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={40}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true, type: "bullets" }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="py-8"
      >
        {/* Depoimento 2 */}
        <SwiperSlide>
          <div className="w-full bg-secondary-500/30 backdrop-blur-sm text-white rounded-3xl shadow-xl p-8 flex flex-col min-h-[400px] border-4 border-primary-500/20 hover:border-primary-500 transition-all duration-300">
            <motion.div
              animate={{ scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="flex items-center mb-6"
            >
              <Avatar className="mr-4 size-24 ring-4 ring-primary-500 ring-offset-4 ring-offset-secondary-800">
                <AvatarImage src={chaves.src} alt="Aluno Matheus Chaves" />
                <AvatarFallback>CO</AvatarFallback>
              </Avatar>
              <div>
                <motion.p
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9 }}
                  className="font-bold text-2xl text-primary-500"
                >
                  Matheus Chaves
                </motion.p>
                <span className="text-gray-300">Aluno</span>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="text-lg font-medium leading-relaxed"
            >
              A prática do Taekwondo foi uma grande mudança pra minha vida.
              Fisica e mentalmente, tenho hoje um corpo mais saudável e
              encontrei um espaço para desestressar e acalmar os problemas do
              dia a dia.
            </motion.p>
          </div>
        </SwiperSlide>

        {/* Depoimento 2 */}
        <SwiperSlide>
          <div className="w-full bg-secondary-500/30 backdrop-blur-sm text-white rounded-3xl shadow-xl p-8 flex flex-col min-h-[400px] border-4 border-primary-500/20 hover:border-primary-500 transition-all duration-300">
            <motion.div
              animate={{ scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="flex items-center mb-6"
            >
              <Avatar className="mr-4 size-24 ring-4 ring-primary-500 ring-offset-4 ring-offset-secondary-800">
                <AvatarImage src={duda.src} alt="Aluna Duda Souza" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div>
                <motion.p
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9 }}
                  className="font-bold text-2xl text-primary-500"
                >
                  Duda Souza
                </motion.p>
                <span className="text-gray-300">Aluna e Atleta</span>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="text-lg font-medium leading-relaxed"
            >
              Com o Taekwondo, aprendi a ter resiliência, disciplina e foco,
              ajudando a superar desafios. Isso me permitiu alcançar títulos
              importantes, como o de campeã brasileira e a liderança no ranking
              nacional.
            </motion.p>
          </div>
        </SwiperSlide>

        {/*Depoimento 3*/}
        <SwiperSlide>
          <div className="w-full bg-secondary-500/30 backdrop-blur-sm text-white rounded-3xl shadow-xl p-8 flex flex-col min-h-[400px] border-4 border-primary-500/20 hover:border-primary-500 transition-all duration-300">
            <motion.div
              animate={{ scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="flex items-center mb-6"
            >
              <Avatar className="mr-4 size-24 ring-4 ring-primary-500 ring-offset-4 ring-offset-secondary-800">
                <AvatarImage src={yas.src} alt="Aluna Yasmin Tonelli" />
                <AvatarFallback>CO</AvatarFallback>
              </Avatar>
              <div>
                <motion.p
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9 }}
                  className="font-bold text-2xl text-primary-500"
                >
                  Yasmin Tonelli
                </motion.p>
                <span className="text-gray-300">Aluna</span>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="text-lg font-medium leading-relaxed"
            >
              O Taekwondo me ensinou que posso me superar e trouxe outros
              estímulos para a minha prática física. Sinto que é uma atividade
              muito completa!
            </motion.p>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
