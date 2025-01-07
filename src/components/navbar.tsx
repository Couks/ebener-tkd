"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "@/assets/favicon.png";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Sobre", href: "/sobre" },
  { name: "Preços", href: "/precos" },
  { name: "Contato", href: "/contato" },
  { name: "Fotos", href: "/galeria" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const currentPath = usePathname();
  console.log(currentPath);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        hasScrolled ? "bg-black/50 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-around">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <div className="flex items-center gap-2">
              <Image alt="Logo" src={logo} className="h-8 w-auto" />
              <span className="text-white font-bold text-xl">Ebener TKD</span>
            </div>
          </a>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  "text-white hover:text-orange-500 transition-colors",
                  "text-md font-medium"
                )}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Menu Button - Mobile */}
          <button
            className="md:hidden text-white bg-transparent p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="text-sm font-medium">MENU</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black z-50">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-8 pt-72">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white text-2xl font-medium"
                onClick={() => setSidebarOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
