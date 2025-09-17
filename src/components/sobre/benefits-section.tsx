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
} from "lucide-react";
import { motion } from "framer-motion";

// Define the benefits data structure
interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function BenefitsSection() {
  const benefits: Benefit[] = [
    {
      id: 1,
      title: "Mentalidade e Foco",
      description:
        "Desenvolva concentração e disciplina mental aplicáveis em todas as áreas da vida.",
      icon: Brain,
      color: "text-blue-400",
    },
    {
      id: 2,
      title: "Condicionamento Físico",
      description:
        "Melhore sua saúde com treinos que fortalecem o corpo, aumentam a flexibilidade e a resistência.",
      icon: HeartPulse,
      color: "text-red-400",
    },
    {
      id: 3,
      title: "Autodefesa",
      description:
        "Aprenda técnicas eficazes de autodefesa, proporcionando mais segurança e confiança.",
      icon: ShieldCheck,
      color: "text-emerald-400",
    },
    {
      id: 4,
      title: "Força e Resistência",
      description:
        "Aumente sua força muscular e resistência física através de treinamentos completos e dinâmicos.",
      icon: Dumbbell,
      color: "text-amber-400",
    },
    {
      id: 5,
      title: "Autoconfiança",
      description:
        "Desenvolva uma confiança inabalável ao atingir metas pessoais e superar novos desafios.",
      icon: Smile,
      color: "text-purple-400",
    },
    {
      id: 6,
      title: "Autoestima",
      description:
        "Aumente a autoestima ao incentivar o respeito próprio e a superação de seus limites.",
      icon: Star,
      color: "text-pink-400",
    },
    {
      id: 7,
      title: "Crescimento Pessoal",
      description:
        "Evolua não apenas como atleta, mas como indivíduo, aplicando os valores do Taekwondo no dia a dia.",
      icon: Lightbulb,
      color: "text-indigo-400",
    },
    {
      id: 8,
      title: "Disciplina",
      description:
        "Cultive a disciplina necessária para superar desafios, essencial para o sucesso dentro e fora do tatame.",
      icon: Sword,
      color: "text-cyan-400",
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
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        {/* Header section */}
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div
            className="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary-500/10 px-4 py-2"
            variants={itemVariants}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary-500"></span>
            <span className="text-sm font-medium text-primary-400">
              Transforme sua vida
            </span>
          </motion.div>
          <motion.h2
            className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl"
            variants={itemVariants}
          >
            Benefícios do <span className="text-primary-500">Taekwondo</span>
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-gray-400"
            variants={itemVariants}
          >
            Descubra como o Taekwondo pode transformar sua vida, fortalecendo o
            corpo e a mente.
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              className="group relative overflow-hidden rounded-2xl bg-secondary-800 p-6 text-center shadow-lg"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${benefit.color} opacity-30 transition-all duration-300 group-hover:opacity-100`}
              />
              <div className="mb-4 flex justify-center">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full bg-secondary-700/50 ${benefit.color}`}
                >
                  <benefit.icon className="h-8 w-8" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                {benefit.title}
              </h3>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
