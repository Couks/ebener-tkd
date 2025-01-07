import Image from "next/image";

interface IntroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  height?: string;
}

export default function IntroSection({
  title,
  subtitle,
  backgroundImage,
  height = "h-[30vh] md:h-[70vh]",
}: IntroSectionProps) {
  return (
    <section
      className={`relative flex items-center justify-center text-white ${height} bg-black overflow-hidden`}
    >
      {/* Imagem de fundo com efeito de zoom suave */}
      <Image
        src={backgroundImage}
        alt={title}
        className="absolute inset-0 object-cover w-full h-full scale-105 transform transition-transform duration-[3000ms] hover:scale-110"
        width={1920}
        height={1080}
        priority
      />

      {/* Gradiente mais elaborado */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

      {/* Conteúdo de texto com animação */}
      <div className="relative z-10 text-center p-4 md:p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight animate-fade-in">
          {title}
        </h1>
        <div className="w-24 h-1 bg-secondary-500 mx-auto mb-6"></div>
        <p className="text-xl md:text-3xl font-medium text-gray-200 leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* Decoração visual */}
        <div className="absolute -left-4 -top-4 w-8 h-8 border-l-2 border-t-2 border-secondary-500 opacity-60"></div>
        <div className="absolute -right-4 -bottom-4 w-8 h-8 border-r-2 border-b-2 border-secondary-500 opacity-60"></div>
      </div>
    </section>
  );
}
