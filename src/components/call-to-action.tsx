import { Button } from "@/components/ui/button";

export default function CallToActionSection() {
  return (
    <section className="bg-secondary-500 text-white py-12 text-center">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold mb-4">
          Pronto para começar sua jornada no Taekwondo?
        </h2>
        <p className="text-lg mb-6">
          Entre em contato conosco hoje e agende uma aula experimental gratuita!
        </p>

        <a
          href="https://api.whatsapp.com/send/?phone=5521981654811&text&type=phone_number&app_absent=0"
          target="_blank"
        >
          <Button>Agende sua Aula</Button>
        </a>
      </div>
    </section>
  );
}
