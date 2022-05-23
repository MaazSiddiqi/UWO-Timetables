import { useState } from "react"

const daysTemplate = ["M", "Tu", "W", "Th", "F"]

interface ComponentListItemProps {
  add: Function
  remove: Function
  component: Component
  inTT: boolean
}

export default function ComponentListItem({
  component,
  inTT,
  add,
  remove,
}: ComponentListItemProps) {
  const [focused, setFocused] = useState<boolean>(false)

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
  } = component

  return (
    <div
      onMouseDown={() => setFocused(true)}
      onMouseLeave={() => focused && setFocused(false)}
      onMouseUp={() => {
        if (!focused) return
        !inTT && status !== "Full" ? add() : remove()
        setFocused(false)
      }}
      className={`relative w-full text-sm ${
        inTT && !focused
          ? "bg-green-50 "
          : focused
          ? inTT
            ? "bg-red-100 select-none"
            : "bg-gray-50 select-none"
          : "bg-white"
      } rounded-xl shadow-md p-3 px-7 btn cursor-pointer`}
    >
      <div
        className={`flex items-center justify-between ${
          status === "Full" && "opacity-30"
        }`}
      >
        <div className="flex flex-col space-y-1">
          <h3 className="font-semibold">
            {type} {section}
          </h3>
          <div className="text-xs">
            <p>
              {location}{" "}
              <span className="text-gray-400">
                {location && "|"} {campus}
              </span>
            </p>
          </div>
        </div>
        <div className="w-/5 space-y-1 select-none">
          <div className="flex justify-between w-full font-mono text-center">
            {delivery !== "In Person" ? (
              <p className="w-full h-6 text-gray-400 text-center select-none">
                {delivery}
              </p>
            ) : (
              daysTemplate.map((day, idx) =>
                days.indexOf(day) > -1 ? (
                  <p
                    key={day + idx}
                    className={`px-1 noselect
                        ${idx === 0 && "text-orange-400"}
                        ${idx === 1 && "text-lime-400"}
                        ${idx === 2 && "text-teal-400"}
                        ${idx === 3 && "text-violet-400"}
                        ${idx === 4 && "text-pink-400"} `}
                  >
                    {day}
                  </p>
                ) : (
                  <p
                    key={day + idx}
                    className="px-1 text-gray-200 text-opacity-60"
                  >
                    {day}
                  </p>
                ),
              )
            )}
          </div>
          {delivery === "In Person" && (
            <div className="flex text-right justify-evenly font-mono font-light text-slate-400">
              <p>{startTime}</p>
              <p>-</p>
              <p>{endTime}</p>
            </div>
          )}
        </div>
      </div>
      <div
        className={`absolute grid place-items-center w-full h-full top-0 left-0 rounded-xl ${
          !focused
            ? "bg-slate-50/50 text-gray-500"
            : "bg-red-50/50 text-red-400 "
        } ${status !== "Full" && "hidden"}`}
      >
        <h1 className="font-mono text-lg select-none">full</h1>
      </div>
      {notes && (
        <div
          className={`w-full pt-1 ${
            status !== "Full" ? "text-red-400" : "text-red-400/50"
          } overflow-x-scroll space-y-[0.125rem]`}
        >
          {notes.map((note, idx) => (
            <p
              key={idx}
              className="w-full overflow-x-scroll flex flex-col text-[70%] [line-height:_13px]"
            >
              {note}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
