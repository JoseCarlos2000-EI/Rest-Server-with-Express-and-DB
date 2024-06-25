-- CreateTable
CREATE TABLE "heroe" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,

    CONSTRAINT "heroe_pkey" PRIMARY KEY ("id")
);
