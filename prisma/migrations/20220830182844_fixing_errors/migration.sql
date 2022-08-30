/*
  Warnings:

  - The primary key for the `Subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Subject` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Subject_code_key";

-- AlterTable
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Subject_pkey" PRIMARY KEY ("code");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_subjectCode_fkey" FOREIGN KEY ("subjectCode") REFERENCES "Subject"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
