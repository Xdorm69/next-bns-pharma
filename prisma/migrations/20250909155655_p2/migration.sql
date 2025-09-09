/*
  Warnings:

  - Changed the type of `type` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."ProductCatType" AS ENUM ('PCD', 'THIRDPARTY');

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "type",
ADD COLUMN     "type" "public"."ProductCatType" NOT NULL;
