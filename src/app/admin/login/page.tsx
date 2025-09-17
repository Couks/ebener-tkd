"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import logo from '@/assets/favicon.png';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Login bem-sucedido!');
        router.push('/admin');
        router.refresh(); // Refresh to get the new cookie state
      } else {
        const data = await response.json();
        toast.error(data.message || 'Credenciais inválidas.');
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao tentar fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary-950 p-4">
       <Card className="w-full max-w-sm bg-secondary-900/80 border-secondary-700 text-white">
        <CardHeader className="text-center">
            <Image src={logo} alt="Ebener TKD Logo" width={150} height={50} className="mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold">Acesso Restrito</CardTitle>
          <CardDescription>
            Entre com suas credenciais para gerenciar o site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Seu usuário"
                required
                className="bg-foreground/10 border-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Sua senha"
                required
                className="bg-foreground/10 border-input"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
