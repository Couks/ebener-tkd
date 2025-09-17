"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Clock,
  Users,
  User,
  Dumbbell,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Star,
  ArrowRight,
  Baby,
} from "lucide-react";
import IntroSection from "@/components/sobre/intro-section";
import precosImage from "@/assets/images/e_quebracoco.jpeg";
import Link from "next/link";
import Head from "@/components/head";
import Script from "next/script";

// Define plan interface
interface Plan {
  id: string;
  title: string;
  price: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  recommended?: boolean;
  ctaText: string;
  ctaLink: string;
  schedule?: {
    days: string;
    time: string;
  };
}

// Define FAQ interface
interface FAQ {
  question: string;
  answer: string;
}

// Adicionar uma nova interface para os horários das aulas logo após a interface FAQ
interface ClassSchedule {
  days: string;
  time: string;
  group: string;
  icon: React.ReactNode; // Changed from emoji to icon
}

export default function Planos() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Plans data
  const plans: Plan[] = [
    {
      id: "regular",
      title: "Aulas Regulares",
      price: "R$ 150,00",
      period: "Plano mensal",
      description:
        "Aulas em grupo com foco no desenvolvimento técnico e físico",
      icon: <Users />,
      features: [
        "2 aulas por semana",
        "Treino em grupo",
        "Desenvolvimento técnico",
        "Preparação para graduações",
      ],
      recommended: true,
      ctaText: "Agende uma Aula",
      ctaLink: "https://wa.link/b348me",
      // schedule: {
      //   days: "Segundas e Quartas",
      //   time: "19:00 - 20:30",
      // },
    },
    {
      id: "special",
      title: "Grupos Especiais",
      price: "R$ 200,00",
      period: "Aula avulsa (até 4 pessoas)",
      description:
        "Treine com seus amigos em um ambiente personalizado e exclusivo",
      icon: <Users />,
      features: [
        "Grupos de até 4 pessoas",
        "Horários flexíveis",
        "Treinamento personalizado",
        "Foco em objetivos específicos",
      ],
      recommended: false,
      ctaText: "Saiba Mais",
      ctaLink: "https://wa.link/v865w4",
    },
    {
      id: "private",
      title: "Aula Particular",
      price: "Consultar valores",
      period: "Treinamento individualizado",
      description:
        "Aulas planejadas de acordo com seus objetivos e necessidades",
      icon: <User />,
      features: [
        "Atenção exclusiva",
        "Progresso acelerado",
        "Horários flexíveis",
        "Plano de treino personalizado",
      ],
      ctaText: "Entre em Contato",
      ctaLink: "https://wa.link/pau705",
    },
    {
      id: "physical",
      title: "Preparação Física",
      price: "Consultar valores",
      period: "Treino individual",
      description:
        "Treinamento específico para melhorar seu condicionamento físico",
      icon: <Dumbbell />,
      features: [
        "Foco em condicionamento",
        "Avaliação física",
        "Plano de treino específico",
        "Acompanhamento de evolução",
      ],
      ctaText: "Entre em Contato",
      ctaLink: "https://wa.link/l273ys",
    },
  ];

  // FAQs data
  const faqs: FAQ[] = [
    {
      question: "Preciso ter experiência prévia para começar?",
      answer:
        "Não, aceitamos alunos de todos os níveis, desde iniciantes até avançados. Nossas aulas são adaptadas para cada nível de experiência.",
    },
    {
      question: "Qual a idade mínima para iniciar o Taekwondo?",
      answer:
        "Aceitamos alunos a partir de 5 anos de idade. Temos turmas específicas para crianças, adolescentes e adultos.",
    },
    {
      question: "Posso fazer uma aula experimental antes de me matricular?",
      answer:
        "Sim, oferecemos uma aula experimental gratuita para que você possa conhecer nossa metodologia e instalações antes de se comprometer.",
    },
    {
      question: "Quais equipamentos preciso ter para começar?",
      answer:
        "Para iniciar, você precisará apenas de roupas confortáveis. Após a matrícula, orientamos sobre a aquisição do dobok (uniforme) e outros equipamentos necessários.",
    },
    {
      question: "Como funcionam as graduações?",
      answer:
        "As graduações ocorrem periodicamente, geralmente a cada 6 meses, dependendo da frequência e evolução do aluno. Cada faixa representa um nível de conhecimento e habilidade.",
    },
    {
      question:
        "O Taekwondo é uma boa opção para quem procura uma academia de luta para defesa pessoal?",
      answer:
        "Sim! O Taekwondo é uma arte marcial extremamente eficaz para autodefesa. Nossas aulas focam em técnicas de chutes, socos e bloqueios que aumentam sua capacidade de reação, agilidade e confiança em situações reais.",
    },

  ];

  // Adicionar um novo array de dados para os horários das aulas logo após a definição da constante faqs
  // Adicionar após o bloco de código:
  // const faqs: FAQ[] = [ ... ];

  // Adicionar os dados de horários
  const classSchedules: ClassSchedule[] = [
    {
      days: "Segundas",
      time: "16:30 às 17:30",
      group: "T21",
      icon: <Clock />,
    },
    {
      days: "Segundas e Quartas",
      time: "18:00 às 19:00",
      group: "Infantil",
      icon: <Baby />,
    },
    {
      days: "Segundas e Quartas",
      time: "19:00 às 20:20",
      group: "Sub 21 e Adulto",
      icon: <Users />,
    },
    {
      days: "Terças e Quintas",
      time: "18:00 às 19:00",
      group: "Iniciantes",
      icon: <Clock />,
    },
    {
      days: "Terças e Quintas",
      time: "19:00 às 20:20",
      group: "Sub 21 e Adulto",
      icon: <Users />,
    },
  ];

  // Group schedules by days
  const groupedSchedules = classSchedules.reduce(
    (acc, schedule) => {
      const { days, ...rest } = schedule;
      if (!acc[days]) {
        acc[days] = [];
      }
      acc[days].push(rest);
      return acc;
    },
    {} as Record<string, Omit<ClassSchedule, "days">[]>,
  );

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Toggle FAQ
  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

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
    <div className="bg-black min-h-screen">
      <Head
        title="Planos e Preços"
        ogTitle="Planos e Preços"
        description="Descubra as opções de aulas e preços para se inscrever nos treinos de Taekwondo mais completos e dinâmicos"
        ogDescription="Descubra as opções de aulas e preços para se inscrever nos treinos de Taekwondo mais completos e dinâmicos"
        keywords={[
          "Planos",
          "Preços",
          "Taekwondo",
          "Treinos",
          "Aulas",
          "Dinâmicos",
          "Completos",
        ]}
      />
      <IntroSection
        title="Planos e Preços"
        subtitle="Descubra as opções de aulas e preços para se inscrever nos treinos de Taekwondo mais completos e dinâmicos"
        backgroundImage={precosImage.src}
        buttonText="Ver Planos"
        buttonLink="#planos"
      />

      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Class Schedule Section */}
      <section className="relative overflow-hidden bg-secondary-900 py-20 md:py-28">
        {/* Decorative elements */}
        <div
          className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary-500/10 blur-3xl md:h-72 md:w-72"
          aria-hidden="true"
        ></div>
        <div
          className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary-500/10 blur-3xl md:h-72 md:w-72"
          aria-hidden="true"
        ></div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary-500/10 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary-500"></span>
              <span className="text-sm font-medium text-primary-400">
                Horários das Aulas
              </span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Cronograma dos{" "}
              <span className="text-primary-500">Treinos</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Confira os horários disponíveis para cada faixa etária e nível de
              habilidade.
            </p>
          </motion.div>

          <div className="mx-auto max-w-6xl">
            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {Object.entries(groupedSchedules).map(([days, schedules]) => (
                <motion.div
                  key={days}
                  className="flex flex-col rounded-2xl bg-secondary-800 p-6 shadow-lg"
                  variants={itemVariants}
                >
                  <h3 className="mb-6 text-center text-2xl font-bold text-primary-500">
                    {days}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {schedules.map((schedule, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 rounded-xl bg-secondary-700/50 p-4"
                      >
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-500/20 text-primary-500">
                          {schedule.icon}
                        </div>
                        <div>
                          <p className="font-bold text-white">
                            {schedule.group}
                          </p>
                          <p className="font-medium text-gray-300">
                            {schedule.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-gray-400">
              Para mais informações, entre em contato pelo{" "}
              <a
                href="https://wa.link/b348me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:underline"
              >
                WhatsApp
              </a>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-8">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center gap-2 bg-primary-500/20 px-4 py-2 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-primary-500"></span>
              <span className="text-sm font-medium text-primary-500">
                Escolha seu plano
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
              Planos para todos os{" "}
              <span className="text-primary-500">objetivos</span>
            </h2>

            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Oferecemos diferentes opções de treinamento para atender às suas
              necessidades específicas, desde aulas em grupo até treinamento
              personalizado.
            </p>
          </motion.div>

          {/* Plans grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                className={`relative bg-secondary-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transition-all duration-100 flex flex-col h-full ${
                  plan.recommended
                    ? "ring-2 ring-primary-500 transform lg:-translate-y-4"
                    : ""
                } ${selectedPlan === plan.id ? "ring-2 ring-primary-500" : ""}`}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Recommended badge */}
                {plan.recommended && (
                  <div className="absolute top-0 right-0 bg-primary-500 text-black font-bold py-1 px-4 rounded-bl-lg">
                    <div className="flex items-center gap-1">
                      <Star size={14} />
                      <span className="text-xs">Recomendado</span>
                    </div>
                  </div>
                )}

                <div className="p-6 md:p-8 flex-grow">
                  {/* Icon and title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-500">
                      {plan.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {plan.title}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <p className="text-4xl font-bold text-white mb-1">
                      {plan.price}
                    </p>
                    <p className="text-gray-400">{plan.period}</p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6">{plan.description}</p>

                  {/* Schedule if available */}
                  {plan.schedule && (
                    <div className="bg-secondary-700/50 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-3">
                        <Clock
                          className="text-primary-500 flex-shrink-0"
                          size={20}
                        />
                        <div>
                          <p className="text-gray-400 text-sm">
                            {plan.schedule.days}
                          </p>
                          <p className="text-white font-medium">
                            {plan.schedule.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2
                          className="text-primary-500 flex-shrink-0 mt-1"
                          size={16}
                        />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="p-6 md:p-8 pt-0">
                  <Link
                    href={plan.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-primary-500 hover:bg-primary-600 text-black font-bold py-3 transition-all duration-100 flex items-center justify-center gap-2 group rounded-xl">
                      {plan.ctaText}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional info */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-gray-400 mt-2">
              Dúvidas? Entre em contato pelo{" "}
              <a
                href="https://wa.link/b348me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:underline"
              >
                WhatsApp
              </a>{" "}
              ou ligue para (21) 98165-4811.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden bg-secondary-900 py-20 md:py-28">
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
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              Perguntas Frequentes
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Encontre respostas para as dúvidas mais comuns sobre nossos planos
              e aulas
            </p>
          </motion.div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-secondary-800 bg-secondary-800/50 text-left"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <button
                    className="flex w-full items-center justify-between p-5 font-medium text-white transition-colors hover:bg-secondary-800/80"
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle
                        size={20}
                        className="flex-shrink-0 text-primary-500"
                      />
                      <span>{faq.question}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: activeFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: activeFaq === index ? "auto" : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-5 text-gray-300">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
