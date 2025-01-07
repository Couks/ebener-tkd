import Image from "next/image";
import logo from "@/assets/favicon.png";

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between w-full bg-secondary-900 text-white p-6 ">
      <div className="flex-shrink-0 bg-white rounded-full p-2">
        <Image src={logo} alt="Ebener TKD Logo" className="size-16" />
      </div>

      <div className="mt-4 text-center text-gray-400">
        <p>&copy; 2024 Ebener TKD. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
