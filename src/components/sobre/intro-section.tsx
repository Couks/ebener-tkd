import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IntroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  height?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function IntroSection({
  title,
  subtitle,
  backgroundImage,
  height = "h-screen",
  buttonText = "Explore more",
  buttonLink = "",
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
      <div className="relative z-10 container mx-auto max-w-7xl px-8 pt-36">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-3xl text-gray-200 mb-8 max-w-xl">
            {subtitle}
          </p>
          <a href={buttonLink} rel="noopener noreferrer">
            <Button className="bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-6 flex items-center gap-2 group">
              {buttonText}
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
