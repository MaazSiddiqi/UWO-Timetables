import { useMemo } from "react"

interface ClassNodeProps {
  name: string
  data: Component
  remove: Function
  start: number
  end: number
  day: number
}

export default function ClassNode({
  name,
  data,
  remove,
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
      onClick={() => remove()}
      className={`grid place-items-center overflow-x-scroll space-y-1 m-1 shrink-0 row-start-[${start}] row-end-[${end}] col-start-${day} rounded-xl p-3 bg-slate-300/50 hover:bg-red-200 btn`}
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
