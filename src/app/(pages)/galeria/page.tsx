"use client";

import IntroSection from "@/components/sobre/intro-section";
import Image from "next/image";
import quemsSomos from "@/assets/images/20240728_121305.jpg";
import { motion } from "framer-motion";

const importAll = (r: object) => (r as any).keys().map(r);
const images = importAll(
  (require as any).context("@/assets/images", false, /\.(png|jpe?g|svg)$/)
);

const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function Galeria() {
  const shuffledImages = shuffleArray(images.slice());

  return (
    <>
      {/* Título */}
      <IntroSection
        title="Nossa Galeria de Treinos"
        subtitle="Veja os momentos especiais dos nossos alunos em ação, desde iniciantes até faixas pretas, compartilhando a energia e dedicação ao Taekwondo"
        backgroundImage={quemsSomos.src}
        buttonText="Ver fotos"
      />

      {/* Galeria */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 pt-4 px-2">
        {shuffledImages.map((image: any, index: number) => (
          <motion.div
            key={index}
            className="mb-4 break-inside-avoid group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            layoutId={`modal-${index}`}
          >
            <Image
              src={image.default}
              alt={`Image ${index + 1}`}
              className="w-full h-auto object-cover rounded-lg transition-transform duration-300 ease-in-out md:group-hover:scale-125"
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}
