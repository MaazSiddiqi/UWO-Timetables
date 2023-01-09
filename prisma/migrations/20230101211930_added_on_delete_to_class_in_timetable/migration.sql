-- DropForeignKey
ALTER TABLE "ClassInTimetable" DROP CONSTRAINT "ClassInTimetable_timetableId_fkey";

-- AddForeignKey
ALTER TABLE "ClassInTimetable" ADD CONSTRAINT "ClassInTimetable_timetableId_fkey" FOREIGN KEY ("timetableId") REFERENCES "Timetable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
