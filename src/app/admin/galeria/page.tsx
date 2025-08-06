"use client";

import { useState, FormEvent, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Calendar, X, Plus } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define event type (duplicate for now, ideally would be in a shared types file)
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  imageFolder: string;
  imageUrls: string[];
  category: string; // New category field
}

export default function AdminGaleriaPage() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [keptImageUrls, setKeptImageUrls] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false); // New state to control form visibility
  const [category, setCategory] = useState(''); // New category state

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Event[] = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      toast.error("Failed to load events.");
    } finally {
      setLoading(false);
    }
  }, [setEvents, setLoading]);

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleEditClick = useCallback((event: Event) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDate(event.date);
    setImages(null); // Clear image input for new uploads
    setKeptImageUrls(event.imageUrls || []); // Initialize with existing image URLs
    setCategory(event.category || ''); // Set category for editing
    setShowForm(true); // Show the form when editing
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingEvent(null);
    setTitle('');
    setDate('');
    setImages(null);
    setKeptImageUrls([]);
    setCategory(''); // Clear category
    setShowForm(false); // Hide the form when cancelling
  }, []);

  const handleRemoveImage = useCallback((imageUrlToRemove: string) => {
    setKeptImageUrls(prevUrls => prevUrls.filter(url => url !== imageUrlToRemove));
  }, []);

  const handleDeleteClick = useCallback((eventId: string) => {
    setEventToDelete(eventId);
    setIsDeleteDialogOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!eventToDelete) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/galeria/${eventToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Basic ' + btoa('admin:123'),
        },
      });

      if (response.ok) {
        toast.success('Evento excluído com sucesso!');
        fetchEvents(); // Re-fetch events to update the list
      } else {
        const errorData = await response.json();
        toast.error(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      toast.error('Ocorreu um erro inesperado durante a exclusão.');
    } finally {
      setLoading(false);
      setIsDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  }, [eventToDelete, fetchEvents, setLoading]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('category', category);

    if (editingEvent) {
      formData.append('keptImageUrls', JSON.stringify(keptImageUrls));
    }

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    const method = editingEvent ? 'PUT' : 'POST'; // Use PUT for updates
    const url = editingEvent ? `/api/admin/galeria/${editingEvent.id}` : '/api/admin/galeria';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': 'Basic ' + btoa('admin:123'), // Basic Auth: admin:123
        },
        body: formData,
      });

      if (response.ok) {
        toast.success(`Evento ${editingEvent ? 'atualizado' : 'criado'} com sucesso!`);
        handleCancelEdit(); // Reset form and editing state
        fetchEvents(); // Re-fetch events to update the list
      } else {
        const errorData = await response.json();
        toast.error(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast.error('Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  }, [title, date, images, editingEvent, fetchEvents, handleCancelEdit, setLoading, keptImageUrls, category]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-secondary-900 border-r border-secondary-700 p-6 flex flex-col">
          <h1 className="text-2xl font-bold mb-6 text-primary-500">Painel Administrativo</h1>
          <Button 
            className="w-full mb-6 bg-primary-500 hover:bg-primary-600 text-black font-bold py-3 rounded-md flex items-center justify-center gap-2"
            onClick={() => { handleCancelEdit(); setShowForm(true); }}
          >
            <Plus size={20} /> Criar Novo Evento
          </Button>

          <Card className="bg-secondary-800/50 border-secondary-700 text-white flex-grow">
            <CardHeader>
              <CardTitle>Eventos Existentes</CardTitle>
              <CardDescription className="text-gray-400">Selecione um evento para editar ou exclua-o.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="mr-2 h-6 w-6 animate-spin text-primary-500" />
                  <span className="text-gray-400">Carregando eventos...</span>
                </div>
              ) : events.length === 0 ? (
                <p className="text-gray-400 p-4 text-center">Nenhum evento cadastrado ainda.</p>
              ) : (
                <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-secondary-700">
                        <TableHead className="text-primary-500 sticky top-0 bg-secondary-800/90 z-10">Título</TableHead>
                        <TableHead className="text-primary-500 text-right sticky top-0 bg-secondary-800/90 z-10">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events.map((event) => (
                        <TableRow key={event.id} className="border-secondary-700 hover:bg-secondary-700/70 cursor-pointer">
                          <TableCell className="font-medium text-white" onClick={() => handleEditClick(event)}>{event.title}</TableCell>
                          <TableCell className="text-right">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm" onClick={() => setEventToDelete(event.id)}>Excluir</Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-secondary-900 text-white border-secondary-700">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
                                  <AlertDialogDescription className="text-gray-300">
                                    Esta ação não pode ser desfeita. Isso excluirá permanentemente seu
                                    evento e removerá seus dados de nossos servidores.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="border-secondary-200 text-gray-800 hover:bg-secondary-800 hover:text-white">Cancelar</AlertDialogCancel>
                                  <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={confirmDelete}>Continuar</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </aside>

        {/* Main Content - Form */}
        <main className="flex-grow p-6 md:p-8">
          <h1 className="text-4xl font-bold mb-8 text-primary-500">Gerenciar Galeria de Eventos</h1>
          {showForm && (
            <Card className="mb-12 bg-secondary-900/50 border-secondary-700 text-white">
              <CardHeader>
                <CardTitle>{editingEvent ? 'Editar Evento' : 'Criar Novo Evento'}</CardTitle>
                <CardDescription className="text-gray-400">{editingEvent ? 'Altere os detalhes do evento e substitua as imagens, se necessário.' : 'Preencha os campos para criar um novo evento e faça upload das imagens relacionadas.'}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <Label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Título do Evento</Label>
                      <Input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 bg-secondary-800 border border-secondary-700 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">Data do Evento</Label>
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-3 bg-secondary-800 border border-secondary-700 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">Categoria do Evento</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger className="w-full p-3 bg-secondary-800 border border-secondary-700 rounded-md focus:ring-primary-500 focus:border-primary-500">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent className="bg-secondary-800 border-secondary-700 text-white">
                        <SelectItem value="Treinos">Treinos</SelectItem>
                        <SelectItem value="Competições">Competições</SelectItem>
                        <SelectItem value="Graduações">Graduações</SelectItem>
                        <SelectItem value="Eventos">Eventos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="images" className="block text-sm font-medium text-gray-300 mb-2">Imagens do Evento (Múltiplas)</Label>
                    <Input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => setImages(e.target.files)}
                      className="w-full h-auto p-3 bg-secondary-800 border border-secondary-700 rounded-md focus:ring-primary-500 focus:border-primary-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-500 file:text-black hover:file:bg-primary-600 file:cursor-pointer"
                    />
                    {editingEvent && (
                      <p className="text-sm text-gray-400 mt-2">Deixe em branco para manter as imagens existentes. Novas imagens substituirão as antigas.</p>
                    )}
                    {editingEvent && keptImageUrls.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-300 mb-2">Imagens Atuais:</p>
                        <div className="grid grid-cols-3 gap-2">
                          {keptImageUrls.map((url, imgIdx) => (
                            <div key={imgIdx} className="relative w-full h-32 bg-secondary-700 rounded overflow-hidden group">
                              <Image src={url} alt={`Current Image ${imgIdx + 1}`} layout="fill" objectFit="cover" />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(url)}
                                className="absolute top-1 right-1 bg-red-600 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                title="Remover imagem"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="flex-grow bg-primary-500 hover:bg-primary-600 text-black font-bold py-3 rounded-md transition-colors flex items-center justify-center"
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      {loading ? (editingEvent ? 'Salvando...' : 'Criando Evento...') : (editingEvent ? 'Salvar Alterações' : 'Criar Evento')}
                    </Button>
                    {editingEvent && (
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-grow text-gray-400 border-gray-400 hover:bg-gray-700 hover:text-white"
                        onClick={handleCancelEdit}
                      >
                        Cancelar Edição
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          )} 
          {!showForm && (
            <div className="p-4 text-gray-400">
                Selecione um evento na barra lateral para editar ou clique em 
                &quot;Criar Novo Evento&quot;.
            </div>
          )}
        </main>

        {/* AlertDialog for Delete Confirmation */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent className="bg-secondary-900 text-white border-secondary-700">
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300">
                Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-secondary-700 text-gray-300 hover:bg-secondary-800">Cancelar</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={confirmDelete}>Excluir</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
} 