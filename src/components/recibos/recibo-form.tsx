"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignatureCanvas from "@/components/recibos/signature-canvas";
import ReciboPreview from "@/components/recibos/recibo-preview";
import { useIsMobile } from "@/hooks/use-mobile";
import { Download, Save, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ReciboForm() {
  const isMobile = useIsMobile();
  const signatureRef = useRef<any>(null);
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
  });

  // Formatar valor monetário
  const formatarValor = (valor: string) => {
    let apenasNumeros = valor.replace(/\D/g, "");
    if (apenasNumeros === "") return "";
    const valorNumerico = parseFloat(apenasNumeros) / 100;
    return valorNumerico.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "valor") {
      setFormData((prev) => ({ ...prev, [name]: formatarValor(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
      if (name === 'mesAtualNumero') {
          if (!value) {
            setFormData(prev => ({...prev, mesAtual: "", mesAtualNumero: ""}));
            return;
          }
          const mesNome = new Date(2023, Number.parseInt(value) - 1, 1).toLocaleString("pt-BR", { month: "long" });
          setFormData(prev => ({...prev, mesAtual: mesNome, mesAtualNumero: value}));
      } else {
          setFormData(prev => ({...prev, [name]: value}));
      }
  }

  const handleClearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      setFormData((prev) => ({ ...prev, assinatura: "" }));
    }
  };

  const handleSaveSignature = () => {
    if (signatureRef.current) {
      const signatureData = signatureRef.current.toDataURL("image/png");
      setFormData((prev) => ({ ...prev, assinatura: signatureData }));
    }
  };

  const handleDownload = () => {
    const reciboElement = document.getElementById("recibo-para-download");
    if (!reciboElement) return;

    if (!formData.nomeResponsavel || !formData.nomeAluno || !formData.valor || !formData.mes || !formData.assinatura) {
      alert("Por favor, preencha todos os campos e salve a assinatura antes de baixar.");
      return;
    }

    import("html-to-image").then((htmlToImage) => {
      htmlToImage
        .toJpeg(reciboElement, { quality: 0.95, backgroundColor: '#ffffff' })
        .then((dataUrl: string) => {
          const link = document.createElement("a");
          link.download = `recibo-${formData.nomeAluno.replace(/\s+/g, "-").toLowerCase()}-${formData.mes.toLowerCase()}-${formData.ano}.jpeg`;
          link.href = dataUrl;
          link.click();
        })
        .catch((error: Error) => {
          console.error("Erro ao gerar a imagem do recibo:", error);
        });
    });
  };

  useEffect(() => {
    const hoje = new Date();
    setFormData((prev) => ({
      ...prev,
      dia: hoje.getDate().toString(),
      mesAtual: hoje.toLocaleString("pt-BR", { month: "long" }),
      mesAtualNumero: (hoje.getMonth() + 1).toString(),
      ano: hoje.getFullYear().toString(),
    }));
  }, []);

  return (
    <div className="w-full">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold">Gerador de Recibos</h1>
                <p className="text-gray-400">Preencha os dados para criar e baixar um novo recibo.</p>
            </div>
        </div>

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
                handleSelectChange={handleSelectChange}
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
            <div className="grid md:grid-cols-2 gap-8 items-start">
            <FormularioRecibo
                formData={formData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                signatureRef={signatureRef}
                handleClearSignature={handleClearSignature}
                handleSaveSignature={handleSaveSignature}
                handleDownload={handleDownload}
            />

            <div className="space-y-4 sticky top-8">
                <CardHeader className="p-0 mb-4">
                    <CardTitle>Pré-visualização do Recibo</CardTitle>
                    <CardDescription>Esta é a aparência final do recibo que será baixado.</CardDescription>
                </CardHeader>
                <ReciboPreview formData={formData} />
                 <Button onClick={handleDownload} className="w-full" size="lg">
                    <Download className="mr-2 h-4 w-4" /> Baixar Recibo
                </Button>
            </div>
            </div>
        )}
    </div>
  );
}

interface FormularioReciboProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  signatureRef: React.RefObject<any>;
  handleClearSignature: () => void;
  handleSaveSignature: () => void;
  handleDownload: () => void;
}

const months = [
    { value: "Janeiro", label: "Janeiro" }, { value: "Fevereiro", label: "Fevereiro" },
    { value: "Março", label: "Março" }, { value: "Abril", label: "Abril" },
    { value: "Maio", label: "Maio" }, { value: "Junho", label: "Junho" },
    { value: "Julho", label: "Julho" }, { value: "Agosto", label: "Agosto" },
    { value: "Setembro", label: "Setembro" }, { value: "Outubro", label: "Outubro" },
    { value: "Novembro", label: "Novembro" }, { value: "Dezembro", label: "Dezembro" },
];

const currentMonths = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1} - ${new Date(2000, i, 1).toLocaleString('pt-BR', { month: 'long' })}`
}));


function FormularioRecibo({
  formData,
  handleInputChange,
  handleSelectChange,
  signatureRef,
  handleClearSignature,
  handleSaveSignature,
  handleDownload,
}: FormularioReciboProps) {
  return (
    <div className="space-y-6">
        <Card className="bg-secondary-900/50 border-secondary-700">
            <CardHeader>
                <CardTitle>Informações do Pagamento</CardTitle>
                <CardDescription>Preencha os dados do responsável, aluno e valor.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div>
                    <Label htmlFor="nomeResponsavel">Nome do Responsável</Label>
                    <Input id="nomeResponsavel" name="nomeResponsavel" value={formData.nomeResponsavel} onChange={handleInputChange} placeholder="Nome completo do responsável" />
                </div>
                <div>
                    <Label htmlFor="nomeAluno">Nome do Aluno</Label>
                    <Input id="nomeAluno" name="nomeAluno" value={formData.nomeAluno} onChange={handleInputChange} placeholder="Nome completo do aluno"/>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="valor">Valor (R$)</Label>
                        <Input id="valor" name="valor" value={formData.valor} onChange={handleInputChange} placeholder="0,00"/>
                    </div>
                    <div>
                        <Label htmlFor="mes">Mês de Referência</Label>
                        <Select name="mes" value={formData.mes} onValueChange={(value) => handleSelectChange('mes', value)}>
                            <SelectTrigger><SelectValue placeholder="Selecione o mês" /></SelectTrigger>
                            <SelectContent>
                                {months.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card className="bg-secondary-900/50 border-secondary-700">
            <CardHeader>
                <CardTitle>Data de Emissão do Recibo</CardTitle>
                <CardDescription>Data em que o recibo está sendo gerado.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <Label htmlFor="dia">Dia</Label>
                    <Input id="dia" name="dia" value={formData.dia} onChange={handleInputChange} placeholder="Ex: 20" />
                </div>
                <div>
                    <Label htmlFor="mesAtualNumero">Mês Atual</Label>
                     <Select name="mesAtualNumero" value={formData.mesAtualNumero} onValueChange={(value) => handleSelectChange('mesAtualNumero', value)}>
                        <SelectTrigger><SelectValue placeholder="Selecione o mês" /></SelectTrigger>
                        <SelectContent>
                            {currentMonths.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="ano">Ano</Label>
                    <Input id="ano" name="ano" value={formData.ano} onChange={handleInputChange} placeholder="Ex: 2025" />
                </div>
            </CardContent>
        </Card>

        <Card className="bg-secondary-900/50 border-secondary-700">
             <CardHeader>
                <CardTitle>Assinatura</CardTitle>
                <CardDescription>Desenhe a assinatura no campo abaixo.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md bg-white">
                    <SignatureCanvas ref={signatureRef} />
                </div>
                <div className="flex gap-2 mt-4">
                    <Button variant="outline" onClick={handleClearSignature} type="button" size="sm" className="flex-1">
                        <Trash2 className="mr-2 h-4 w-4" /> Limpar
                    </Button>
                    <Button onClick={handleSaveSignature} type="button" size="sm" className="flex-1">
                        <Save className="mr-2 h-4 w-4" /> Salvar Assinatura
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
