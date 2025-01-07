import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface IntroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  height?: string;
  buttonText?: string;
}

export default function IntroSection({
  title,
  subtitle,
  backgroundImage,
  height = "h-screen",
  buttonText = "Explore more",
}: IntroSectionProps) {
  return (
    <section
      className={`relative flex items-start justify-start text-white ${height}  overflow-hidden`}
    >
      {/* Imagem de fundo com overlay escuro */}
      <div className="absolute inset-0 overflow-hidden pb-2 px-2">
        <div className="w-full h-full">
          <Image
            src={backgroundImage}
            alt={title}
            className="object-cover w-full h-full brightness-50 rounded-b-3xl"
            width={1920}
            height={1080}
            priority
          />
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 container mx-auto max-w-7xl px-8 pt-32">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-3xl text-gray-200 mb-8 max-w-xl">
            {subtitle}
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-3 rounded-full font-medium flex items-center gap-2 group">
            {buttonText}
            <ArrowRight
              className="group-hover:translate-x-1 transition-transform"
              size={20}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
