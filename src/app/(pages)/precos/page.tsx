import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react"; // Importando o ícone de relógio

export default function Precos() {
  return (
    <main className="w-full">
      <section
        className="relative w-full md:h-96 bg-black flex items-center justify-center text-white text-center"
        style={{
          backgroundImage:
            "url('http://rededoesporte.gov.br/pt-br/megaeventos/olimpiadas/modalidades/taekwondo.jpeg/image')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Treinos de Taekwondo
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-4">
            Aulas dinâmicas e focadas no seu desenvolvimento
          </p>
          <Button className="bg-green-500 hover:bg-green-400 px-6 py-2">
            Matricule-se Agora
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-8 py-12 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
          <h3 className="text-2xl font-bold text-secondary-500 mb-4">
            Mensalidade
          </h3>
          <p className="text-6xl font-bold text-gray-800 mb-2">R$120,00</p>
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
    </main>
  );
}
