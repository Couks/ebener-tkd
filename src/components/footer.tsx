"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Instagram,
  MapPin,
  Mail,
  Phone,
  Clock,
  ChevronRight,
} from "lucide-react";
import { TbBrandTiktok, TbBrandWhatsapp } from "react-icons/tb";
import { FaDev } from "react-icons/fa";

export function Footer() {
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      if (currentDate.getMonth() === 0 && currentDate.getDate() === 1) {
        setAnoAtual(currentDate.getFullYear());
      }
    }, 86400000); // 86400000 é o número de milissegundos em um dia
    return () => clearInterval(interval);
  }, []);

  // Quick links for navigation
  const quickLinks = [
    { name: "Início", href: "/" },
    { name: "Sobre", href: "/sobre" },
    { name: "Planos", href: "/planos" },
    { name: "Fotos", href: "/galeria" },
    { name: "Área do Aluno", href: "/login" },
    { name: "Contato", href: "/contato" },
  ];

  // Services links
  const servicesLinks = [
    { name: "Aulas para Crianças", href: "/servicos#criancas" },
    { name: "Aulas para Adultos", href: "/servicos#adultos" },
    { name: "Treinos Personalizados", href: "/servicos#personalizados" },
    { name: "Competições", href: "/servicos#competicoes" },
  ];

  return (
    <footer className="bg-gradient-to-b from-secondary-900 to-secondary-950 text-white pt-12 pb-6 mt-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-4 text-white relative inline-block">
                Ebener TKD
                <span className="absolute -bottom-1 left-0 w-12 h-1 bg-primary-500"></span>
              </h3>
            </div>
            <p className="text-gray-300 mb-6 text-sm">
              Academia de Taekwondo na Ilha do Governador, liderada pelo mestre
              Ebener dos Santos Pinto, oferecendo treinamento de qualidade desde
              2010.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.instagram.com/ebenertkd/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-800 hover:bg-primary-500 p-2 rounded-full transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@ebener.tkd"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-800 hover:bg-primary-500 p-2 rounded-full transition-colors duration-300"
                aria-label="TikTok"
              >
                <TbBrandTiktok size={18} />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=5521981654811"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-800 hover:bg-primary-500 p-2 rounded-full transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <TbBrandWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white relative inline-block">
              Links Rápidos
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-primary-500"></span>
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-500 transition-colors duration-200 flex items-center group"
                  >
                    <ChevronRight
                      size={14}
                      className="mr-2 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white relative inline-block">
              Contato
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-primary-500"></span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="mr-3 text-primary-500 mt-1 flex-shrink-0"
                />
                <span className="text-gray-300">
                  Rua Abélia 197 - Jardim Guanabara, Ilha do Governador - Rio de
                  Janeiro
                </span>
              </li>
              <li className="flex items-center">
                <Phone
                  size={18}
                  className="mr-3 text-primary-500 flex-shrink-0"
                />
                <a
                  href="tel:+5521981654811"
                  className="text-gray-300 hover:text-primary-500 transition-colors duration-200"
                >
                  (21) 98165-4811
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {anoAtual} Ebener TKD. Todos os direitos reservados.
          </div>
          <div className="text-gray-400 text-sm flex items-center">
            Desenvolvido por
            <a
              href="https://github.com/Couks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-primary-500 transition-colors ml-1 flex items-center"
            >
              Matheus Castro
              <FaDev className="ml-1" size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
