import { Instagram } from "lucide-react";
import { TbBrandWhatsapp } from "react-icons/tb";

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between w-full bg-secondary-900 text-white px-4 py-4 md:px-6 md:py-4">
      <div className="flex items-center gap-4 flex-row md:gap-4">
        <a
          href="https://www.instagram.com/ebenertkd/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-primary-500 transition-colors text-md font-medium"
          aria-label="Instagram"
        >
          <Instagram />
        </a>
        <a
          href="https://api.whatsapp.com/send/?phone=5521981654811&text&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-primary-500 transition-colors text-md font-medium"
          aria-label="WhatsApp"
        >
          <TbBrandWhatsapp className="size-7 text-white hover:text-primary-500 transition-colors text-md font-medium" />
        </a>
      </div>
      <div className="text-center text-gray-400 mt-4">
        <p>&copy; 2024 Ebener TKD. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
