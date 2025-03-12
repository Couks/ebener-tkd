"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Menu } from "lucide-react";
import { Instagram } from "lucide-react";
import { TbBrandTiktok } from "react-icons/tb";

import logo from "@/assets/favicon.png";
import { motion, useAnimation } from "framer-motion";
import { Button } from "./ui/button";

const navigation = [
  {
    name: "Home",
    href: "/",
    ariaLabel: "Ir para a página incial",
  },
  { name: "Sobre", href: "/sobre", ariaLabel: "Ir para a página sobre" },
  { name: "Planos", href: "/planos", ariaLabel: "Ir para a página de planos" },
  {
    name: "Contato",
    href: "/contato",
    ariaLabel: "Ir para a página de contato",
  },
  { name: "Fotos", href: "/galeria", ariaLabel: "Ir para a galeria de fotos" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
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
  }, [hasScrolled, controls]);

  return (
    <motion.nav
      initial={{ opacity: 1, y: 0 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className={`fixed w-screen z-40 transition-all duration-300 ${
        hasScrolled ? "bg-black/50 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-around">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <div className="flex items-center gap-2">
              <Image
                alt="Logo"
                src={logo}
                loading="lazy"
                className={`size-${
                  hasScrolled ? "8" : "24"
                } transition-all duration-300`}
              />
              <span
                className={`text-white hover:text-primary-500 transition-colors font-bold text-${
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
                aria-label={item.ariaLabel}
                className={classNames(
                  "text-white hover:text-primary-500 transition-colors",
                  "text-md font-medium "
                )}
              >
                {item.name}
              </a>
            ))}
            {/* Instagram Link */}
            <div className="flex items-center gap-4 ml-12">
              <a
                href="https://www.instagram.com/ebenertkd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ir para o Instagram"
                className="text-white hover:text-primary-500 transition-colors text-md font-medium"
              >
                <Instagram />
              </a>
              <a
                href="https://www.tiktok.com/@ebener.tkd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir Tiktok"
                className="text-white hover:text-primary-500 transition-colors text-md font-medium"
              >
                <TbBrandTiktok className="size-7 text-white hover:text-primary-500 transition-colors text-md font-medium" />
              </a>
            </div>
          </div>

          {/* Menu Button - Mobile */}
          <Button
            className="md:hidden text-white bg-transparent p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Abrir menu"
          >
            <span className="text-sm font-medium">
              <Menu />
              <span className="hidden">Menu</span>
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {sidebarOpen && (
        <div className="inset-0 fixed h-screen bg-black z-50">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white"
              aria-label="Fechar menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-6 justify-center">
            <Image
              alt="Logo"
              src={logo}
              loading="lazy"
              width={100}
              height={100}
              className="transition-all duration-300 mb-12"
            />
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                aria-label={item.ariaLabel}
                className="text-white text-2xl font-medium"
                onClick={() => setSidebarOpen(false)}
              >
                {item.name}
              </a>
            ))}
            {/* Social Links */}
            <div className="flex gap-3 items-center mt-24">
              <a
                href="https://www.instagram.com/ebenertkd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ir para o Instagram"
                className="text-white hover:text-primary-500 transition-colors text-md font-medium"
              >
                <Instagram />
              </a>
              <a
                href="https://www.tiktok.com/@ebener.tkd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir Tiktok"
                className="text-white hover:text-primary-500 transition-colors text-md font-medium"
              >
                <TbBrandTiktok className="size-7 text-white hover:text-primary-500 transition-colors text-md font-medium" />
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
