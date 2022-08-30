-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_subjectCode_fkey" FOREIGN KEY ("subjectCode") REFERENCES "Subject"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
