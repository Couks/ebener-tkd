import React from "react";

import whatsapp from "@/assets/whatsapp.png";
import Image from "next/image";

const WhatsappButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/5521981654811" // Substitua pelo link correto para o WhatsApp
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-2"
    >
      <Image src={whatsapp} alt="WhatsApp" className="size-20 rounded-full" />
    </a>
  );
};

export default WhatsappButton;
