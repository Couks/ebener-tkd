import Image from "next/image";
import quemSomos from "@/assets/images/image8.jpeg";
import { Button } from "@/components/ui/button";

export default function Sobre() {
  return (
    <main className="w-full">
      <section className="relative w-full h-96">
        <Image
          src={quemSomos}
          alt="Quem Somos"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Quem somos?</h1>
          <p className="text-xl md:text-2xl font-medium mb-4 ">
            Conheça a maior academia de Taekwondo na Ilha do Governador
          </p>
          <Button>Conheça a Ebener TKD</Button>
        </div>
      </section>
      <section className="container mx-auto px-8 py-12 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-500">
          Nossa História
        </h2>
        <p className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus
          officiis earum voluptate excepturi vero reprehenderit saepe quos
          voluptatem consequuntur quis dolorum debitis, quasi aperiam possimus,
          dolores aliquid repudiandae maxime delectus.
        </p>
        <p className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus
          officiis earum voluptate excepturi vero reprehenderit saepe quos
          voluptatem consequuntur quis dolorum debitis, quasi aperiam possimus,
          dolores aliquid repudiandae maxime delectus.
        </p>
        <p className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus
          officiis earum voluptate excepturi vero reprehenderit saepe quos
          voluptatem consequuntur quis dolorum debitis, quasi aperiam possimus,
          dolores aliquid repudiandae maxime delectus.
        </p>
        <p className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus
          officiis earum voluptate excepturi vero reprehenderit saepe quos
          voluptatem consequuntur quis dolorum debitis, quasi aperiam possimus,
          dolores aliquid repudiandae maxime delectus.
        </p>
      </section>
    </main>
  );
}
