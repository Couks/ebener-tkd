import { Button } from "@/components/ui/button";

export default function CallToActionSection() {
  return (
    <section className="bg-gradient-to-br from-secondary-800 to-secondary-900 text-white py-16 m-2 rounded-3xl">
      <div className="container mx-auto px-8 max-w-4xl">
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600 animate-pulse">
            Pronto para começar sua jornada no Taekwondo?
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Entre em contato conosco hoje e agende uma aula experimental
            gratuita!
          </p>

          <div className="pt-4">
            <a
              href="https://api.whatsapp.com/send/?phone=5521981654811&text&type=phone_number&app_absent=0"
              target="_blank"
              className="inline-block transform hover:scale-105 transition-transform duration-200"
            >
              <Button className="bg-primary-500 hover:bg-primary-600 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-primary-500/50">
                Agende sua Aula Grátis
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
