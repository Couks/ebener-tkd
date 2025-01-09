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
  title: "Ebener TKD",
  description: "Academia de TaeKwonDo na Ilha do Governador",
  openGraph: {
    type: "website",
    url: "https://ebener-tkd.com.br",
    title: "Ebener TKD",
    description: "Academia de TaeKwonDo na Ilha do Governador",
    images: [
      {
        url: "https://ebener-tkd.com.br/logo.png",
        width: 800,
        height: 600,
        alt: "Logo da Ebener TKD",
      },
    ],
  },
  keywords: ["Taekwondo", "Academia", "Ilha do Governador"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <meta
          name="google-site-verification"
          content="w2-CizVqPMDEzsXVpuDM0f7CJ8zMnEG5sFi5MjvOrEk"
        />
        <meta name="robots" content="index, nofollow" />
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
