"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2, UploadCloud, X } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";

export default function NewGalleryPage() {
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImageFiles(prev => [...prev, ...newFiles]);

      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imageFiles.length === 0) {
        toast.error("Por favor, adicione pelo menos uma imagem.");
        return;
    }
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    imageFiles.forEach(file => {
        formData.append('images', file);
    });

    try {
      const response = await fetch('/api/admin/galeria', {
        method: 'POST',
        body: formData,
        headers: { 'Authorization': 'Basic ' + btoa('admin:123') },
      });
      const resJson = await response.json();
      if (!response.ok) throw new Error(resJson.message || "Falha ao criar galeria");
      toast.success("Galeria criada com sucesso!");
      router.push('/admin/galeria');
    } catch (error: any) {
      toast.error(error.message || "Ocorreu um erro.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
            <Link href="/admin/galeria">
                <Button variant="outline" size="icon" className="border-secondary-700 hover:bg-secondary-800">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
            </Link>
            <div>
                <h1 className="text-3xl font-bold">Criar Nova Galeria</h1>
                <p className="text-gray-400">Preencha os detalhes para adicionar uma nova galeria de eventos.</p>
            </div>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-secondary-900/50 border-secondary-700">
                        <CardHeader>
                            <CardTitle>Detalhes do Evento</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="title">Título do Evento</Label>
                                <Input id="title" name="title" placeholder="Ex: Campeonato Brasileiro 2024" required />
                            </div>
                            <div>
                                <Label htmlFor="description">Descrição</Label>
                                <Textarea id="description" name="description" placeholder="Descreva brevemente o evento..." />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="date">Data do Evento</Label>
                                    <DatePicker name="date" required />
                                </div>
                                <div>
                                    <Label htmlFor="category">Categoria</Label>
                                    <Select name="category" required>
                                        <SelectTrigger className="bg-foreground/10 border-input"><SelectValue placeholder="Selecione uma categoria" /></SelectTrigger>
                                        <SelectContent className="bg-secondary-800 border-secondary-700 text-white">
                                            <SelectItem value="Treinos">Treinos</SelectItem>
                                            <SelectItem value="Competições">Competições</SelectItem>
                                            <SelectItem value="Graduações">Graduações</SelectItem>
                                            <SelectItem value="Eventos">Eventos</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="bg-secondary-900/50 border-secondary-700">
                        <CardHeader>
                            <CardTitle>Imagens</CardTitle>
                            <CardDescription>Faça upload das fotos do evento.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="border-2 border-dashed border-secondary-700 rounded-lg p-6 text-center">
                                <UploadCloud className="mx-auto h-12 w-12 text-gray-500" />
                                <Label htmlFor="image-upload" className="mt-4 inline-block bg-secondary-800 hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
                                    Selecionar Imagens
                                </Label>
                                <Input id="image-upload" name="images" type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                                <p className="mt-2 text-xs text-gray-500">PNG, JPG, WEBP</p>
                            </div>
                            {imagePreviews.length > 0 && (
                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    {imagePreviews.map((src, index) => (
                                        <div key={index} className="relative group">
                                            <Image src={src} alt={`Preview ${index}`} width={150} height={150} className="rounded-lg object-cover w-full h-full aspect-square" />
                                            <Button type="button" size="icon" variant="destructive" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeImage(index)}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <Button type="submit" size="lg" className="w-full bg-primary-500 hover:bg-primary-600" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Salvar Galeria
                    </Button>
                </div>
            </div>
        </form>
    </div>
  );
}
