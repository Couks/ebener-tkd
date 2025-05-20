import ReciboForm from "@/components/recibos/recibo-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noimageindex: true,
    "max-snippet": -1,
    "max-image-preview": "none",
    "max-video-preview": -1,
  },
};

export default function Recibos() {
  return (
    <main className="container mx-auto py-8 px-4">
      <ReciboForm />
    </main>
  )
}
