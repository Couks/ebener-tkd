import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

// Layout do Dashboard: verifica autenticação no servidor para evitar flash de conteúdo
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  // Se não houver sessão, redireciona para a página de login
  if (!session) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex-1 w-0 p-4 lg:p-6">
        {/* Botão para abrir sidebar no mobile */}
        <div className="md:hidden flex items-center mb-4">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold ml-2">Dashboard</h2>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
