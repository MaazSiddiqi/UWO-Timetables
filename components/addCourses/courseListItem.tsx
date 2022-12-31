import { Course } from "@prisma/client"
import { Dispatch, SetStateAction, useMemo } from "react"

interface CourseListItemProps {
  course: Course
  onSelect: (course: Course) => void
}

export default function CourseListItem({
  course,
  onSelect,
}: CourseListItemProps) {
  return (
    <div
      onClick={() => onSelect(course)}
      className="cursor-pointer rounded-xl shadow-md p-3 btn"
    >
      <h1 className="font-semibold">
        {course.subjectCode.slice(0, 4)} {course.level}
        <span className="">{course.term}</span>
        {/* <span className="text-xs text-slate-300"> ({components.length})</span> */}
      </h1>
      <h2 className="font-light italic text-sm">{course.title}</h2>
    </div>
  )
}
