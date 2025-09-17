"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, UploadCloud, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    quote: string;
    image_url: string;
    achievement?: string;
    year?: number;
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
                        <CardHeader><Skeleton className="h-6 w-48" /></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
                                <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
                            </div>
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

export default function EditTestimonialPage() {
    const router = useRouter();
    const params = useParams();
    const testimonialId = params.id as string;

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [testimonial, setTestimonial] = useState<Testimonial | null>(null);

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (!testimonialId) return;
        const fetchTestimonial = async () => {
            try {
                const response = await fetch(`/api/testimonials/${testimonialId}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error("Depoimento não encontrado");
                    }
                    throw new Error("Falha ao buscar dados do depoimento");
                }

                const currentTestimonial: Testimonial = await response.json();

                setTestimonial(currentTestimonial);
                setImagePreview(currentTestimonial.image_url);
            } catch (error: any) {
                toast.error(error.message || "Não foi possível carregar o depoimento para edição.");
                router.push('/admin/depoimentos');
            } finally {
                setInitialLoading(false);
            }
        };
        fetchTestimonial();
    }, [testimonialId, router]);

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
        const fileInput = document.getElementById('image-upload') as HTMLInputElement;
        if(fileInput) fileInput.value = "";
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        if (imageFile) {
            formData.append('image', imageFile);
        }
        // Send the original image url if no new image is selected
        if (testimonial?.image_url) {
             formData.append('existingImageUrl', testimonial.image_url);
        }

        try {
            const response = await fetch(`/api/admin/testimonials/${testimonialId}`, {
                method: 'PUT',
                body: formData,
                headers: { 'Authorization': 'Basic ' + btoa('admin:123') },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Falha ao atualizar o depoimento");
            }

            toast.success("Depoimento atualizado com sucesso!");
            router.push('/admin/depoimentos');
        } catch (error: any) {
            toast.error(`Ocorreu um erro: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return <PageSkeleton />;
    }

    if (!testimonial) {
        return <div>Depoimento não encontrado.</div>;
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/depoimentos">
                    <Button variant="outline" size="icon" className="h-10 w-10">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">Editar Depoimento</h1>
                    <p className="text-gray-400">Atualize os dados de {testimonial.name}.</p>
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
                                        <Input id="name" name="name" defaultValue={testimonial.name} required />
                                    </div>
                                    <div>
                                        <Label htmlFor="role">Cargo / Faixa</Label>
                                        <Input id="role" name="role" defaultValue={testimonial.role} required />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="quote">Depoimento</Label>
                                    <Textarea id="quote" name="quote" defaultValue={testimonial.quote} required />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="achievement">Conquista</Label>
                                        <Input id="achievement" name="achievement" defaultValue={testimonial.achievement ?? ''} />
                                    </div>
                                    <div>
                                        <Label htmlFor="year">Ano da Conquista</Label>
                                        <Input id="year" name="year" type="number" defaultValue={testimonial.year ?? ''} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-secondary-900/50 border-secondary-700">
                            <CardHeader>
                                <CardTitle>Imagem de Perfil</CardTitle>
                                <CardDescription>Faça o upload de uma nova foto.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="border-2 border-dashed border-secondary-700 rounded-lg p-6 text-center">
                                    <UploadCloud className="mx-auto h-12 w-12 text-gray-500" />
                                    <Label htmlFor="image-upload" className="mt-4 inline-block bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-2 px-4 rounded-lg cursor-pointer">
                                        Alterar Imagem
                                    </Label>
                                    <Input id="image-upload" name="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
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
                            Salvar Alterações
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
