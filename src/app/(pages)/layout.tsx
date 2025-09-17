import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar";
import WhatsappButton from "@/components/whatsapp";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="justify-between h-max bg-black">
      <NavBar />
      <WhatsappButton />
      <main>{children}</main>
      <Analytics />
      <Footer />
    </div>
  );
}
