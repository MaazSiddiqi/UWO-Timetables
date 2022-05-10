import { useMemo } from "react"
import { addCourse } from "@features/activeTT"
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

export default function ExpandCourse({ course, deselect }) {
  const { name, subject, level, term, detail, components } = useMemo(
    () => course,
    [course],
  )

  const dispatch = useDispatch()

  const add = (component) => {
    dispatch(addCourse({ title: name, component }))
  }

  return (
    <div className="flex flex-col w-full h-full py-1 px-2 space-y-5 overflow-y-hidden">
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
      <div className="grow py-3 space-y-3 overflow-x-visible overflow-y-scroll">
        {components.map((component, idx) => (
          <ComponentItem
            add={() => add(component)}
            key={idx}
            component={component}
          />
        ))}
      </div>
    </div>
  )
}
