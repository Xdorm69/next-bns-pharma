-- CreateEnum
CREATE TYPE "public"."userRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "public"."ProductTypes" AS ENUM ('TABLET', 'SYRUP', 'CAPSULE', 'INJECTION', 'OINTMENT', 'DROPS', 'OTHER');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" "public"."userRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,
    "subscribed" BOOLEAN NOT NULL DEFAULT false,
    "provider" TEXT NOT NULL DEFAULT 'app-auth',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "ProductType" "public"."ProductTypes" NOT NULL,
    "type" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "stock" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "category" TEXT,
    "ingredients" TEXT,
    "manufacturer" TEXT,
    "expiryDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "thumbnail" TEXT,
    "rating" DOUBLE PRECISION,
    "reviewsCount" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
