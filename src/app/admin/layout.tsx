"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Swords, Home, GalleryHorizontal, MessageSquareQuote, LogOut, Receipt } from "lucide-react";
import { toast } from "sonner";

const navItems = [
  { href: "/admin", label: "Início", icon: Home },
  { href: "/admin/galeria", label: "Galerias", icon: GalleryHorizontal },
  { href: "/admin/depoimentos", label: "Depoimentos", icon: MessageSquareQuote },
  { href: "/admin/recibos", label: "Recibos", icon: Receipt },
];

const DesktopSidebar = ({ pathname, onLogout }: { pathname: string, onLogout: () => void }) => (
  <aside className="hidden lg:flex flex-col w-64 border-r border-secondary-700 bg-secondary-900/50 p-4">
    <div className="flex h-16 items-center border-b border-secondary-700 px-4">
      <Link href="/admin" className="flex items-center gap-2 font-semibold text-primary-500">
        <Swords className="h-6 w-6" />
        <span className="text-lg">Painel Ebener</span>
      </Link>
    </div>
    <nav className="flex flex-col gap-2 py-4 flex-1">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={pathname === item.href ? "default" : "ghost"}
            className="w-full justify-start gap-3 px-4 py-6 text-base"
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Button>
        </Link>
      ))}
    </nav>
    <div className="mt-auto">
        <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full justify-start gap-3 px-4 py-6 text-base text-red-400 hover:text-red-300 hover:bg-red-900/20"
        >
            <LogOut className="h-5 w-5" />
            Sair
        </Button>
    </div>
  </aside>
);

const MobileBottomNav = ({ pathname, onLogout }: { pathname: string, onLogout: () => void }) => (
  <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-16 bg-secondary-900 border-t border-secondary-700">
    {navItems.map((item) => (
      <Link key={item.href} href={item.href} className="flex-1">
        <Button
          variant="ghost"
          className={`w-full h-full flex flex-col items-center justify-center gap-1 rounded-none text-xs ${pathname === item.href ? "text-primary-500 bg-primary-500/10" : "text-gray-400"}`}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Button>
      </Link>
    ))}
    <div className="flex-1">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full h-full flex flex-col items-center justify-center gap-1 rounded-none text-xs text-red-400"
        >
          <LogOut className="h-5 w-5" />
          <span>Sair</span>
        </Button>
    </div>
  </nav>
);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // If it's the login page, don't render the main admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', { method: 'POST' });
      if (response.ok) {
        toast.success('Você foi desconectado.');
        router.push('/admin/login');
        router.refresh();
      } else {
        throw new Error('Falha ao fazer logout.');
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao tentar sair.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="flex min-h-screen">
        <DesktopSidebar pathname={pathname} onLogout={handleLogout} />
        <div className="flex flex-col flex-1 w-full lg:w-[calc(100%-16rem)]">
          <main className="flex flex-1 flex-col gap-6 p-6 md:p-8 pb-24 lg:pb-8">
            {children}
          </main>
        </div>
        <MobileBottomNav pathname={pathname} onLogout={handleLogout} />
      </div>
    </div>
  );
}
