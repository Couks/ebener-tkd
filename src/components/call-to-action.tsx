import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CallToActionSection() {
  return (
    <section className="mx-2 md:container md:mx-auto bg-gradient-to-br from-secondary-800 to-secondary-900 text-white py-16 rounded-3xl mb-8">
      <div className="px-4">
        <div className="space-y-8">
          <motion.h2
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Pronto para começar sua jornada no Taekwondo?
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 leading-relaxed"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Entre em contato conosco hoje e agende uma aula experimental
            gratuita!
          </motion.p>

          <div className="pt-4">
            <a
              href="https://api.whatsapp.com/send/?phone=5521981654811&text&type=phone_number&app_absent=0"
              target="_blank"
              className="inline-block transform hover:scale-105 transition-transform duration-200"
            >
              <Button className="bg-primary-500 hover:bg-primary-600 text-black font-bold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-primary-500/50">
                Agende sua Aula Grátis
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
