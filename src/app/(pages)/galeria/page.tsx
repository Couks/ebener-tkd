import Image from "next/image";

const importAll = (r: object) => (r as any).keys().map(r);
const images = importAll(
  (require as any).context("@/assets/images", false, /\.(png|jpe?g|svg)$/)
);

const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function Galeria() {
  const shuffledImages = shuffleArray(images.slice());

  return (
    <div className="container py-8">
      {/* Título */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Galeria de Imagens</h1>
        <h2 className="text-lg text-gray-600">
          Confira nossa coleção de imagens
        </h2>
      </div>

      {/* Galeria */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {shuffledImages.map((image: any, index: number) => (
          <div key={index} className="mb-4 break-inside-avoid group">
            <Image
              src={image.default}
              alt={`Image ${index + 1}`}
              className="w-full h-auto object-cover rounded-lg transition-transform duration-300 ease-in-out md:group-hover:scale-125"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
