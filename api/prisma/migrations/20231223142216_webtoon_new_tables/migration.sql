/*
  Warnings:

  - A unique constraint covering the columns `[id,webtoonId]` on the table `series` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "series_id_creatorId_key";

-- CreateTable
CREATE TABLE "following_webtoons" (
    "id" TEXT NOT NULL,
    "webtoonId" VARCHAR(255) NOT NULL,
    "userId" VARCHAR(255) NOT NULL,

    CONSTRAINT "following_webtoons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webtoon_votes" (
    "id" TEXT NOT NULL,
    "vote" INTEGER NOT NULL DEFAULT 0,
    "webtoonId" VARCHAR(255) NOT NULL,
    "userId" VARCHAR(255) NOT NULL,

    CONSTRAINT "webtoon_votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "following_webtoons_userId_webtoonId_key" ON "following_webtoons"("userId", "webtoonId");

-- CreateIndex
CREATE UNIQUE INDEX "webtoon_votes_userId_webtoonId_key" ON "webtoon_votes"("userId", "webtoonId");

-- CreateIndex
CREATE UNIQUE INDEX "series_id_webtoonId_key" ON "series"("id", "webtoonId");

-- AddForeignKey
ALTER TABLE "following_webtoons" ADD CONSTRAINT "following_webtoons_webtoonId_fkey" FOREIGN KEY ("webtoonId") REFERENCES "webtoons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "following_webtoons" ADD CONSTRAINT "following_webtoons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webtoon_votes" ADD CONSTRAINT "webtoon_votes_webtoonId_fkey" FOREIGN KEY ("webtoonId") REFERENCES "webtoons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webtoon_votes" ADD CONSTRAINT "webtoon_votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
