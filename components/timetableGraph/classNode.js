export default function ClassNode({
  start,
  end,
  day,
  name,
  type,
  section,
  location,
  remove,
}) {
  return (
    <div
      onClick={() => remove()}
      className={`grid place-items-center space-y-1 m-1 row-start-[${start}] row-end-[${end}] col-start-${day} rounded-xl p-4 bg-slate-300/50 hover:bg-red-200 transition-colors duration-150`}
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
