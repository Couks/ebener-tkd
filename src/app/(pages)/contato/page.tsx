import { Button } from "@/components/ui/button";
import IntroSection from "@/components/sobre/intro-section";
import contatoImage from "@/assets/images/20231207_200223.jpg";
import { MapPin, Phone } from "lucide-react";

export default function Contato() {
  return (
    <>
      <IntroSection
        title="Entre em contato com a Ebener TKD"
        subtitle="Estamos aqui para ajudar o seu treino"
        backgroundImage={contatoImage.src}
        buttonText="Entre em contato"
        buttonLink="#fale-conosco"
      />

      <section
        id="fale-conosco"
        className="container mx-auto px-4 md:px-8 py-16 "
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          Fale Conosco
        </h2>
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 w-full lg:w-1/2 transition-transform duration-300 hover:scale-[1.02]">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-secondary-500 mb-4">
                Comece sua jornada no Taekwondo conosco
              </h3>
              <p className="text-gray-600">
                Preencha o formulário abaixo e nossa equipe entrará em contato
                para tirar todas as suas dúvidas sobre aulas, horários e
                valores. Estamos ansiosos para te ajudar a começar sua prática!
              </p>
            </div>
            <form className="flex flex-col gap-6">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nome" className="text-gray-700 font-medium">
                    Nome
                  </label>
                  <input
                    id="nome"
                    type="text"
                    placeholder="Ex: João Silva"
                    className="w-full p-4 rounded-xl border border-gray-200 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition duration-200"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-gray-700 font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Ex: joao.silva@email.com"
                    className="w-full p-4 rounded-xl border border-gray-200 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition duration-200"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="mensagem"
                    className="text-gray-700 font-medium"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    placeholder="Ex: Olá! Gostaria de saber mais informações sobre as aulas de Taekwondo..."
                    className="w-full p-4 rounded-xl border border-gray-200 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition duration-200"
                    rows={4}
                  ></textarea>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600 text-black text-lg py-6 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1"
              >
                Enviar Mensagem
              </Button>
            </form>
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-3xl font-bold mb-6 text-secondary-500">
                Localização da Academia
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center hover:bg-gray-100 p-4 rounded-lg transition-all duration-300">
                  <MapPin className="mr-2" />
                  <span className="font-medium">Endereço:</span>
                  <span className="ml-2">
                    Rua Abélia 197, Jardim Guanabara, Rio de Janeiro - RJ
                  </span>
                </div>
                <div className="flex items-center hover:bg-gray-100 p-4 rounded-lg transition-all duration-300">
                  <Phone className="mr-2" />
                  <span className="font-medium">Telefone:</span>
                  <a
                    href="https://wa.me/5521981654811"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2"
                  >
                    (21) 98165-4811
                  </a>
                </div>
              </div>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14711.315438834945!2d-43.1971213!3d-22.8088045!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99790035acb387%3A0xf59879151c85617b!2sEbener%20TKD%20%7C%20Academia%20de%20Taekwondo!5e0!3m2!1spt-BR!2sbr!4v1721344609049!5m2!1spt-BR!2sbr"
              className="w-full h-[400px] rounded-2xl shadow-xl"
              loading="lazy"
            ></iframe>

            <a
              href="https://www.google.com/maps/dir//Ebener+TKD+%7C+Academia+de+Taekwondo+-+R.+Ab%C3%A9lia,+197+-+Jardim+Guanabara,+Rio+de+Janeiro+-+RJ,+21940-010,+Brasil/@-22.8088045,-43.1996962,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x99790035acb387:0xf59879151c85617b!2m2!1d-43.1971305!2d-22.8088116!3e0?entry=ttu&g_ep=EgoyMDI1MDEwMi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white text-lg py-6 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 mt-4">
                Ir para a Academia
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
