import { Course } from "@prisma/client"

interface CourseListItemProps {
  course: Course
  onSelect: (course: Course) => void
}

export default function CourseListItem({
  course,
  onSelect,
}: CourseListItemProps) {
  // TODO: add btn to expand on click to reveal course.details
  return (
    <div
      onClick={() => onSelect(course)}
      className="cursor-pointer rounded-xl shadow-md p-3 btn hover:bg-gray-50"
    >
      <h1 className="font-semibold">
        {course.subjectCode.slice(0, 4)} {course.level}
        <span className="">{course.term}</span>
      </h1>
      <h2 className="font-light italic text-sm">{course.title}</h2>
    </div>
  )
}
