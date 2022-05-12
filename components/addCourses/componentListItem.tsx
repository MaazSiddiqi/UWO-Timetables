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
        !inTT ? add() : remove()
        setFocused(false)
      }}
      className={`w-full text-sm ${
        inTT && !focused
          ? "bg-green-100 "
          : focused
          ? inTT
            ? "bg-red-200"
            : "bg-gray-50"
          : "bg-white"
      } rounded-xl shadow-md p-3 btn cursor-pointer`}
    >
      <div className="flex justify-between">
        <h3 className="font-semibold px-4">
          {type} {section}
        </h3>
        <div className="flex justify-between w-2/5 font-mono text-center">
          {delivery !== "In Person" ? (
            <p className="w-full text-gray-400 text-center">{delivery}</p>
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
      </div>
    </div>
  )
}
