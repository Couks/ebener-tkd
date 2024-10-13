import { Button } from "@/components/ui/button";

export default function Contato() {
  return (
    <>
      <section
        className="w-full md:h-96 flex items-center justify-center text-white text-center"
        style={{
          backgroundImage:
            "url('https://www.olimpiadatododia.com.br/wp-content/uploads/2023/08/TdM_BRA_milena.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 w-full h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Entre em contato
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-4">
            Estamos aqui pra ajudar o seu treino
          </p>
        </div>
      </section>

      <section className="container mx-auto px-8 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-500 mb-8 text-center">
          Fale Conosco
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full lg:w-1/2 ">
            <form className="flex flex-col gap-6">
              <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200"
              />
              <input
                type="email"
                placeholder="Digite seu email"
                className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200"
              />
              <textarea
                placeholder="Digite sua mensagem"
                className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200"
                rows={3}
              ></textarea>
              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-400 text-lg py-3"
              >
                Enviar
              </Button>
            </form>
          </div>

          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h3 className="text-2xl font-bold mb-4">Visite-nos</h3>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Rua Abélia 197, Jardim Guanabara, Rio de Janeiro - RJ
            </p>
            <p className="text-lg font-medium text-gray-700 mb-4">
              Telefone: (21) 98165-4811
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14711.315438834945!2d-43.1971213!3d-22.8088045!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99790035acb387%3A0xf59879151c85617b!2sEbener%20TKD%20%7C%20Academia%20de%20Taekwondo!5e0!3m2!1spt-BR!2sbr!4v1721344609049!5m2!1spt-BR!2sbr"
              className="w-full h-96 rounded-lg"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
