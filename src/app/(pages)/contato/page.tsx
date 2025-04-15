"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion, useInView } from "framer-motion"
import { ArrowRight, MapPin, Phone, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import IntroSection from "@/components/sobre/intro-section"
import samboderian from "@/assets/images/t_foto_descontraida.jpeg"
import Link from "next/link"
import Head from "@/components/head"

export default function Contato() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [mensagem, setMensagem] = useState("")

  const formRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const isFormInView = useInView(formRef, { once: true, amount: 0.3 })
  const isMapInView = useInView(mapRef, { once: true, amount: 0.3 })

  // Format phone number as user types
  const formatPhoneNumber = (input: HTMLInputElement) => {
    let phoneNumber = input.value.replace(/\D/g, "")

    if (phoneNumber.length > 10) {
      phoneNumber = phoneNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
    } else if (phoneNumber.length > 6) {
      phoneNumber = phoneNumber.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3")
    } else if (phoneNumber.length > 2) {
      phoneNumber = phoneNumber.replace(/^(\d{2})(\d{0,4})$/, "($1) $2")
    } else {
      phoneNumber = phoneNumber.replace(/^(\d{0,2})$/, "($1")
    }

    input.value = phoneNumber
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Form validation
    if (!nome.trim()) {
      setFormError("Por favor, informe seu nome.")
      return
    }

    if (!telefone.trim() || telefone.length < 14) {
      setFormError("Por favor, informe um número de telefone válido.")
      return
    }

    if (!mensagem.trim()) {
      setFormError("Por favor, escreva uma mensagem.")
      return
    }

    setFormError(null)
    setIsSubmitting(true)

    try {
      const textoConcatenado = `Olá, meu nome é ${nome}!\nEsse é meu telefone ${telefone}\n${mensagem}`

      // Simulate a delay to show loading state
      setTimeout(() => {
        window.location.href = `https://api.whatsapp.com/send?phone=5521981654811&text=${encodeURIComponent(
          textoConcatenado,
        )}`
        setIsSubmitted(true)
        setIsSubmitting(false)
      }, 1000)
    } catch (error) {
      setFormError("Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.")
      setIsSubmitting(false)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <div className="bg-secondary-950 min-h-screen">
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

      <section id="fale-conosco" className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-8">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center gap-2 bg-primary-500/20 px-4 py-2 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-primary-500"></span>
              <span className="text-sm font-medium text-primary-500">Fale conosco</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
              Estamos <span className="text-primary-500">aqui</span> para você
            </h2>

            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Entre em contato para tirar dúvidas, agendar uma aula experimental ou conhecer mais sobre nossos serviços
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Contact Form */}
            <motion.div
              ref={formRef}
              className="lg:col-span-7 bg-secondary-800 rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-8 md:p-10">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-background mb-4">Comece sua jornada no Taekwondo</h3>
                  <p className="text-gray-400">
                    Preencha o formulário abaixo e nossa equipe entrará em contato para tirar todas as suas dúvidas
                    sobre aulas, horários e valores. Sua mudança começa aqui!
                  </p>
                </div>

                {formError && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>{formError}</p>
                  </div>
                )}

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-8 rounded-lg text-center">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                    <h4 className="text-xl font-bold mb-2">Mensagem enviada!</h4>
                    <p>Você será redirecionado para o WhatsApp para finalizar o envio.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="nome" className="text-gray-400 font-medium">
                          Nome <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="nome"
                          type="text"
                          name="nome"
                          placeholder="Ex: João Silva"
                          className="w-full p-4 rounded-xl border border-gray-200 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition duration-200"
                          onChange={(e) => setNome(e.target.value)}
                          value={nome}
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="telefone" className="text-gray-400 font-medium">
                          Telefone (WhatsApp) <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="telefone"
                          type="tel"
                          name="telefone"
                          placeholder="Ex: (21) 98165-4811"
                          pattern="$$\d{2}$$\s\d{4,5}-\d{4}"
                          title="Digite o telefone no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX."
                          className="w-full p-4 rounded-xl border border-gray-200 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition duration-200"
                          onChange={(e) => {
                            setTelefone(e.target.value)
                            formatPhoneNumber(e.target)
                          }}
                          value={telefone}
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="mensagem" className="text-gray-400 font-medium">
                          Mensagem <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="mensagem"
                          name="mensagem"
                          placeholder="Ex: Olá! Gostaria de saber mais informações sobre as aulas de Taekwondo..."
                          className="w-full p-4 rounded-xl border border-gray-200 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition duration-200"
                          rows={4}
                          onChange={(e) => setMensagem(e.target.value)}
                          value={mensagem}
                          required
                        ></textarea>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full text-center bg-green-500 hover:bg-green-600 rounded-xl text-black text-lg font-bold px-6 py-4 flex items-center justify-center gap-2 group transition-all duration-300 ${
                        isSubmitting ? "opacity-80 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar Mensagem
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info & Map */}
            <div className="lg:col-span-5 space-y-8">
              {/* Contact Info Card */}
              <motion.div
                className="bg-secondary-800 rounded-2xl shadow-xl p-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-white">Informações de Contato</h3>

                <motion.div
                  className="space-y-5"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div className="flex items-start gap-4" variants={itemVariants}>
                    <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-primary-500" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Endereço</p>
                      <p className="text-gray-300">Rua Abélia 197, Jardim Guanabara</p>
                      <p className="text-gray-300">Rio de Janeiro - RJ</p>
                    </div>
                  </motion.div>

                  <motion.div className="flex items-start gap-4" variants={itemVariants}>
                    <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="text-primary-500" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Telefone</p>
                      <a
                        href="https://wa.me/5521981654811"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-primary-500 transition-colors"
                      >
                        (21) 98165-4811
                      </a>
                    </div>
                  </motion.div>

                  

                 
                </motion.div>
              </motion.div>

              {/* Map */}
              <motion.div
                ref={mapRef}
                className="relative rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, y: 50 }}
                animate={isMapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14711.315438834945!2d-43.1971213!3d-22.8088045!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99790035acb387:0xf59879151c85617b!2sEbener%20TKD%20%7C%20Academia%20de%20Taekwondo!5e0!3m2!1spt-BR!2sbr!4v1721344609049!5m2!1spt-BR!2sbr"
                  className="w-full h-[300px]"
                  loading="lazy"
                  title="Localização da Academia Ebener TKD"
                  aria-label="Mapa mostrando a localização da Academia Ebener TKD"
                ></iframe>

                <Link
                  href="https://www.google.com/maps/dir//Ebener+TKD+%7C+Academia+de+Taekwondo+-+R.+Ab%C3%A9lia,+197+-+Jardim+Guanabara,+Rio+de+Janeiro+-+RJ,+21940-010,+Brasil/@-22.8088045,-43.1996962,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x99790035acb387:0xf59879151c85617b!2m2!1d-43.1971305!2d-22.8088116!3e0?entry=ttu&g_ep=EgoyMDI1MDEwMi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4"
                >
                  <Button className="w-full bg-primary-500 hover:bg-primary-600 text-black font-bold py-4 flex items-center justify-center gap-2 group">
                    Traçar rota
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

