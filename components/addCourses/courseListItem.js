import { useMemo } from "react"

export default function CourseListItem({ course, select, children }) {
  const { subject, name, level, term, components } = useMemo(
    () => course,
    [course],
  )
  return (
    <div
      onClick={() => select(course)}
      className="cursor-pointer rounded-xl shadow-md p-3 btn"
    >
      <h1 className="font-semibold">
        {subject.slice(0, 4)} {level}
        <span className="">{term}</span>
        <span className="text-xs text-slate-300"> ({components.length})</span>
      </h1>
      <h2 className="font-light italic text-sm">{name}</h2>
    </div>
  )
}
