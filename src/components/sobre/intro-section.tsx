import Image from "next/image";
import quemSomos from "@/assets/images/image8.jpeg";

export default function IntroSection() {
  return (
    <section className="relative flex items-center justify-center text-white h-[30vh] md:h-[70vh] bg-black">
      {/* Imagem de fundo */}
      <Image
        src={quemSomos}
        alt="Academia"
        className="absolute inset-0 object-cover w-full h-full"
      />

      {/* Esmaecimento com gradiente */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Conteúdo de texto */}
      <div className="relative z-10 text-center p-4 md:p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Ebener Taekwondo
        </h1>
        <p className="text-xl md:text-2xl mb-6 text-gray-300">
          Transforme sua vida com Taekwondo <br />
          na maior academia da Ilha do Governador
        </p>
      </div>
    </section>
  );
}
