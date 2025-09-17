"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GalleryHorizontal, MessageSquareQuote, PlusCircle, History, Loader2 } from "lucide-react";
import Link from 'next/link';
import { toast } from 'sonner';

interface Stat {
  count: number;
}

interface RecentActivity {
  id: string;
  type: 'gallery' | 'testimonial';
  title: string;
  created_at: string;
}

// StatCard component moved outside of AdminHomePage
const StatCard = ({ title, value, icon: Icon, loading }: { title: string, value: number, icon: React.ElementType, loading: boolean }) => (
    <Card className="bg-secondary-900/50 border-secondary-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
        <Icon className="h-5 w-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <div className="text-3xl font-bold text-muted">{value}</div>}
      </CardContent>
    </Card>
);

export default function AdminHomePage() {
  const [stats, setStats] = useState({ galleries: 0, testimonials: 0 });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/admin/stats', {
          headers: { 'Authorization': 'Basic ' + btoa('admin:123') },
        });

        if (!response.ok) {
          throw new Error('Falha ao buscar estatísticas');
        }

        const data = await response.json();
        setStats({ galleries: data.galleries, testimonials: data.testimonials });
        setRecentActivity(data.recentActivity || []);

      } catch (error) {
        console.error("Falha ao buscar dados do dashboard", error);
        toast.error("Não foi possível carregar as estatísticas.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400">Visão geral do conteúdo do seu site.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Galerias Criadas" value={stats.galleries} icon={GalleryHorizontal} loading={loading} />
        <StatCard title="Depoimentos" value={stats.testimonials} icon={MessageSquareQuote} loading={loading} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-secondary-900/50 border-secondary-700">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Crie novos conteúdos rapidamente.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link href="/admin/galeria/novo">
              <Button className="w-full justify-start gap-3 py-6 bg-primary-500 hover:bg-primary-600 text-base">
                <PlusCircle className="h-5 w-5" /> Nova Galeria
              </Button>
            </Link>
            <Link href="/admin/depoimentos">
              <Button className="w-full justify-start gap-3 py-6 bg-primary-500 hover:bg-primary-600 text-base" onClick={() => { /* Logic to open new testimonial dialog */ }}>
                <PlusCircle className="h-5 w-5" /> Novo Depoimento
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-secondary-900/50 border-secondary-700">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas atualizações no conteúdo.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : recentActivity.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">Nenhuma atividade recente.</p>
            ) : (
              <ul className="space-y-4">
                {recentActivity.map(activity => (
                  <li key={`${activity.type}-${activity.id}`} className="flex items-center gap-4">
                    <div className="p-2 bg-secondary-800 rounded-full">
                      {activity.type === 'gallery' ? <GalleryHorizontal className="h-5 w-5 text-primary-500" /> : <MessageSquareQuote className="h-5 w-5 text-primary-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-muted">{activity.title}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(activity.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
