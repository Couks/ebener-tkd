"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Loader2, ImageIcon, Trash2 } from "lucide-react";
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

interface Event {
  id: string;
  title: string;
  date: string;
  imageUrls: string[];
}

export default function AdminGaleriaPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error("Falha ao buscar galerias");
      const data: Event[] = await response.json();
      setEvents(data);
    } catch (error) {
      toast.error("Falha ao carregar galerias.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDelete = async () => {
    if (!eventToDelete) return;

    const originalEvents = [...events];
    const eventToRemove = events.find(e => e.id === eventToDelete);
    if (!eventToRemove) return;

    // Optimistic UI update
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventToDelete));
    setEventToDelete(null);

    try {
      const response = await fetch(`/api/admin/galeria/${eventToDelete}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Basic ' + btoa('admin:123') },
      });

      if (!response.ok) {
        throw new Error("Falha ao excluir galeria no servidor");
      }

      toast.success(`Galeria "${eventToRemove.title}" excluída com sucesso.`);
    } catch (error) {
      toast.error(`Falha ao excluir galeria. Restaurando...`);
      // Revert UI on failure
      setEvents(originalEvents);
      console.error(error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-12 w-12 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Galerias de Eventos</h1>
          <p className="text-gray-400">Gerencie as fotos dos eventos do site.</p>
        </div>
        <Link href="/admin/galeria/novo">
          <Button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600">
            <PlusCircle size={20} />
            <span className="hidden sm:inline">Nova Galeria</span>
          </Button>
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-secondary-700 shadow-sm h-80 p-20">
          <div className="flex flex-col items-center gap-2 text-center">
            <ImageIcon className="h-12 w-12 text-gray-500" />
            <h3 className="text-xl font-bold tracking-tight">Nenhuma galeria encontrada</h3>
            <p className="text-sm text-gray-500">Comece criando uma nova galeria de eventos.</p>
          </div>
                </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {events.map((event) => (
            <Card key={event.id} className="bg-secondary-900/50 border-secondary-700 flex flex-col overflow-hidden group">
              <CardHeader className="p-0 relative h-48 w-full">
                <Link href={`/admin/galeria/editar/${event.id}`} className="absolute inset-0 z-10">
                  <span className="sr-only">Editar galeria</span>
                </Link>
                <Image
                  src={event.imageUrls?.[0] || '/placeholder.svg'}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 z-20">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="secondary" className="h-8 w-8 bg-foreground hover:bg-foreground/80 rounded-md">
                        <MoreHorizontal className="h-4 w-4 text-muted" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-secondary-800 border-secondary-700 text-white">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/galeria/editar/${event.id}`}>Editar</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setEventToDelete(event.id); }} className="text-red-500">
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-1">
                <CardTitle className="text-lg font-semibold line-clamp-2">{event.title}</CardTitle>
                <p className="text-sm text-gray-400 mt-1">{formatDate(event.date)}</p>
              </CardContent>
            </Card>
          ))}
            </div>
          )}

      <AlertDialog open={!!eventToDelete} onOpenChange={(open) => !open && setEventToDelete(null)}>
        <AlertDialogContent className="bg-secondary-900 border-secondary-700 text-white">
            <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente a galeria e todas as suas imagens.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel className="border-none">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}
