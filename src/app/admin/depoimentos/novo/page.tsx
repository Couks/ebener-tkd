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
import { ArrowLeft, Loader2, UploadCloud, X } from "lucide-react";

export default function NewTestimonialPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        // Reset the file input
        const fileInput = document.getElementById('image-upload') as HTMLInputElement;
        if(fileInput) fileInput.value = "";
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!imageFile) {
            toast.error("Por favor, selecione uma imagem para o depoimento.");
            return;
        }
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        formData.append('image', imageFile);

        try {
            const response = await fetch('/api/admin/testimonials', {
                method: 'POST',
                body: formData,
                headers: { 'Authorization': 'Basic ' + btoa('admin:123') },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Falha ao criar o depoimento");
            }

            toast.success("Depoimento criado com sucesso!");
            router.push('/admin/depoimentos');
        } catch (error: any) {
            toast.error(`Ocorreu um erro: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/depoimentos">
                    <Button variant="outline" size="icon" className="h-10 w-10">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">Adicionar Novo Depoimento</h1>
                    <p className="text-gray-400">Preencha os campos abaixo para criar um novo depoimento.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="bg-secondary-900/50 border-secondary-700">
                            <CardHeader><CardTitle>Informações do Depoimento</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name">Nome</Label>
                                        <Input id="name" name="name" placeholder="Ex: João da Silva" required />
                                    </div>
                                    <div>
                                        <Label htmlFor="role">Cargo / Faixa</Label>
                                        <Input id="role" name="role" placeholder="Ex: Faixa Preta 1º Dan" required />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="quote">Depoimento</Label>
                                    <Textarea id="quote" name="quote" placeholder="Escreva o depoimento aqui..." required />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="achievement">Conquista</Label>
                                        <Input id="achievement" name="achievement" placeholder="Ex: Campeão Brasileiro" />
                                    </div>
                                    <div>
                                        <Label htmlFor="year">Ano da Conquista</Label>
                                        <Input id="year" name="year" type="number" placeholder="Ex: 2024" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-secondary-900/50 border-secondary-700">
                            <CardHeader>
                                <CardTitle>Imagem de Perfil</CardTitle>
                                <CardDescription>Faça o upload da foto.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="border-2 border-dashed border-secondary-700 rounded-lg p-6 text-center">
                                    <UploadCloud className="mx-auto h-12 w-12 text-gray-500" />
                                    <Label htmlFor="image-upload" className="mt-4 inline-block bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-2 px-4 rounded-lg cursor-pointer">
                                        Selecionar Imagem
                                    </Label>
                                    <Input id="image-upload" name="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} required />
                                </div>
                                {imagePreview && (
                                    <div className="mt-4">
                                        <h4 className="font-semibold mb-2">Pré-visualização</h4>
                                        <div className="relative w-32 h-32">
                                            <Image src={imagePreview} alt="Preview" layout="fill" className="rounded-lg object-cover" />
                                            <Button type="button" size="icon" variant="destructive" className="absolute -top-2 -right-2 h-6 w-6" onClick={removeImage}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        <Button type="submit" size="lg" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Criar Depoimento
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
