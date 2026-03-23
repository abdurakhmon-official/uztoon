-- CreateEnum
CREATE TYPE "USER_ROLE" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'CREATOR', 'CLIENT');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdById" TEXT,
    "updatedById" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "profileImage" TEXT,
    "region" TEXT,
    "country" TEXT,
    "role" "USER_ROLE" NOT NULL DEFAULT 'CLIENT',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "resetToken" TEXT,
    "resetTokenAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webtoons" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000) NOT NULL,
    "image" TEXT NOT NULL,
    "totalSeries" INTEGER NOT NULL DEFAULT 1,
    "availableSeries" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "creatorId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "deletedById" TEXT,

    CONSTRAINT "webtoons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webtoon_tags" (
    "id" TEXT NOT NULL,
    "webtoonId" VARCHAR(255) NOT NULL,
    "tagId" VARCHAR(255) NOT NULL,

    CONSTRAINT "webtoon_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webtoon_reviews" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "webtoonId" VARCHAR(255) NOT NULL,
    "review" VARCHAR(2000) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "webtoon_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "series" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000) NOT NULL,
    "serie" INTEGER NOT NULL DEFAULT 1,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "creatorId" TEXT NOT NULL,
    "deletedById" TEXT,
    "webtoonId" TEXT NOT NULL,

    CONSTRAINT "series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serie_images" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "image" VARCHAR(255) NOT NULL,
    "filename" VARCHAR(255),
    "order" INTEGER NOT NULL DEFAULT 1,
    "webtoonId" VARCHAR(255) NOT NULL,
    "serieId" VARCHAR(255) NOT NULL,

    CONSTRAINT "serie_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serie_tags" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "webtoonId" VARCHAR(255) NOT NULL,
    "serieId" VARCHAR(255) NOT NULL,
    "tagId" VARCHAR(255) NOT NULL,

    CONSTRAINT "serie_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serie_reviews" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "webtoonId" VARCHAR(255) NOT NULL,
    "serieId" VARCHAR(255) NOT NULL,
    "review" VARCHAR(2000) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "serie_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "webtoons_id_creatorId_key" ON "webtoons"("id", "creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "webtoon_tags_webtoonId_tagId_key" ON "webtoon_tags"("webtoonId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "series_id_creatorId_key" ON "series"("id", "creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "serie_tags_serieId_tagId_key" ON "serie_tags"("serieId", "tagId");

-- AddForeignKey
ALTER TABLE "webtoons" ADD CONSTRAINT "webtoons_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webtoons" ADD CONSTRAINT "webtoons_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webtoon_tags" ADD CONSTRAINT "webtoon_tags_webtoonId_fkey" FOREIGN KEY ("webtoonId") REFERENCES "webtoons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webtoon_tags" ADD CONSTRAINT "webtoon_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webtoon_reviews" ADD CONSTRAINT "webtoon_reviews_webtoonId_fkey" FOREIGN KEY ("webtoonId") REFERENCES "webtoons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webtoon_reviews" ADD CONSTRAINT "webtoon_reviews_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "series" ADD CONSTRAINT "series_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "series" ADD CONSTRAINT "series_webtoonId_fkey" FOREIGN KEY ("webtoonId") REFERENCES "webtoons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serie_images" ADD CONSTRAINT "serie_images_webtoonId_fkey" FOREIGN KEY ("webtoonId") REFERENCES "webtoons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serie_images" ADD CONSTRAINT "serie_images_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serie_tags" ADD CONSTRAINT "serie_tags_webtoonId_fkey" FOREIGN KEY ("webtoonId") REFERENCES "webtoons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serie_tags" ADD CONSTRAINT "serie_tags_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serie_tags" ADD CONSTRAINT "serie_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serie_reviews" ADD CONSTRAINT "serie_reviews_webtoonId_fkey" FOREIGN KEY ("webtoonId") REFERENCES "webtoons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serie_reviews" ADD CONSTRAINT "serie_reviews_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serie_reviews" ADD CONSTRAINT "serie_reviews_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
