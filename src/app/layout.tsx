import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import WhatsappButton from "@/components/whatsapp";
import { Analytics } from "@vercel/analytics/next";

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ebener TKD - Academia de Taekwondo na Ilha do Governador",
  description:
    "A Ebener TKD é uma academia de Taekwondo localizada na Ilha do Governador, Rio de Janeiro. Oferecemos aulas para todas as idades e níveis.",
  openGraph: {
    type: "website",
    url: "https://ebenertkd.vercel.app/",
    title: "Ebener TKD - Academia de Taekwondo na Ilha do Governador",
    description:
      "A Ebener TKD é uma academia de Taekwondo localizada na Ilha do Governador, Rio de Janeiro. Oferecemos aulas para todas as idades e níveis.",
    images: [
      {
        url: "https://ebenertkd.vercel.app/favicon.ico",
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
        <title>Ebener TKD - Academia de Taekwondo na Ilha do Governador</title>
        <meta
          name="google-site-verification"
          content="w2-CizVqPMDEzsXVpuDM0f7CJ8zMnEG5sFi5MjvOrEk"
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="A Ebener TKD é uma academia de Taekwondo localizada na Ilha do Governador, Rio de Janeiro. Oferecemos aulas para todas as idades e níveis."
        />
        <meta
          name="keywords"
          content="Taekwondo, Academia, Ilha do Governador, Aulas de Taekwondo, Treinamento de Taekwondo"
        />
      </head>
      <body className={chakraPetch.className}>
        <div className="justify-between h-max bg-secondary-950">
          <main>
            <NavBar />
            <WhatsappButton />
            {children}
            <Analytics />
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
