import { useActiveTT } from "@hooks/activeTT"
import { Class, Course } from "@prisma/client"
import { useEffect, useMemo, useState } from "react"
import CourseClass from "./CourseClass"

const closeSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

interface ExpandCourseProps {
  course: Course
  deselect: () => void
  onAdd: (courseClass: Class) => void
  onRemove: (courseClass: Class) => void
}

export default function ExpandCourse({
  course,
  deselect,
  onAdd,
  onRemove,
}: ExpandCourseProps) {
  const [classes, setClasses] = useState<Class[]>([])

  // TODO: add btn to expand coures details
  const { title, subjectCode, level, term, detail } = useMemo(
    () => course,
    [course],
  )
  const { activeTT } = useActiveTT()

  useEffect(() => {
    const getClasses = async () => {
      const classes = await fetch(`/api/courses/${course.id}/classes/`)
        .then((res) => res.json())
        .then((res) => res.classes as Class[])
        .catch((err) => {
          console.log(err)
          return [] as Class[]
        })

      setClasses(classes)
    }

    getClasses()
  }, [course.id])

  return (
    <div className="flex flex-col w-full h-full py-1 px-2 space-y-5 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="font-semibold">
            {subjectCode.slice(0, 4)} {level}
            <span className="">{term}</span>{" "}
            <span className="text-xs text-slate-300">{classes.length}</span>
          </h1>
          <h2 className="font-light italic text-sm">{title}</h2>
        </div>
        <button
          onClick={() => {
            deselect()
          }}
          className="btn rounded-full h-fit w-fit shadow-lg hover:shadow-xl"
        >
          {closeSVG}
        </button>
      </div>
      <div className="grow py-3 space-y-3 overflow-x-hidden overflow-y-scroll">
        {classes.map((courseClass) => (
          <CourseClass
            key={courseClass.id}
            courseClass={courseClass}
            add={() => onAdd(courseClass)}
            remove={() => onRemove(courseClass)}
            inTT={
              activeTT?.classes.some(
                (ttClass) => ttClass.classId === courseClass.id,
              ) ?? false
            }
          />
        ))}
      </div>
    </div>
  )
}
