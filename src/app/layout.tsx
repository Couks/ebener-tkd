import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import WhatsappButton from "@/components/whatsapp";

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
          content="t0CgPYcarDBQ5d6Gs52Bl36WmRq3QdmyFC9D"
        />
      </head>
      <body className={chakraPetch.className}>
        <div className="flex flex-col justify-between h-max bg-secondary-950">
          <main>
            <NavBar />
            <WhatsappButton />
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
