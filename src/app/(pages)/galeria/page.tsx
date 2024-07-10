import Image from "next/image";

const images = [
  {
    src: "/assets/images/image1.jpeg",
    alt: "Image 1",
  },
  {
    src: "/assets/images/image2.jpeg",
    alt: "Image 2",
  },
  {
    src: "/assets/images/image3.jpeg",
    alt: "Image 3",
  },
  {
    src: "/assets/images/image4.jpeg",
    alt: "Image 4",
  },
  {
    src: "/assets/images/image5.jpeg",
    alt: "Image 5",
  },
  {
    src: "/assets/images/image6.jpeg",
    alt: "Image 6",
  },
  {
    src: "/assets/images/image7.jpeg",
    alt: "Image 7",
  },
  {
    src: "/assets/images/image8.jpeg",
    alt: "Image 8",
  },
  {
    src: "/assets/images/image9.jpeg",
    alt: "Image 9",
  },
  {
    src: "/assets/images/image10.jpeg",
    alt: "Image 10",
  },
  {
    src: "/assets/images/image11.jpeg",
    alt: "Image 11",
  },
  {
    src: "/assets/images/image12.jpeg",
    alt: "Image 12",
  },
  {
    src: "/assets/images/image13.jpeg",
    alt: "Image 13",
  },
  {
    src: "/assets/images/image14.jpeg",
    alt: "Image 14",
  },
  {
    src: "/assets/images/image15.jpeg",
    alt: "Image 15",
  },
  {
    src: "/assets/images/image16.jpeg",
    alt: "Image 16",
  },
];

export default function Galeria() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div key={index} className="w-full h-64 relative">
          <Image
            src={image.src}
            alt={image.alt}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ))}
    </div>
  );
}
