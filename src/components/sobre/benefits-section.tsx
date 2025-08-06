import type React from "react";

import {
  Brain,
  HeartPulse,
  Dumbbell,
  Smile,
  ShieldCheck,
  Star,
  Sword,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import MobileDetector from "./mobile-detector";

// Define the benefits data structure
interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function BenefitsSection() {
  // Benefits data
  const benefits: Benefit[] = [
    {
      id: 1,
      title: "Mentalidade e Vida",
      description:
        "Aprenda técnicas de mentalidade e motivação para alcançar resultados em suas vidas.",
      icon: <Brain className="size-full" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      title: "Resistência",
      description:
        "Aprenda técnicas de resistência e agilidade para fortalecer seu corpo e permanecer em movimento.",
      icon: <HeartPulse className="size-full" />,
      color: "from-red-500 to-red-600",
    },
    {
      id: 3,
      title: "Autodefesa",
      description:
        "O Taekwondo ensina técnicas eficazes de autodefesa, proporcionando confiança.",
      icon: <ShieldCheck className="size-full" />,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: 4,
      title: "Condicionamento Físico",
      description:
        "Melhore sua saúde com treinos que fortalecem o corpo, aumentam a flexibilidade e resistência.",
      icon: <Dumbbell className="size-full" />,
      color: "from-amber-500 to-amber-600",
    },
    {
      id: 5,
      title: "Confiança",
      description:
        "Desenvolva uma confiança inabalável ao atingir metas pessoais e superar desafios.",
      icon: <Smile className="size-full" />,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 6,
      title: "Autoestima",
      description:
        "O Taekwondo aumenta a autoestima ao incentivar o respeito próprio e a superação de limites.",
      icon: <Star className="size-full" />,
      color: "from-pink-500 to-pink-600",
    },
    {
      id: 7,
      title: "Crescimento Intelectual",
      description:
        "Desenvolva a concentração, foco e disciplina mental que podem ser aplicadas em todas as áreas da vida.",
      icon: <Lightbulb className="size-full" />,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      id: 8,
      title: "Disciplina",
      description:
        "Desenvolva uma boa e eficaz disciplina para superar desafios, essencial para o sucesso dentro e fora do tatame.",
      icon: <Sword className="size-full" />,
      color: "from-cyan-500 to-cyan-600",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <section className="mx-auto max-w-[95%] sm:max-w-[90%] md:container rounded-3xl overflow-hidden py-12 sm:py-16 md:py-20 mt-8 sm:mt-12 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 -z-10"></div>
      <div className="absolute inset-0 opacity-5 -z-10"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4">
        {/* Header section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center gap-2 bg-primary-500/10 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 rounded-full bg-primary-500"></div>
            <span className="text-sm font-medium text-primary-500">
              Transforme sua vida
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
            Benefícios do Taekwondo
          </h2>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Descubra como o Taekwondo pode transformar sua vida física e
            mentalmente
          </p>

          <div className="w-20 h-1 bg-primary-500/50 mx-auto mt-8 rounded-full"></div>
        </motion.div>

        {/* Renderização condicional Mobile/Desktop */}
        <MobileDetector benefits={benefits}>
          {/* Desktop view - Grid layout */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.id}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                variants={itemVariants}
              >
                <div
                  className={`h-2 bg-gradient-to-r ${benefit.color} group-hover:h-3 transition-all duration-300`}
                ></div>
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-5 flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br p-2 ${benefit.color} text-white flex items-center justify-center`}
                    >
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {benefit.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 flex-grow">
                    {benefit.description}
                  </p>

                  
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </motion.div>
        </MobileDetector>
      </div>
    </section>
  );
}
