import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
// import { QueryProvider } from "@/lib/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
// import SessionProvider from "@/lib/providers/session-provider";

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Taekwondo na Ilha do Governador | Ebener TKD",
  description: "Aulas para todas as idades com professores certificados!",
  openGraph: {
    type: "website",
    url: "https://ebenertkd.com.br/",
    title: "Taekwondo na Ilha do Governador | Ebener TKD",
    description: "Aulas para todas as idades com professores certificados!",
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
    <html lang="pt-br">
      <head>
        <title>Taekwondo na Ilha do Governador - Ebener TKD</title>
        <meta
          name="google-site-verification"
          content="w2-CizVqPMDEzsXVpuDM0f7CJ8zMnEG5sFi5MjvOrEk"
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Aulas para todas as idades com professores certificados!"
        />
      </head>
      <body className={chakraPetch.className}>
        {/* <SessionProvider> */}
          {/* <QueryProvider> */}
            {children}
            <Toaster />
          {/* </QueryProvider> */}
        {/* </SessionProvider> */}
      </body>
      {/* <GoogleAnalytics gaId="G-L15P6FXYCS" /> */}
    </html>
  );
}
