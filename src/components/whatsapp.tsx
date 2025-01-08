"use client";

import React, { useState } from "react";
import whatsapp from "@/assets/whatsapp.png";
import Image from "next/image";
import { motion } from "framer-motion";

const WhatsappButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-12 right-12 z-30"
      initial={{ scale: 0, x: 100 }}
      animate={{ scale: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <div
        className={`absolute -inset-2 bg-green-500 rounded-full opacity-25 ${
          isHovered ? "animate-ping" : ""
        }`}
      />
      <motion.a
        href="https://wa.me/5521981654811"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute right-full mr-3 bg-white rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          <p className="text-gray-800 font-medium">Fale conosco no WhatsApp!</p>
          <div className="absolute right-0 top-1/2 -mt-2 -mr-1 w-0 h-0 border-8 border-transparent border-l-white" />
        </div>
        <div className="rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl">
          <Image
            src={whatsapp}
            alt="WhatsApp"
            className="size-14 rounded-full"
            priority
          />
        </div>
      </motion.a>
    </motion.div>
  );
};

export default WhatsappButton;
