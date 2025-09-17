"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  DiffIcon as Diversity,
  Award,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Heart,
} from "lucide-react";

// Define values data structure
interface Value {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function MissionAndValues() {
  const [activeValue, setActiveValue] = useState(0);
  const valuesRef = useRef<HTMLDivElement>(null);

  // Values data
  const values: Value[] = [
    {
      id: 1,
      title: "Diversidade e Inclusão",
      description:
        "Alunos de todos os níveis e capacidades são bem-vindos em nossa academia. Acreditamos que o Taekwondo é para todos, independentemente de idade, gênero ou habilidade física.",
      icon: <Diversity />,
      color: "from-blue-500 to-purple-500",
    },
    {
      id: 2,
      title: "Dedicação",
      description:
        "Buscamos a excelência através da superação pessoal diária. Incentivamos nossos alunos a darem o melhor de si em cada treino, cultivando a persistência e o comprometimento.",
      icon: <Award />,
      color: "from-amber-500 to-red-500",
    },
    {
      id: 3,
      title: "Formação Integral",
      description:
        "Desenvolvemos atletas e indivíduos resilientes para a vida. Nosso treinamento vai além das técnicas físicas, formando caráter e preparando para os desafios do dia a dia.",
      icon: <BookOpen />,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  // Navigation handlers
  const nextValue = () => {
    setActiveValue((prev) => (prev === values.length - 1 ? 0 : prev + 1));
  };

  const prevValue = () => {
    setActiveValue((prev) => (prev === 0 ? values.length - 1 : prev - 1));
  };

  return (
    <section className="relative overflow-hidden bg-secondary-900 py-16 md:py-24">
      {/* Decorative elements */}
      <div
        className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary-500/10 blur-3xl md:h-72 md:w-72"
        aria-hidden="true"
      ></div>
      <div
        className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary-500/10 blur-3xl md:h-72 md:w-72"
        aria-hidden="true"
      ></div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Mission Section */}
          <motion.div
            className="text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center gap-2 bg-primary-500/20 px-4 py-2 rounded-full mb-4">
              <Heart className="text-primary-500 h-4 w-4" />
              <span className="text-sm font-medium text-primary-500">
                Nossa Essência
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-white">
              Missão e <span className="text-primary-500">Valores</span>
            </h2>

            <div className="max-w-3xl mx-auto bg-secondary-700/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-l-4 border-primary-500">
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                Nossa <span className="text-primary-500 font-bold">missão</span>{" "}
                é formar atletas e indivíduos em todas as idades e níveis no
                Taekwondo, transmitindo técnicas avançadas e valores essenciais,
                como respeito, disciplina e resiliência.
              </p>
            </div>
          </motion.div>

          {/* Values Section - Desktop */}
          <div className="hidden md:block" ref={valuesRef}>
            <motion.div
              className="grid grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.id}
                  className="bg-secondary-700/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-100 "
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white mb-6`}
                  >
                    {value.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-primary-500">
                    {value.title}
                  </h3>

                  <p className="text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Values Section - Mobile */}
          <div className="md:hidden">
            <div className="relative">
              <motion.div
                key={values[activeValue].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-secondary-700/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${values[activeValue].color} flex items-center justify-center text-white mb-4`}
                >
                  {values[activeValue].icon}
                </div>

                <h3 className="text-xl font-bold mb-3 text-primary-500">
                  {values[activeValue].title}
                </h3>

                <p className="text-gray-300 text-sm">
                  {values[activeValue].description}
                </p>
              </motion.div>

              {/* Navigation controls */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={prevValue}
                  className="w-10 h-10 rounded-full bg-secondary-600 text-white flex items-center justify-center hover:bg-primary-500 hover:text-black transition-colors"
                  aria-label="Previous value"
                >
                  <ChevronLeft className="size-5" />
                </button>

                <div className="flex items-center gap-2">
                  {values.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveValue(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-100 ${
                        activeValue === index
                          ? "bg-primary-500 w-8"
                          : "bg-gray-600"
                      }`}
                      aria-label={`Go to value ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextValue}
                  className="w-10 h-10 rounded-full bg-secondary-600 text-white flex items-center justify-center hover:bg-primary-500 hover:text-black transition-colors"
                  aria-label="Next value"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
