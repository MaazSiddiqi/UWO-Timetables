/*
  Warnings:

  - A unique constraint covering the columns `[classNumber]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - Made the column `classNumber` on table `Class` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "classNumber" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Class_classNumber_key" ON "Class"("classNumber");
