/*
  Warnings:

  - You are about to drop the column `tags` on the `List` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "List" DROP COLUMN "tags";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleId" VARCHAR(255);

-- CreateTable
CREATE TABLE "Tag" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListTag" (
    "id" UUID NOT NULL,
    "listID" UUID NOT NULL,
    "tagID" UUID NOT NULL,

    CONSTRAINT "ListTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ListTag_listID_tagID_key" ON "ListTag"("listID", "tagID");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- AddForeignKey
ALTER TABLE "ListTag" ADD CONSTRAINT "ListTag_listID_fkey" FOREIGN KEY ("listID") REFERENCES "List"("listID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListTag" ADD CONSTRAINT "ListTag_tagID_fkey" FOREIGN KEY ("tagID") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
