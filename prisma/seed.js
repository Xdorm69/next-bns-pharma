const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const sampleImages = [
    "https://source.unsplash.com/400x400/?medicine",
    "https://source.unsplash.com/400x400/?pills",
    "https://source.unsplash.com/400x400/?pharmacy",
    "https://source.unsplash.com/400x400/?drugs",
    "https://source.unsplash.com/400x400/?capsules",
    "https://source.unsplash.com/400x400/?tablet",
    "https://source.unsplash.com/400x400/?syrup",
  ];

  const getRandomImage = () =>
    sampleImages[Math.floor(Math.random() * sampleImages.length)];

  const pcdProducts = Array.from({ length: 10 }).map((_, i) => ({
    name: `PCD Product ${i + 1}`,
    description: `Description for PCD Product ${i + 1}`,
    price: Math.floor(Math.random() * 500) + 50,
    type: "PCD",
    image: getRandomImage(),
    thumbnail: getRandomImage(),
  }));

  const thirdPartyProducts = Array.from({ length: 10 }).map((_, i) => ({
    name: `ThirdParty Product ${i + 1}`,
    description: `Description for ThirdParty Product ${i + 1}`,
    price: Math.floor(Math.random() * 800) + 100,
    type: "ThirdParty",
    image: getRandomImage(),
    thumbnail: getRandomImage(),
  }));

  await prisma.product.createMany({
    data: [...pcdProducts, ...thirdPartyProducts],
  });

  console.log("✅ Seed data inserted successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
