import { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"

const daysTemplate = ["M", "Tu", "W", "Th", "F"]

export default function ComponentListItem({ component, add }) {
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

  const formatDays = useCallback((_days) => {
    const res = daysTemplate.map((day) =>
      _days.indexOf(day) === -1 ? "_" : day,
    )
    return res
  }, [])

  return (
    <div
      onMouseUp={() => !component.inTT && add()}
      className={`w-full text-sm ${
        component.inTT ? "bg-green-100 " : "bg-white cursor-pointer "
      } rounded-xl shadow-md p-3 btn`}
    >
      <div className="flex justify-between">
        <div className="flex items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 btn hover:text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="font-semibold">
            {type} {section}
          </h3>
        </div>
        <div className="flex justify-between w-2/5 font-mono text-center">
          {delivery !== "In Person" ? (
            <p className="w-full text-gray-400 text-center">{delivery}</p>
          ) : (
            daysTemplate.map((day, idx) =>
              days.indexOf(day) > -1 ? (
                <p
                  key={day + idx}
                  className={`px-1
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
