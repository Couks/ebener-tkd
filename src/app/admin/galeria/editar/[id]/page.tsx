"use client";

import { useState, FormEvent, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2, UploadCloud, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { DatePicker } from "@/components/ui/date-picker";

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    category: string;
    imageUrls: string[];
}

function PageSkeleton() {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10" />
            <div>
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96 mt-2" />
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <Card className="bg-secondary-900/50 border-secondary-700">
                    <CardHeader><Skeleton className="h-6 w-40" /></CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
                        <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-24 w-full" /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
                            <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card className="bg-secondary-900/50 border-secondary-700">
                    <CardHeader><Skeleton className="h-6 w-32" /><Skeleton className="h-4 w-48 mt-2" /></CardHeader>
                    <CardContent><Skeleton className="h-32 w-full" /></CardContent>
                </Card>
                <Skeleton className="h-12 w-full" />
            </div>
        </div>
      </div>
    )
  }

export default function EditGalleryPage() {
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [event, setEvent] = useState<Event | null>(null);

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [keptImageUrls, setKeptImageUrls] = useState<string[]>([]);

    const router = useRouter();
    const params = useParams();
    const eventId = params.id as string;

    useEffect(() => {
        if (!eventId) return;
        const fetchEvent = async () => {
            try {
                const response = await fetch(`/api/events/${eventId}`);
                if (!response.ok) throw new Error("Falha ao buscar dados do evento");
                const data = await response.json();
                setEvent(data);
                setKeptImageUrls(data.imageUrls || []);
            } catch (error) {
                toast.error("Não foi possível carregar o evento.");
                router.push('/admin/galeria');
            } finally {
                setInitialLoading(false);
            }
        };
        fetchEvent();
    }, [eventId, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setImageFiles(prev => [...prev, ...newFiles]);
            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeNewImage = (indexToRemove: number) => {
        setImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
        setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const removeExistingImage = (urlToRemove: string) => {
        setKeptImageUrls(prev => prev.filter(url => url !== urlToRemove));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        imageFiles.forEach(file => formData.append('images', file));
        formData.append('keptImageUrls', JSON.stringify(keptImageUrls));

        try {
            const response = await fetch(`/api/admin/galeria/${eventId}`, {
                method: 'PUT',
                body: formData,
                headers: { 'Authorization': 'Basic ' + btoa('admin:123') },
            });
            if (!response.ok) throw new Error("Falha ao atualizar a galeria");
            toast.success("Galeria atualizada com sucesso!");
            router.push('/admin/galeria');
        } catch (error) {
            toast.error("Ocorreu um erro ao atualizar a galeria.");
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return <PageSkeleton />;
    }

    if (!event) {
        return <div>Evento não encontrado.</div>;
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/galeria"><Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
                <div>
                    <h1 className="text-3xl font-bold">Editar Galeria</h1>
                    <p className="text-gray-400">Atualize os detalhes do evento e gerencie as imagens.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="bg-secondary-900/50 border-secondary-700">
                            <CardHeader><CardTitle>Detalhes do Evento</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Título do Evento</Label>
                                    <Input id="title" name="title" defaultValue={event.title} required />
                                </div>
                                <div>
                                    <Label htmlFor="description">Descrição</Label>
                                    <Textarea id="description" name="description" defaultValue={event.description} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="date">Data</Label>
                                        <DatePicker name="date" defaultValue={new Date(event.date)} required />
                                    </div>
                                    <div>
                                        <Label htmlFor="category">Categoria</Label>
                                        <Select name="category" defaultValue={event.category} required>
                                            <SelectTrigger className="bg-foreground/10 border-input"><SelectValue /></SelectTrigger>
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
                                <CardDescription>Adicione ou remova fotos do evento.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="border-2 border-dashed border-secondary-700 rounded-lg p-6 text-center">
                                    <UploadCloud className="mx-auto h-12 w-12 text-gray-500" />
                                    <Label htmlFor="image-upload" className="mt-4 inline-block bg-secondary-800 hover:bg-secondary-700 font-bold py-2 px-4 rounded-lg cursor-pointer text-white">Adicionar Novas Imagens</Label>
                                    <Input id="image-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                                </div>
                                <div className="mt-4 space-y-4">
                                    {(keptImageUrls.length > 0 || imagePreviews.length > 0) && <h4 className="font-semibold">Imagens Atuais</h4>}
                                    <div className="grid grid-cols-3 gap-4">
                                        {keptImageUrls.map((url, index) => (
                                            <div key={index} className="relative group">
                                                <Image src={url} alt={`Imagem existente ${index}`} width={150} height={150} className="rounded-lg object-cover w-full h-full aspect-square" />
                                                <Button type="button" size="icon" variant="destructive" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeExistingImage(url)}><X className="h-4 w-4" /></Button>
                                            </div>
                                        ))}
                                        {imagePreviews.map((src, index) => (
                                            <div key={index} className="relative group">
                                                <Image src={src} alt={`Preview ${index}`} width={150} height={150} className="rounded-lg object-cover w-full h-full aspect-square" />
                                                <Button type="button" size="icon" variant="destructive" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeNewImage(index)}><X className="h-4 w-4" /></Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Button type="submit" size="lg" className="w-full bg-primary-500 hover:bg-primary-600" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Salvar Alterações
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
