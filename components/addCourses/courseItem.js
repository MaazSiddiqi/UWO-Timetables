import { useMemo } from "react"

export default function CourseItem({ course, select }) {
  const { subject, name, level, term, components } = useMemo(
    () => course,
    [course],
  )
  return (
    <div
      onClick={() => select(course)}
      className="rounded-xl shadow-md p-3 hover:scale-105 transition-all duration-150"
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
