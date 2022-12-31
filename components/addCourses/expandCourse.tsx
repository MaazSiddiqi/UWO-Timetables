import {
  addClass,
  removeCourse,
  useSearchCourses,
} from "@features/activeTimetable"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import ComponentItem from "./componentListItem"

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
  course: CourseData
  deselect: Function
}

export default function ExpandCourse({ course, deselect }: ExpandCourseProps) {
  const { name, subject, level, term, detail, components } = useMemo(
    () => course,
    [course],
  )

  const search = useSearchCourses()
  const dispatch = useDispatch()

  const add = (component: Component) => {
    const course: Course = { title: name, component }
    dispatch(addClass(course))
  }

  const remove = (component: Component) => {
    const course: Course = { title: name, component }
    dispatch(removeCourse(course))
  }

  return (
    <div className="flex flex-col w-full h-full py-1 px-2 space-y-5 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="font-semibold">
            {subject.slice(0, 4)} {level}
            <span className="">{term}</span>
            <span className="text-xs text-slate-300">
              {" "}
              ({components.length})
            </span>
          </h1>
          <h2 className="font-light italic text-sm">{name}</h2>
        </div>
        <button
          onClick={() => {
            deselect()
            console.clear()
          }}
          className="btn rounded-full h-fit w-fit shadow-lg hover:shadow-xl"
        >
          {closeSVG}
        </button>
      </div>
      <div className="grow py-3 space-y-3 overflow-x-hidden overflow-y-scroll">
        {components.map((component: Component, idx: number) => {
          const [_, found]: any = search({
            title: name,
            component,
          })

          return (
            <ComponentItem
              add={() => add(component)}
              remove={() => remove(component)}
              key={idx}
              inTT={found}
              component={component}
            />
          )
        })}
      </div>
    </div>
  )
}
