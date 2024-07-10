import Image from "next/image";
import logo from "@/assets/images/image8.jpeg";

export default function Sobre() {
  return (
    <main className="h-auto">
      <section className="flex items-center justify-center relative">
        <Image src={logo} alt="" className="w-full h-30 bg-cover" />
        <div className="container mx-auto px-8 absolute items-center justityfy-center flex flex-col text-center">
          <h1 className="text-white font-bold text-4xl">Quem somos?</h1>
          <span className="text-gray-200 font-bold text-xl">
            Conheça a maior academia de Taekwondo da Ilha do Governador
          </span>
          <Button>Conheça a Ebener TKD</Button>
        </div>
      </section>
      <div></div>
    </main>
  );
}
