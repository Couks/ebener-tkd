import Image from "next/image";
import image1 from "@/assets/images/image1.jpeg";
import image2 from "@/assets/images/image2.jpeg";
import image3 from "@/assets/images/image3.jpeg";
import image4 from "@/assets/images/image4.jpeg";
import image5 from "@/assets/images/image5.jpeg";
import image6 from "@/assets/images/image6.jpeg";
import image7 from "@/assets/images/image7.jpeg";
import image8 from "@/assets/images/image8.jpeg";
import image9 from "@/assets/images/image9.jpeg";
import image10 from "@/assets/images/image10.jpeg";
import image11 from "@/assets/images/image11.jpeg";
import image12 from "@/assets/images/image12.jpeg";
import image13 from "@/assets/images/image13.jpeg";
import image14 from "@/assets/images/image14.jpeg";
import image15 from "@/assets/images/image15.jpeg";
import image16 from "@/assets/images/image16.jpeg";

const images = [
  {
    src: image1,
    alt: "Image 1",
  },
  {
    src: image2,
    alt: "Image 2",
  },
  {
    src: image3,
    alt: "Image 3",
  },
  {
    src: image4,
    alt: "Image 4",
  },
  {
    src: image5,
    alt: "Image 5",
  },
  {
    src: image6,
    alt: "Image 6",
  },
  {
    src: image7,
    alt: "Image 7",
  },
  {
    src: image8,
    alt: "Image 8",
  },
  {
    src: image9,
    alt: "Image 9",
  },
  {
    src: image10,
    alt: "Image 10",
  },
  {
    src: image11,
    alt: "Image 11",
  },
  {
    src: image12,
    alt: "Image 12",
  },
  {
    src: image13,
    alt: "Image 13",
  },
  {
    src: image14,
    alt: "Image 14",
  },
  {
    src: image15,
    alt: "Image 15",
  },
  {
    src: image16,
    alt: "Image 16",
  },
];

export default function Galeria() {
  return (
    <div className="container  py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div key={index} className="w-full min-h-64 relative">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            objectFit="cover"
            className="h-auto max-w-full rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}
