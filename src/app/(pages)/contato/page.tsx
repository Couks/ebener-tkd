"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import IntroSection from "@/components/sobre/intro-section";
import samboderian from "@/assets/images/t_grupo.jpeg";
import Link from "next/link";
import Head from "@/components/head";
import Script from "next/script";

export default function Contato() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Ebener TKD | Academia de Taekwondo",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Abélia 197",
      addressLocality: "Jardim Guanabara",
      addressRegion: "RJ",
      postalCode: "21940-010",
      addressCountry: "BR",
    },
    telephone: "+55-21-98165-4811",
    url: "https://ebenertkd.com.br/contato",
    geo: {
      "@type": "GeoCoordinates",
      latitude: -22.8088116,
      longitude: -43.1971305,
    },
    openingHours: "Mo,We 16:30-20:20, Tu,Th 18:00-20:20",
    image: "https://ebenertkd.com.br/favicon.ico",
    priceRange: "$$",
  };

  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const isFormInView = useInView(formRef, { once: true, amount: 0.3 });
  const isMapInView = useInView(mapRef, { once: true, amount: 0.3 });

  // Format phone number as user types
  const formatPhoneNumber = (input: HTMLInputElement) => {
    let phoneNumber = input.value.replace(/\D/g, "");

    if (phoneNumber.length > 10) {
      phoneNumber = phoneNumber.replace(
        /^(\d{2})(\d{5})(\d{4})$/,
        "($1) $2-$3"
      );
    } else if (phoneNumber.length > 6) {
      phoneNumber = phoneNumber.replace(
        /^(\d{2})(\d{4})(\d{0,4})$/,
        "($1) $2-$3"
      );
    } else if (phoneNumber.length > 2) {
      phoneNumber = phoneNumber.replace(/^(\d{2})(\d{0,4})$/, "($1) $2");
    } else {
      phoneNumber = phoneNumber.replace(/^(\d{0,2})$/, "($1");
    }

    input.value = phoneNumber;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Form validation
    if (!nome.trim()) {
      setFormError("Por favor, informe seu nome.");
      return;
    }

    if (!telefone.trim() || telefone.length < 14) {
      setFormError("Por favor, informe um número de telefone válido.");
      return;
    }

    if (!mensagem.trim()) {
      setFormError("Por favor, escreva uma mensagem.");
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    try {
      const textoConcatenado = `Olá, meu nome é ${nome}!\nEsse é meu telefone ${telefone}\n${mensagem}`;

      // Simulate a delay to show loading state
      setTimeout(() => {
        window.location.href = `https://api.whatsapp.com/send?phone=5521981654811&text=${encodeURIComponent(
          textoConcatenado
        )}`;
        setIsSubmitted(true);
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      setFormError(
        "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente."
      );
      setIsSubmitting(false);
    }
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
        title="Entre em contato"
        ogTitle="Entre em contato"
        description="Entre em contato conosco para saber mais sobre nossos treinos e serviços."
        ogDescription="Entre em contato conosco para saber mais sobre nossos treinos e serviços."
        keywords={["contato", "treinos", "serviços", "taekwondo", "aulas"]}
      />
      <IntroSection
        title="Entre em contato com a Ebener TKD"
        subtitle="Estamos aqui para ajudar você a iniciar ou aprimorar sua jornada no Taekwondo"
        backgroundImage={samboderian.src}
        buttonText="Enviar uma mensagem"
        buttonLink="#fale-conosco"
      />

      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <section
        id="fale-conosco"
        className="relative overflow-hidden bg-secondary-900 py-20 md:py-28"
      >
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
          {/* Section header */}
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
                Fale conosco
              </span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Estamos <span className="text-primary-500">aqui</span> para você
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Entre em contato para tirar dúvidas, agendar uma aula experimental
              ou conhecer mais sobre nossos serviços.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Contact Form */}
            <motion.div
              ref={formRef}
              className="lg:col-span-7"
              initial={{ opacity: 0, x: -50 }}
              animate={
                isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
              }
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-2xl bg-secondary-800 p-8 shadow-2xl">
                <h3 className="mb-2 text-2xl font-bold text-white">
                  Envie uma mensagem
                </h3>
                <p className="mb-6 text-gray-400">
                  Preencha o formulário e nossa equipe retornará o mais breve
                  possível.
                </p>

                {formError && (
                  <div className="mb-6 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <p>{formError}</p>
                  </div>
                )}

                {isSubmitted ? (
                  <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-8 text-center text-green-400">
                    <CheckCircle className="mx-auto mb-4 h-12 w-12" />
                    <h4 className="mb-2 text-xl font-bold">
                      Mensagem enviada!
                    </h4>
                    <p>
                      Você será redirecionado para o WhatsApp para finalizar o
                      envio.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="nome"
                        className="mb-2 block font-medium text-gray-300"
                      >
                        Nome <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="nome"
                        type="text"
                        name="nome"
                        placeholder="Seu nome completo"
                        className="w-full rounded-lg border border-secondary-700 bg-secondary-700/50 p-3 text-white transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        onChange={(e) => setNome(e.target.value)}
                        value={nome}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="telefone"
                        className="mb-2 block font-medium text-gray-300"
                      >
                        Telefone (WhatsApp){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="telefone"
                        type="tel"
                        name="telefone"
                        placeholder="(21) 99999-9999"
                        className="w-full rounded-lg border border-secondary-700 bg-secondary-700/50 p-3 text-white transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        onChange={(e) => {
                          setTelefone(e.target.value);
                          formatPhoneNumber(e.target);
                        }}
                        value={telefone}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="mensagem"
                        className="mb-2 block font-medium text-gray-300"
                      >
                        Mensagem <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="mensagem"
                        name="mensagem"
                        placeholder="Deixe sua dúvida ou solicitação aqui..."
                        className="w-full rounded-lg border border-secondary-700 bg-secondary-700/50 p-3 text-white transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        rows={5}
                        onChange={(e) => setMensagem(e.target.value)}
                        value={mensagem}
                        required
                      ></textarea>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-5 text-lg font-bold text-black transition-all duration-100 hover:bg-primary-600 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar Mensagem via WhatsApp
                          <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 50 }}
              animate={
                isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-6">
                {/* Contact Info Card */}
                <div className="rounded-2xl bg-secondary-800 p-8 shadow-2xl">
                  <h3 className="mb-6 text-2xl font-bold text-white">
                    Nossa Localização
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-500/20">
                        <MapPin className="text-primary-500" size={24} />
                      </div>
                      <div>
                        <p className="mb-1 font-semibold text-white">Endereço</p>
                        <p className="text-gray-300">
                          Rua Abélia 197, Jardim Guanabara, RJ
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-500/20">
                        <Phone className="text-primary-500" size={24} />
                      </div>
                      <div>
                        <p className="mb-1 font-semibold text-white">
                          Telefone
                        </p>
                        <a
                          href="https://wa.me/5521981654811"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 transition-colors hover:text-primary-500"
                        >
                          (21) 98165-4811
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14711.315438834945!2d-43.1971213!3d-22.8088045!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99790035acb387:0xf59879151c85617b!2sEbener%20TKD%20%7C%20Academia%20de%20Taekwondo!5e0!3m2!1spt-BR!2sbr!4v1721344609049!5m2!1spt-BR!2sbr"
                    className="h-[250px] w-full border-0"
                    loading="lazy"
                    title="Localização da Academia Ebener TKD"
                  ></iframe>
                </div>
                <Button
                  asChild
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-5 text-lg font-bold text-black transition-all duration-100 hover:bg-primary-600"
                >
                  <Link
                    href="https://www.google.com/maps/dir//Ebener+TKD+%7C+Academia+de+Taekwondo+-+R.+Ab%C3%A9lia,+197+-+Jardim+Guanabara,+Rio+de+Janeiro+-+RJ,+21940-010"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Traçar rota no Google Maps
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
