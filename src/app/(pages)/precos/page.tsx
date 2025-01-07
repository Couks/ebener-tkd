import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import IntroSection from "@/components/sobre/intro-section";
import precosImage from "@/assets/images/20240728_121305.jpg";

export default function Precos() {
  return (
    <>
      <IntroSection
        title="Treinos de Taekwondo"
        subtitle="Aulas dinâmicas e focadas no seu desenvolvimento"
        backgroundImage={precosImage.src}
      />

      <section className="container mx-auto px-8 py-12 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
          <h3 className="text-2xl font-bold text-secondary-500 mb-4">
            Mensalidade
          </h3>
          <p className="text-6xl font-bold text-gray-800 mb-2">R$130,00</p>
          <p className="text-lg font-medium text-gray-600 mb-4">
            8 aulas por mês
          </p>

          <div className="text-left space-y-4">
            <p className="text-lg font-bold text-gray-700">Horários</p>
            <ul className="list-none text-lg text-gray-700">
              <li className="flex items-center">
                <Clock className="mr-2 text-gray-700" /> Segundas e Quartas:{" "}
                19:00 - 20:30
              </li>
              <li className="flex items-center">
                <Clock className="mr-2 text-gray-700" /> Segundas e Quartas:{" "}
                20:30 - 22:00
              </li>
            </ul>
          </div>

          <Button className="bg-green-500 hover:bg-green-400 w-full mt-6 py-3 text-lg font-bold">
            Inscreva-se
          </Button>
        </div>
      </section>
    </>
  );
}
