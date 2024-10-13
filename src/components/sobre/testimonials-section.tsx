import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/bundle";
import chaves from "@/assets/alunos/matheus-chaves.jpg";
import duda from "@/assets/alunos/duda-souza.jpg";

import { Pagination, Autoplay } from "swiper/modules";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-bold text-secondary-500 mb-8">
          O que dizem nossos alunos
        </h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{ delay: 4000 }}
          loop
          pagination={{ clickable: true, type: "progressbar" }}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {/* Depoimento 1 */}
          <SwiperSlide>
            <div className="w-full bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col min-h-[300px]">
              <div className="flex items-center mb-4">
                <Avatar className="mr-4 size-20">
                  <AvatarImage src={duda.src} />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-xl">Duda Souza</p>
                  <span className="text-gray-600">Aluna e Atleta</span>
                </div>
              </div>
              <p className="text-lg font-medium">
                O taekwondo me ensinou resiliência, disciplina e foco, ajudando
                a superar desafios. Conquistei títulos importantes, como o de
                campeã brasileira e a liderança no ranking nacional.
              </p>
            </div>
          </SwiperSlide>

          {/* Depoimento 2 */}
          <SwiperSlide>
            <div className="w-full bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col min-h-[300px]">
              <div className="flex items-center mb-4">
                <Avatar className="mr-4 size-20">
                  <AvatarImage src={chaves.src} />
                  <AvatarFallback>CO</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-xl">Matheus Chaves</p>
                  <span className="text-gray-600">Aluno</span>
                </div>
              </div>
              <p className="text-lg font-medium">
                O Taewkondo foi uma grande mudança pra minha vida. Física e
                mentalmente, tenho hoje um corpo mais saudável e encontrei um
                espaço para desestressar e acalmar dos problemas do dia a dia.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
