import type { Metadata } from "next";
import { Chakra_Petch, Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
// import { QueryProvider } from "@/lib/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
// import SessionProvider from "@/lib/providers/session-provider";

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-chakra-petch",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Academia de Luta na Ilha do Governador | Aulas de Taekwondo - Ebener TKD",
  description:
    "Procurando uma academia de luta no RJ? A Ebener TKD oferece aulas de Taekwondo para todas as idades. Aumente sua disciplina, confiança e preparo físico. Agende uma aula experimental!",
  openGraph: {
    type: "website",
    url: "https://ebenertkd.com.br/",
    title:
      "Academia de Luta na Ilha do Governador | Aulas de Taekwondo - Ebener TKD",
    description:
      "Procurando uma academia de luta no RJ? A Ebener TKD oferece aulas de Taekwondo para todas as idades. Aumente sua disciplina, confiança e preparo físico. Agende uma aula experimental!",
    images: [
      {
        url: "https://ebenertkd.com.br/favicon.ico",
        width: 500,
        height: 500,
        alt: "Logo da Ebener TKD",
      },
    ],
  },
  keywords: [
    "Academia de Luta",
    "Arte Marcial",
    "Defesa Pessoal",
    "Taekwondo",
    "Academia",
    "Ilha do Governador",
    "Aulas de Taekwondo",
    "Treinamento de Taekwondo",
    "Taekwondo na Ilha do Governador",
    "Aulas de artes marciais RJ",
    "Treinamento de Taekwondo para iniciantes",
    "Academia de artes marciais no Rio de Janeiro",
    "Taekwondo para crianças e adultos",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${chakraPetch.variable}`}>
      <body>
        {children}
        <Toaster />
      </body>
      {/* <GoogleAnalytics gaId="G-L15P6FXYCS" /> */}
    </html>
  );
}
