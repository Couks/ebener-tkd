import Image from "next/image";
import historia1 from "@/assets/images/image9.jpeg";
import historia2 from "@/assets/images/image8.jpeg";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AboutSection() {
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      if (currentDate.getMonth() === 0 && currentDate.getDate() === 1) {
        setAnoAtual(currentDate.getFullYear());
      }
    }, 86400000); // 86400000 é o número de milissegundos em um dia
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-2 md:container md:mx-auto bg-secondary-800 py-12 px-4 mt-8 m-2 rounded-3xl text-right flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/3 text-lg md:text-xl font-medium text-gray-200 leading-relaxed">
          <h2 className="text-3xl md:text-6xl font-bold text-primary-500 mb-4">
            Bem-vindo à Ebener TKD!
          </h2>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            Somos a maior e mais <b className="text-primary-500">tradicional</b>{" "}
            academia de <b className="text-primary-500">Taekwondo</b> na Ilha do
            Governador, liderada pelo mestre Ebener dos Santos Pinto, faixa
            preta 3º Dan e profissional com quase {anoAtual - 1993} anos de{" "}
            <b className="text-primary-500">experiência</b> no esporte.
            <br />
            <br />
            Desde 1993, o mestre Ebener dedica sua vida ao{" "}
            <b className="text-primary-500">Taekwondo</b>, unindo paixão,
            disciplina e <b className="text-primary-500">excelência</b> na
            formação de atletas. Com uma trajetória marcada por{" "}
            <b className="text-primary-500">conquistas</b> no Brasil e no
            exterior, trouxe para a academia uma metodologia única, que combina
            alto rendimento com valores de{" "}
            <b className="text-primary-500">superação pessoal</b>.
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
            className="text-left"
          >
            Aqui acolhemos alunos de todos os níveis, promovendo um ambiente de
            respeito, aprendizado e{" "}
            <b className="text-primary-500">crescimento</b> para todos. Venha
            fazer parte dessa <b className="text-primary-500">história</b>!
          </motion.p>
          <Link href="/sobre">
            <motion.button
              className="bg-primary-500 hover:bg-primary-600 rounded-full text-black text-lg font-bold px-8 py-3 flex items-center gap-2 group"
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Saiba Mais sobre a Ebener TKD
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
