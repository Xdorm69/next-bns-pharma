/*
  Warnings:

  - You are about to drop the column `ProductType` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `subscribed` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Testimonials` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `type` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "ProductType",
DROP COLUMN "type",
ADD COLUMN     "type" "ProductTypes" NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "ProductCatType" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscribed";

-- DropTable
DROP TABLE "Testimonials";
