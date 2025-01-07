import Image from "next/image";
import logo from "@/assets/favicon.png";

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between w-full bg-secondary-900 text-white px-6 py-4 ">
      <div className="text-center text-gray-400">
        <p>&copy; 2024 Ebener TKD. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
