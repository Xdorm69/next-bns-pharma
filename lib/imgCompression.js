import sharp from "sharp";
import fs from "fs/promises";

export const compressImage = async (inputPath, outputPath) => {
  let quality = 80;
  let buffer;

  for (let i = 0; i < 5; i++) {
    buffer = await sharp(inputPath)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer();

    const sizeKB = buffer.length / 1024;

    if (sizeKB > 400) quality -= 10;
    else if (sizeKB < 300) quality += 5;
    else break;
  }

  await fs.writeFile(outputPath.replace(/\.\w+$/, ".webp"), buffer);
};

async function main() {
  await compressImage("./public/auth/bg.jpg", "./public/auth/bg.webp");
}

main();

