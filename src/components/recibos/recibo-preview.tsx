"use client"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"

interface ReciboPreviewProps {
  formData: {
    nomeResponsavel: string
    nomeAluno: string
    valor: string
    mes: string
    ano: string
    dia: string
    mesAtual: string
    mesAtualNumero: string
    assinatura: string
  }
}

export default function ReciboPreview({ formData }: ReciboPreviewProps) {
  const isMobile = useMobile()
  const scale = isMobile ? 0.95 : 1

  return (
    <Card className="p-0 overflow-hidden shadow-lg">
      <div
        id="recibo-para-download"
        className="bg-white p-4 sm:p-8 relative"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          width: isMobile ? "105%" : "100%",
          marginLeft: isMobile ? "-2.5%" : "0",
        }}
      >
        {/* Fundo quadriculado */}
        <div className="absolute inset-0 bg-[url('https://matheus-castro.vercel.app/grid.svg')] opacity-10 z-0"></div>

        {/* Conteúdo do recibo */}
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#0a3b6c] mb-6 sm:mb-8">
            RECIBO DE PAGAMENTO
          </h1>

          <p className="mb-6 text-md">
            Eu, <span className="font-semibold">Ebener dos Santos Pinto</span>, inscrito no{" "}
            <span className="font-semibold">CPF</span> sob o <span className="font-semibold">n.º 073117777-04</span> e
            registrado no <span className="font-semibold">CREF</span> sob o{" "}
            <span className="font-semibold">n.º 008141</span>, declaro para os devidos fins que recebi de:
          </p>

          <div className="mb-4">
            <p className="font-semibold mb-1 text-md">Nome do responsável</p>
            <div className="border-b border-gray-400 py-1">{formData.nomeResponsavel || ""}</div>
          </div>

          <div className="mb-4">
            <p className="font-semibold mb-1 text-md">Aluno</p>
            <div className="border-b border-gray-400 py-1">{formData.nomeAluno || ""}</div>
          </div>

          <p className="mb-6 text-md">
            O valor de <span className="font-semibold">R$ {formData.valor || "_________"}</span>, referente as aulas de
            Taekwondo realizadas duas vezes por semana, no período correspondente ao mês de{" "}
            <span className="font-semibold">{formData.mes || "___________"}</span> de 20
            <span className="font-semibold">{formData.ano?.substring(2) || "__"}</span>.
          </p>

          <p className="mb-6 sm:mb-8 text-md">
            As aulas foram ministradas de forma regular, conforme combinado previamente.
          </p>

          <p className="text-center mb-6 sm:mb-8 text-md">
            Rio de Janeiro, <span>{formData.dia || "__"}</span>/<span>{formData.mesAtualNumero || "__"}</span>/20
            <span>{formData.ano?.substring(2) || "__"}</span>
          </p>

          <div className="flex flex-col items-center">
            {formData.assinatura ? (
              <div className="relative h-24 w-64 mb-2">
                <Image
                  src={formData.assinatura || "/placeholder.svg"}
                  alt="Assinatura"
                  fill
                  style={{ objectFit: "contain" }}
                  unoptimized // Necessário para imagens de data URL
                />
              </div>
            ) : (
              <div className="border-b border-gray-400 w-64 h-16 mb-2"></div>
            )}
            <p className="text-center font-semibold text-md">Assinatura</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
