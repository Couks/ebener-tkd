"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Menu } from "lucide-react";

import logo from "@/assets/favicon.png";
import { usePathname } from "next/navigation";
import { motion, useAnimation } from "framer-motion";

const navigation = [
  { name: "Sobre", href: "/sobre" },
  { name: "Planos", href: "/planos" },
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
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    controls.start({ opacity: 1, y: hasScrolled ? 0 : 0 });
  }, [hasScrolled]);

  return (
    <motion.nav
      initial={{ opacity: 1, y: 0 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-40 transition-all duration-300 ${
        hasScrolled ? "bg-black/50 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-around">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <div className="flex items-center gap-2">
              <Image
                alt="Logo"
                src={logo}
                className={`size-${
                  hasScrolled ? "8" : "24"
                } transition-all duration-300`}
              />
              <span
                className={`text-white font-bold text-${
                  hasScrolled ? "xl" : "2xl md:4xl"
                } transition-all duration-200`}
              >
                Ebener TKD
              </span>
            </div>
          </a>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  "text-white hover:text-primary-500 transition-colors",
                  "text-md font-medium "
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
            <span className="text-sm font-medium">
              <Menu />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {sidebarOpen && (
        <div className="inset-0 fixed h-screen bg-black z-50">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-8 justify-center h-full">
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
    </motion.nav>
  );
}
