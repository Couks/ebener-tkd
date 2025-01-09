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
        buttonLink="#images"
      />

      {/* Galeria */}
      <div
        id="images"
        className="container mx-auto columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 pt-12 px-2"
      >
        {shuffledImages.map((image: any, index: number) => (
          <motion.div
            key={index}
            className="mb-4 md:mb-8 break-inside-avoid group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            layoutId={`modal-${index}`}
          >
            <Image
              src={image.default}
              alt={`Image ${index + 1}`}
              loading="lazy"
              className="object-cover rounded-lg transition-transform duration-100 ease-in-out md:group-hover:scale-105"
              width={500}
              height={500}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}
