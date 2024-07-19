import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import WhatsappButton from "@/components/whatsapp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ebener TKD",
  description: "Academia de TaeKwonDo na Ilha do Governador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className="flex flex-col justify-between h-max">
          <NavBar />
          <main>
            <WhatsappButton />
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
