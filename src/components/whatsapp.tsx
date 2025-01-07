import React from "react";

import whatsapp from "@/assets/whatsapp.png";
import Image from "next/image";

const WhatsappButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/5521981654811"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-2 z-50 animate-bounce"
    >
      <Image src={whatsapp} alt="WhatsApp" className="size-12 rounded-full" />
    </a>
  );
};

export default WhatsappButton;
