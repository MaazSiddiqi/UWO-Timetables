/*
  Warnings:

  - The primary key for the `Subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[code]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Subject` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_pkey" CASCADE,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Subject_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_code_key" ON "Subject"("code");
