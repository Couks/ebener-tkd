import Image from "next/image";
import historia1 from "@/assets/images/image9.jpeg";
import historia2 from "@/assets/images/image8.jpeg";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="mx-2 md:container md:mx-auto bg-secondary-800 py-12 px-4 mt-8 m-2 rounded-3xl text-right flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/3 text-lg md:text-xl font-medium text-gray-200 leading-relaxed">
          <h2 className="text-3xl md:text-6xl font-bold text-primary-500 mb-4">
            Nossa História
          </h2>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            A Ebener TKD é uma academia de{" "}
            <b className="text-primary-500">taekwondo</b> fundada em 1993.
            Começou treinando com o professor Fernando no{" "}
            <b className="text-primary-500">Cassino dos Oficiais do Galeão</b>.
            Ebener trabalhou como <b className="text-primary-500">gestor</b>,{" "}
            <b className="text-primary-500">preparador físico</b>, técnico da{" "}
            <b className="text-primary-500">
              Seleção Brasileira Militar de Taekwondo
            </b>{" "}
            e participou de três{" "}
            <b className="text-primary-500">campeonatos mundiais</b>. Ebener
            desenvolveu uma abordagem única de ensino, focada em habilidades
            físicas e mentais.
          </motion.p>
        </div>
        <div className="flex justify-center w-full md:w-1/3">
          <Image
            src={historia1}
            alt="Imagem da carreira de Ebener"
            loading="lazy"
            className="h-auto object-cover rounded-3xl"
          />
        </div>
        <div className="flex flex-col w-full items-start gap-8 md:w-1/3 text-lg md:text-xl font-medium text-gray-200 leading-relaxed">
          <Image
            src={historia2}
            alt="Imagem da carreira de Ebener"
            loading="lazy"
            width={800}
            height={500}
            className="object-cover aspect-video rounded-3xl"
          />

          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            Ebener desenvolveu uma abordagem única de ensino, focada em
            habilidades físicas e mentais.
          </motion.p>
          <Link href="/sobre">
            <motion.button
              className="bg-primary-500 hover:bg-primary-600 rounded-full text-black text-lg font-bold px-8 py-3 flex items-center gap-2 group"
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Saiba Mais
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={24}
              />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
