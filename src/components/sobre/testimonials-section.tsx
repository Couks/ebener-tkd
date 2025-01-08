import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/bundle";
import chaves from "@/assets/alunos/matheus-chaves.jpg";
import duda from "@/assets/alunos/duda-souza.jpg";
import yas from "@/assets/alunos/yas-tonelli.jpg";

import { Pagination, Autoplay } from "swiper/modules";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function TestimonialsSection() {
  return (
    <section className="m-2 rounded-3xl py-16">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-500">
            O que dizem nossos alunos
          </h2>
          <p className="text-gray-200 text-lg mt-4">
            Histórias reais de transformação através do Taekwondo
          </p>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={40}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          pagination={{ clickable: true, type: "progressbar" }}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="py-8"
        >
          {/* Depoimento 1 */}
          <SwiperSlide>
            <div className="w-full bg-secondary-500/30 backdrop-blur-sm text-white rounded-2xl shadow-xl p-8 flex flex-col min-h-[350px] border border-primary-500/20 hover:border-primary-500 transition-all duration-300">
              <div className="flex items-center mb-6">
                <Avatar className="mr-4 size-24 ring-4 ring-primary-500 ring-offset-4 ring-offset-secondary-800">
                  <AvatarImage src={duda.src} />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-2xl text-primary-500">
                    Duda Souza
                  </p>
                  <span className="text-gray-300">Aluna e Atleta</span>
                </div>
              </div>
              <p className="text-lg font-medium leading-relaxed">
                O taekwondo me ensinou resiliência, disciplina e foco, ajudando
                a superar desafios. Conquistei títulos importantes, como o de
                campeã brasileira e a liderança no ranking nacional.
              </p>
            </div>
          </SwiperSlide>

          {/* Depoimento 2 */}
          <SwiperSlide>
            <div className="w-full bg-secondary-500/30 backdrop-blur-sm text-white rounded-2xl shadow-xl p-8 flex flex-col min-h-[350px] border border-primary-500/20 hover:border-primary-500 transition-all duration-300">
              <div className="flex items-center mb-6">
                <Avatar className="mr-4 size-24 ring-4 ring-primary-500 ring-offset-4 ring-offset-secondary-800">
                  <AvatarImage src={chaves.src} />
                  <AvatarFallback>CO</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-2xl text-primary-500">
                    Matheus Chaves
                  </p>
                  <span className="text-gray-300">Aluno</span>
                </div>
              </div>
              <p className="text-lg font-medium leading-relaxed">
                O Taewkondo foi uma grande mudança pra minha vida. Física e
                mentalmente, tenho hoje um corpo mais saudável e encontrei um
                espaço para desestressar e acalmar dos problemas do dia a dia.
              </p>
            </div>
          </SwiperSlide>

          {/*Depoimento 3*/}
          <SwiperSlide>
            <div className="w-full bg-secondary-500/30 backdrop-blur-sm text-white rounded-2xl shadow-xl p-8 flex flex-col min-h-[350px] border border-primary-500/20 hover:border-primary-500 transition-all duration-300">
              <div className="flex items-center mb-6">
                <Avatar className="mr-4 size-24 ring-4 ring-primary-500 ring-offset-4 ring-offset-secondary-800">
                  <AvatarImage src={yas.src} />
                  <AvatarFallback>CO</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-2xl text-primary-500">
                    Yasmin Tonelli
                  </p>
                  <span className="text-gray-300">Aluna</span>
                </div>
              </div>
              <p className="text-lg font-medium leading-relaxed">
                O taekwondo me ensinou que posso me superar e trouxe outros
                estímulos para a minha prática física. Sinto que é uma atividade
                muito completa!
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
