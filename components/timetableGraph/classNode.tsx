import { useMemo } from "react"

interface ClassNodeProps {
  info: {
    name: string
    location: string
    section: number
    type: string
  }
  remove: () => void
  emitHover: (state: boolean) => void
  hover: boolean
  emitActive: (state: boolean) => void
  active: boolean
  start: number
  end: number
  day: number
}

export default function ClassNode({
  info: { name, location, section, type },
  start,
  end,
  day,
  remove,
  hover,
  emitHover,
  active,
  emitActive,
}: ClassNodeProps) {
  return (
    <div
      onMouseEnter={() => emitHover(true)}
      onMouseLeave={() => {
        active && emitActive(false)
        emitHover(false)
      }}
      onMouseDown={() => emitActive(true)}
      onMouseUp={() => {
        emitActive(false)
        emitHover(false)
        return remove()
      }}
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
