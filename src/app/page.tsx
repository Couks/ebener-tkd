/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import quemSomos from "@/assets/images/image8.jpeg";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="w-full">
      {/* Seção de Introdução */}
      <section className="relative w-full h-auto md:h-96 bg-gradient-to-r from-secondary-500 to-primary-500 flex items-center justify-center text-white text-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={quemSomos}
            alt="Academia"
            layout="fill"
            objectFit="cover"
            className="object-cover opacity-40"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">Bem-vindo à Ebener TKD</h1>
          <p className="text-2xl mb-6">
            Transforme sua vida com Taekwondo na maior academia da Ilha do
            Governador
          </p>
          <Button>Saiba Mais</Button>
        </div>
      </section>

      <section className="container mx-auto px-8 py-12 text-center">
        <h2 className="text-4xl font-bold text-secondary-500 mb-8">
          Nossos Serviços
        </h2>
        <div className="flex flex-wrap gap-8 justify-center">
          {/* Serviço 1 */}
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Treinos Personalizados</h3>
            <p className="text-lg font-medium mb-4">
              Treinos adaptados ao seu nível e objetivo, com acompanhamento
              especializado.
            </p>
            <Button>Saiba Mais</Button>
          </div>

          {/* Serviço 2 */}
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Aulas em Grupo</h3>
            <p className="text-lg font-medium mb-4">
              Participe de aulas dinâmicas e motivadoras com nossos instrutores
              qualificados.
            </p>
            <Button>Saiba Mais</Button>
          </div>

          {/* Serviço 3 */}
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Eventos e Competições</h3>
            <p className="text-lg font-medium mb-4">
              Envolva-se em competições e eventos para aprimorar suas
              habilidades e conhecer outros atletas.
            </p>
            <Button>Saiba Mais</Button>
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-secondary-500 mb-8">
            O que dizem nossos alunos
          </h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {/* Depoimento 1 */}
            <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-6">
              <p className="text-lg font-medium mb-4">
                "A Ebener TKD mudou minha vida. A equipe é incrível e o
                treinamento é de alta qualidade!"
              </p>
              <p className="font-bold">Ana Silva</p>
              <span className="text-gray-600">Aluno</span>
            </div>

            {/* Depoimento 2 */}
            <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-6">
              <p className="text-lg font-medium mb-4">
                "Excelente lugar para aprender Taekwondo. Ambiente acolhedor e
                instrutores experientes."
              </p>
              <p className="font-bold">Carlos Oliveira</p>
              <span className="text-gray-600">Aluno</span>
            </div>

            {/* Depoimento 3 */}
            <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-6">
              <p className="text-lg font-medium mb-4">
                "Recomendo a Ebener TKD para qualquer pessoa que queira se
                dedicar ao Taekwondo!"
              </p>
              <p className="font-bold">Mariana Santos</p>
              <span className="text-gray-600">Aluno</span>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Chamada para Ação */}
      <section className="bg-secondary-500 text-white py-12 text-center">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para começar sua jornada no Taekwondo?
          </h2>
          <p className="text-lg mb-6">
            Entre em contato conosco hoje e agende uma aula experimental
            gratuita!
          </p>
          <Button>Agende sua Aula</Button>
        </div>
      </section>
    </main>
  );
}
