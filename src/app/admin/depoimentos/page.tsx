"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { MoreHorizontal, PlusCircle, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TableSkeleton from "./loading";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    quote: string;
    image_url: string;
    achievement?: string;
    year?: number;
}

export default function DepoimentosPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [testimonialToDelete, setTestimonialToDelete] = useState<Testimonial | null>(null);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch('/api/testimonials');
            const data = await response.json();
            setTestimonials(data);
        } catch (error) {
            toast.error("Falha ao carregar os depoimentos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleDelete = async () => {
        if (!testimonialToDelete) return;

        const originalTestimonials = [...testimonials];

        // Optimistic UI update
        setTestimonials(prev => prev.filter(t => t.id !== testimonialToDelete.id));

        try {
            const response = await fetch(`/api/admin/testimonials/${testimonialToDelete.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': 'Basic ' + btoa('admin:123') },
            });

            if (!response.ok) {
                throw new Error("Falha ao deletar depoimento no servidor.");
            }

            toast.success(`Depoimento de "${originalTestimonials.find(t => t.id === testimonialToDelete.id)?.name}" deletado com sucesso!`);

        } catch (error) {
            toast.error("Falha ao deletar. Restaurando depoimento.");
            // Revert UI on failure
            setTestimonials(originalTestimonials);
            console.error(error);
        }
    };

    if (loading) {
        return <TableSkeleton />;
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Gerenciar Depoimentos</h1>
                    <p className="text-gray-400">Adicione, edite ou remova os depoimentos que aparecem no site.</p>
                </div>
                <Link href="/admin/depoimentos/novo">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Adicionar Depoimento
                    </Button>
                </Link>
            </div>

            <Card className="bg-secondary-900/50 border-secondary-700">
                <CardHeader>
                    <CardTitle>Depoimentos Cadastrados</CardTitle>
                    <CardDescription>
                        Total de {testimonials.length} depoimentos.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                   Imagem
                                </TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Cargo / Faixa</TableHead>
                                <TableHead className="hidden md:table-cell">Depoimento</TableHead>
                                <TableHead>
                                    Ações
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {testimonials.map((testimonial) => (
                                <TableRow key={testimonial.id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={testimonial.image_url} alt={testimonial.name} />
                                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium">{testimonial.name}</TableCell>
                                    <TableCell>{testimonial.role}</TableCell>
                                    <TableCell className="hidden md:table-cell max-w-sm truncate">{testimonial.quote}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-secondary-800 border-secondary-700 text-white">
                                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/admin/depoimentos/editar/${testimonial.id}`} className="flex items-center cursor-pointer">
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Editar
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="flex items-center text-red-400 focus:text-red-300 focus:bg-red-900/20"
                                                    onSelect={() => setTestimonialToDelete(testimonial)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Deletar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <AlertDialog open={!!testimonialToDelete} onOpenChange={(isOpen) => !isOpen && setTestimonialToDelete(null)}>
                <AlertDialogContent className="bg-secondary-900 border-secondary-700">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Essa ação não pode ser desfeita. Isso irá deletar permanentemente o depoimento de <span className="font-bold">{testimonialToDelete?.name}</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Deletar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
