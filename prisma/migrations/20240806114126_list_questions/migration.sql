/*
  Warnings:

  - Added the required column `createdById` to the `List` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedById` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "List" ADD COLUMN     "createdById" UUID NOT NULL,
ADD COLUMN     "updatedById" UUID NOT NULL,
ALTER COLUMN "isDeleted" SET DEFAULT false;

-- CreateTable
CREATE TABLE "Question" (
    "questionID" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "createdById" UUID NOT NULL,
    "updatedById" UUID NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("questionID")
);

-- CreateTable
CREATE TABLE "ListQuestion" (
    "id" UUID NOT NULL,
    "listID" UUID NOT NULL,
    "questionID" UUID NOT NULL,
    "isStarred" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ListQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ListQuestion_listID_questionID_key" ON "ListQuestion"("listID", "questionID");

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListQuestion" ADD CONSTRAINT "ListQuestion_listID_fkey" FOREIGN KEY ("listID") REFERENCES "List"("listID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListQuestion" ADD CONSTRAINT "ListQuestion_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Question"("questionID") ON DELETE RESTRICT ON UPDATE CASCADE;
