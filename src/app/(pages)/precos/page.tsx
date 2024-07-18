import { Button } from "@/components/ui/button";

export default function Precos() {
  return (
    <main className="w-full">
      <section className="relative w-full h-96 bg-gradient-to-r from-secondary-500 to-primary-500 flex items-center justify-center text-white text-center p-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Planos e Preços
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-4">
            Treinos de Taekwondo adaptados para você
          </p>
          <Button>Matricule-se Agora</Button>
        </div>
      </section>
      <section className="container mx-auto px-8 py-12 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-500 mb-8">
          Nossos Planos
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/3">
            <h3 className="text-2xl font-bold text-secondary-500 mb-4">
              Mensalidade
            </h3>
            <p className="text-6xl font-bold text-gray-800 mb-4">R$120,00</p>
            <p className="text-xl font-medium text-gray-600 mb-4">
              2x por semana
            </p>
            <div className="text-left space-y-2">
              <p className="text-lg text-gray-700">
                Dias: Segunda e Quarta-feira
              </p>
              <p className="text-lg text-gray-700">Horários:</p>
              <ul className="list-disc list-inside text-lg text-gray-700">
                <li>19:00 - 20:30</li>
                <li>20:30 - 22:00</li>
              </ul>
            </div>
            <Button>Inscreva-se</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
