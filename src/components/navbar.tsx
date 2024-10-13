"use client";

import { useState } from "react";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "@/assets/favicon.png";
import { usePathname } from "next/navigation";
import {
  DollarSign,
  Facebook,
  Gem,
  HomeIcon,
  Images,
  Instagram,
  MessageCircle,
  MessageCircleMore,
  Phone,
  Users,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: <HomeIcon size={18} /> },
  { name: "Sobre", href: "/sobre", icon: <Users size={18} /> },
  { name: "Galeria", href: "/galeria", icon: <Images size={18} /> },
  { name: "Preços", href: "/precos", icon: <Gem size={18} /> },
  { name: "Contato", href: "/contato", icon: <Phone size={18} /> },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentPath = usePathname();

  return (
    <nav className="bg-secondary-500 border-gray-300 w-full shadow-primary-500 shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center">
            <div className="flex-shrink-0 bg-white rounded-full p-1">
              <Image alt="Logo" src={logo} className="size-14" />
            </div>
          </a>

          <div className="hidden md:flex space-x-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  currentPath === item.href
                    ? "text-primary-500 rounded"
                    : "hover:text-primary-500 hover:underline",
                  "flex gap-2 px-2 text-sm md:text-lg font-semibold items-center text-white"
                )}
              >
                <i>{item.icon}</i>
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="relative inline-flex items-center justify-center bg-secondary-600 p-2 text-gray-400 hover:bg-secondary-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-xl"
            >
              <span className="sr-only">Open menu</span>
              {sidebarOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-gray-800 p-4 flex flex-col transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* Botão para fechar a sidebar */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="self-end text-gray-300 hover:text-white"
        >
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>

        <div className="space-y-6 mt-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                currentPath === item.href
                  ? "bg-primary-500 text-white rounded"
                  : "text-gray-300 hover:bg-primary-500 hover:text-white rounded",
                "flex items-center px-3 py-2 text-lg font-bold" // Aumentado para text-lg
              )}
              onClick={() => setSidebarOpen(false)} // Fecha a sidebar ao clicar
            >
              {item.icon} {/* Ícone adicionado */}
              <span className="ml-2">{item.name}</span>{" "}
              {/* Espaço entre ícone e texto */}
            </a>
          ))}
        </div>

        {/* Informações de contato */}
        <div className="bottom-0 mt-auto">
          <div className="flex flex-col space-y-2 mt-2">
            <div className="flex justify-around mt-2">
              <a
                href="https://www.instagram.com/ebenertkd/"
                className="text-gray-300 hover:text-white"
                target="_blank"
              >
                <Instagram />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=5521981654811&text&type=phone_number&app_absent=0" // Substitua pelo seu número
                className="text-gray-300 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircleMore />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
