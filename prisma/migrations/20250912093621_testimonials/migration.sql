-- CreateTable
CREATE TABLE "public"."Testimonials" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Testimonials_pkey" PRIMARY KEY ("id")
);
