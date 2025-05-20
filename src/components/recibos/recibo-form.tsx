"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SignatureCanvas from "@/components/recibos/signature-canvas"
import ReciboPreview from "@/components/recibos/recibo-preview"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { Download, Save, Trash2 } from 'lucide-react'

export default function ReciboForm() {
  const { toast } = useToast()
  const isMobile = useMobile()
  const signatureRef = useRef<any>(null)
  const [formData, setFormData] = useState({
    nomeResponsavel: "",
    nomeAluno: "",
    valor: "",
    mes: "",
    ano: new Date().getFullYear().toString(),
    dia: new Date().getDate().toString(),
    mesAtual: new Date().toLocaleString("pt-BR", { month: "long" }),
    mesAtualNumero: (new Date().getMonth() + 1).toString(),
    assinatura: "",
  })

  // Formatar valor monetário
  const formatarValor = (valor: string) => {
    // Remove tudo que não é número
    let apenasNumeros = valor.replace(/\D/g, "")
    
    // Converte para número e divide por 100 para obter o valor em reais
    const valorNumerico = parseFloat(apenasNumeros) / 100
    
    // Formata o valor como moeda brasileira
    return valorNumerico.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === "valor") {
      setFormData((prev) => ({ ...prev, [name]: formatarValor(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleClearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear()
      setFormData((prev) => ({ ...prev, assinatura: "" }))
    }
  }

  const handleSaveSignature = () => {
    if (signatureRef.current) {
      const signatureData = signatureRef.current.toDataURL("image/png")
      setFormData((prev) => ({ ...prev, assinatura: signatureData }))
      toast({
        title: "Assinatura salva",
        description: "Sua assinatura foi adicionada ao recibo.",
      })
    }
  }

  const handleDownload = () => {
    const reciboElement = document.getElementById("recibo-para-download")
    if (!reciboElement) return

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!formData.nomeResponsavel || !formData.nomeAluno || !formData.valor || !formData.mes) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    // Verificar se a assinatura foi adicionada
    if (!formData.assinatura) {
      toast({
        title: "Assinatura necessária",
        description: "Por favor, adicione sua assinatura antes de baixar o recibo.",
        variant: "destructive",
      })
      return
    }

    import("html-to-image").then((htmlToImage) => {
      htmlToImage
        .toJpeg(reciboElement, { quality: 0.95 })
        .then((dataUrl: string) => {
          const link = document.createElement("a")
          link.download = `recibo-${formData.nomeAluno.replace(/\s+/g, "-").toLowerCase()}-${formData.mes.toLowerCase()}-${formData.ano}.jpeg`
          link.href = dataUrl
          link.click()

          toast({
            title: "Recibo baixado com sucesso",
            description: "O recibo foi gerado e baixado para o seu dispositivo.",
          })
        })
        .catch((error: Error) => {
          console.error("Erro ao gerar a imagem do recibo:", error)
          toast({
            title: "Erro ao gerar recibo",
            description: "Ocorreu um erro ao tentar gerar o recibo. Tente novamente.",
            variant: "destructive",
          })
        })
    })
  }

  // Atualizar a data automaticamente
  useEffect(() => {
    const hoje = new Date()
    setFormData(prev => ({
      ...prev,
      dia: hoje.getDate().toString(),
      mesAtual: hoje.toLocaleString("pt-BR", { month: "long" }),
      mesAtualNumero: (hoje.getMonth() + 1).toString(),
      ano: hoje.getFullYear().toString()
    }))
  }, [])

  return (
    <div className="max-w-7xl mx-auto mt-32">
      {isMobile ? (
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="form">Formulário</TabsTrigger>
            <TabsTrigger value="preview">Pré-visualização</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form">
            <FormularioRecibo 
              formData={formData} 
              handleInputChange={handleInputChange}
              signatureRef={signatureRef}
              handleClearSignature={handleClearSignature}
              handleSaveSignature={handleSaveSignature}
              handleDownload={handleDownload}
            />
          </TabsContent>
          
          <TabsContent value="preview">
            <div className="space-y-4">
              <ReciboPreview formData={formData} />
              <Button onClick={handleDownload} className="w-full" size="lg">
                <Download className="mr-2 h-4 w-4" /> Baixar Recibo
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <FormularioRecibo 
            formData={formData} 
            handleInputChange={handleInputChange}
            signatureRef={signatureRef}
            handleClearSignature={handleClearSignature}
            handleSaveSignature={handleSaveSignature}
            handleDownload={handleDownload}
          />
          
          <div className="space-y-4">
            <ReciboPreview formData={formData} />
          </div>
        </div>
      )}
    </div>
  )
}

interface FormularioReciboProps {
  formData: any
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  signatureRef: React.RefObject<any>
  handleClearSignature: () => void
  handleSaveSignature: () => void
  handleDownload: () => void
}

function FormularioRecibo({ 
  formData, 
  handleInputChange, 
  signatureRef, 
  handleClearSignature, 
  handleSaveSignature,
  handleDownload
}: FormularioReciboProps) {
  return (
    <Card className="p-6 shadow-lg border-t-4 border-t-[#0a3b6c]">
      <h2 className="text-xl font-semibold mb-6 text-[#0a3b6c]">Formulário de Recibo</h2>
      
      <div className="space-y-5">
        <div>
          <Label htmlFor="nomeResponsavel" className="text-sm font-medium">
            Nome do Responsável
          </Label>
          <Input
            id="nomeResponsavel"
            name="nomeResponsavel"
            value={formData.nomeResponsavel}
            onChange={handleInputChange}
            placeholder="Nome completo do responsável"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="nomeAluno" className="text-sm font-medium">
            Nome do Aluno
          </Label>
          <Input
            id="nomeAluno"
            name="nomeAluno"
            value={formData.nomeAluno}
            onChange={handleInputChange}
            placeholder="Nome completo do aluno"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="valor" className="text-sm font-medium">
            Valor (R$)
          </Label>
          <Input
            id="valor"
            name="valor"
            value={formData.valor}
            onChange={handleInputChange}
            placeholder="0,00"
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="mes" className="text-sm font-medium">
              Mês de Referência
            </Label>
            <select
              id="mes"
              name="mes"
              value={formData.mes}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
            >
              <option value="">Selecione o mês</option>
              <option value="Janeiro">Janeiro</option>
              <option value="Fevereiro">Fevereiro</option>
              <option value="Março">Março</option>
              <option value="Abril">Abril</option>
              <option value="Maio">Maio</option>
              <option value="Junho">Junho</option>
              <option value="Julho">Julho</option>
              <option value="Agosto">Agosto</option>
              <option value="Setembro">Setembro</option>
              <option value="Outubro">Outubro</option>
              <option value="Novembro">Novembro</option>
              <option value="Dezembro">Dezembro</option>
            </select>
          </div>

          <div>
            <Label htmlFor="ano" className="text-sm font-medium">
              Ano
            </Label>
            <Input
              id="ano"
              name="ano"
              value={formData.ano}
              onChange={handleInputChange}
              placeholder="Ex: 2025"
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dia" className="text-sm font-medium">
              Dia
            </Label>
            <Input
              id="dia"
              name="dia"
              value={formData.dia}
              onChange={handleInputChange}
              placeholder="Ex: 20"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="mesAtualNumero" className="text-sm font-medium">
              Mês Atual
            </Label>
            <select
              id="mesAtualNumero"
              name="mesAtualNumero"
              value={formData.mesAtualNumero}
              onChange={(e) => {
                const mesNumero = e.target.value
                if (!mesNumero) {
                  handleInputChange({
                    target: { name: "mesAtual", value: "" }
                  } as React.ChangeEvent<HTMLInputElement>)
                  handleInputChange({
                    target: { name: "mesAtualNumero", value: "" }
                  } as React.ChangeEvent<HTMLInputElement>)
                  return
                }
                // Converter o número do mês para o nome do mês em português
                const mesNome = new Date(2023, Number.parseInt(mesNumero) - 1, 1).toLocaleString("pt-BR", {
                  month: "long",
                })
                handleInputChange({
                  target: { name: "mesAtual", value: mesNome }
                } as React.ChangeEvent<HTMLInputElement>)
                handleInputChange({
                  target: { name: "mesAtualNumero", value: mesNumero }
                } as React.ChangeEvent<HTMLInputElement>)
              }}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
            >
              <option value="">Selecione o mês</option>
              <option value="1">1 - Janeiro</option>
              <option value="2">2 - Fevereiro</option>
              <option value="3">3 - Março</option>
              <option value="4">4 - Abril</option>
              <option value="5">5 - Maio</option>
              <option value="6">6 - Junho</option>
              <option value="7">7 - Julho</option>
              <option value="8">8 - Agosto</option>
              <option value="9">9 - Setembro</option>
              <option value="10">10 - Outubro</option>
              <option value="11">11 - Novembro</option>
              <option value="12">12 - Dezembro</option>
            </select>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Assinatura</Label>
          <div className="border rounded-md p-2 bg-white mt-1">
            <SignatureCanvas ref={signatureRef} />
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" onClick={handleClearSignature} type="button" size="sm" className="flex-1">
              <Trash2 className="mr-2 h-4 w-4" /> Limpar
            </Button>
            <Button onClick={handleSaveSignature} type="button" size="sm" className="flex-1">
              <Save className="mr-2 h-4 w-4" /> Salvar Assinatura
            </Button>
          </div>
        </div>

        <Button onClick={handleDownload} className="w-full" size="lg">
          <Download className="mr-2 h-4 w-4" /> Baixar Recibo
        </Button>
      </div>
    </Card>
  )
}
