import { useMemo } from "react"

interface ClassNodeProps {
  name: string
  data: Component
  remove: Function
  emitHover: Function
  hover: boolean
  emitActive: Function
  active: boolean
  start: number
  end: number
  day: number
}

export default function ClassNode({
  name,
  data,
  remove,
  emitHover,
  hover,
  emitActive,
  active,
  start,
  end,
  day,
}: ClassNodeProps) {
  const {
    Section: section,
    Component: type,
    "Class Nbr": classNbr,
    Days: days,
    "Start Time": startTime,
    "End Time": endTime,
    Location: location,
    Instructor: prof,
    Notes: notes,
    Status: status,
    Campus: campus,
    Delivery: delivery,
  } = useMemo(() => data, [data])

  return (
    <div
      onMouseEnter={() => emitHover(true)}
      onMouseLeave={() => {
        active && emitActive()
        emitHover(false)
      }}
      onMouseDown={() => emitActive(true)}
      onMouseUp={() => remove() && emitActive(false) && emitHover(false)}
      className={`grid place-items-center overflow-x-scroll m-2 space-y-1 shrink-0 row-start-[${start}] row-end-[${end}] col-start-${day} rounded-xl p-3  ${
        hover
          ? active
            ? "scale-95 bg-red-100"
            : "scale-105 bg-slate-100"
          : "scale-100 bg-slate-200/25"
      } shadow-md transition-all duration-200`}
    >
      <div className="space-y-1">
        <div>
          <p className="text-xs font-bold opacity-70">{name.toUpperCase()}</p>
          <p className="text-xs font-light">
            {type} {section}
          </p>
        </div>
        <p className="text-sm font-semibold opacity-60">{location}</p>
      </div>
    </div>
  )
}
