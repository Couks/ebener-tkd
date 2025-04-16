"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-[url(https://images.unsplash.com/photo-1539721972319-f0e80a00d424?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMHNwYWNlfGVufDB8fDB8fHww)] flex flex-col items-center justify-center px-4 py-16">
      <div className="container max-w-2xl mx-auto backdrop-blur-md p-8 md:rounded-full aspect-square flex flex-col items-center justify-center">
        <motion.div
          className="text-center mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-primary-500 mb-2">
            404
          </h1>
          <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Página não encontrada
          </h2>
        </motion.div>

        <motion.div
          className="text-center max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
         
          <p className="text-xl text-gray-200 font-semibold mb-8">
            A página que você está procurando pode ter sido movida, excluída ou
            nunca existiu. <br /><br />Que tal voltar para o caminho do Taekwondo?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <motion.button
                className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 rounded-xl text-black text-lg font-bold px-8 py-4 flex items-center justify-center gap-2 group transition-colors"
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Home size={20} />
                Voltar para o início
              </motion.button>
            </Link>
            <Link href="javascript:history.back()">
              <motion.button
                className="w-full sm:w-auto bg-secondary-700 hover:bg-secondary-600 rounded-xl text-white text-lg font-bold px-8 py-4 flex items-center justify-center gap-2 group transition-colors border border-secondary-600"
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft
                  className="group-hover:-translate-x-1 transition-transform"
                  size={20}
                />
                Voltar
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-secondary-700/50 backdrop-blur-sm rounded-full">
            <span className="w-3 h-3 bg-primary-500 rounded-full"></span>
            <p className="text-sm text-gray-300">
              Mesmo os mestres de Taekwondo erram o caminho às vezes
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
