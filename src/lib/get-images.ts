import fs from "fs";
import path from "path";

export function getImages() {
  const imagesDirectory = path.join(process.cwd(), "src/assets/images");
  const fileNames = fs.readdirSync(imagesDirectory);
  return fileNames.map((fileName) => ({
    src: `/assets/images/${fileName}`,
    alt: `Image ${fileName.split(".")[0]}`,
  }));
}
