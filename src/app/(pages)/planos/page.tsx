import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import IntroSection from "@/components/sobre/intro-section";
import precosImage from "@/assets/images/20240728_121305.jpg";

export default function Precos() {
  return (
    <>
      <IntroSection
        title="Planos e Preços de Treinos de Taekwondo"
        subtitle="Descubra as opções de aulas e preços para se inscrever nos treinos de Taekwondo mais completos e dinâmicos"
        backgroundImage={precosImage.src}
        buttonText="Ver Planos"
        buttonLink="#planos"
      />

      <section id="planos" className="container mx-auto px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Plano Regular */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-primary-500/20 hover:border-primary-500 transition-all duration-300 flex flex-col">
            <h3 className="text-2xl font-bold text-primary-500 mb-4">
              Aulas Regulares
            </h3>
            <p className="text-5xl font-bold text-white mb-2">R$ 130,00</p>
            <p className="text-lg text-gray-300 mb-6">8 aulas por mês</p>

            <div className="space-y-4 mb-8">
              <p className="text-lg font-bold text-white">Horários</p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <Clock className="mr-2" /> Segundas e Quartas: 19:00 - 20:30
                </li>
                <li className="flex items-center">
                  <Clock className="mr-2" /> Segundas e Quartas: 20:30 - 22:00
                </li>
              </ul>
            </div>

            <a
              href="https://wa.link/b348me"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold text-md mt-auto">
                Agende uma Aula
              </Button>
            </a>
          </div>

          {/* Grupos Especiais */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-primary-500/20 hover:border-primary-500 transition-all duration-300 flex flex-col">
            <h3 className="text-2xl font-bold text-primary-500 mb-4">
              Grupos Especiais
            </h3>
            <p className="text-5xl font-bold text-white mb-2">R$ 150,00</p>
            <p className="text-lg text-gray-300 mb-6">
              Por treino (até 4 pessoas)
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-lg text-gray-300">
                Treine com seus amigos em um ambiente personalizado e exclusivo
              </p>
            </div>

            <a
              href="https://wa.link/v865w4"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto"
            >
              <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold text-md">
                Saiba Mais
              </Button>
            </a>
          </div>

          {/* Aula Particular */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-primary-500/20 hover:border-primary-500 transition-all duration-300 flex flex-col">
            <h3 className="text-2xl font-bold text-primary-500 mb-4">
              Aula Particular
            </h3>
            <p className="text-3xl font-bold text-white mb-2">Sob Consulta</p>
            <p className="text-lg text-gray-300 mb-6">
              Treinamento individualizado
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-lg text-gray-300">
                Aulas personalizadas de acordo com seus objetivos e necessidades
              </p>
            </div>

            <a
              href="https://wa.link/pau705"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto"
            >
              <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold text-md">
                Entre em Contato
              </Button>
            </a>
          </div>

          {/* Preparação Física */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-primary-500/20 hover:border-primary-500 transition-all duration-300 flex flex-col">
            <h3 className="text-2xl font-bold text-primary-500 mb-4">
              Preparação Física
            </h3>
            <p className="text-3xl font-bold text-white mb-2">Sob Consulta</p>
            <p className="text-lg text-gray-300 mb-6">Treino individual</p>

            <div className="space-y-4 mb-8">
              <p className="text-lg text-gray-300">
                Treinamento específico para melhorar seu condicionamento físico
              </p>
            </div>

            <a
              href="https://wa.link/l273ys"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto"
            >
              <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold text-md">
                Entre em Contato
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
