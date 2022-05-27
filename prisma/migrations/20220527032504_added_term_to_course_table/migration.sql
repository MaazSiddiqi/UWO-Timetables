/*
  Warnings:

  - The `detail` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `term` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Timetable" DROP CONSTRAINT "Timetable_profileId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "term" TEXT NOT NULL,
DROP COLUMN "detail",
ADD COLUMN     "detail" TEXT[];

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
