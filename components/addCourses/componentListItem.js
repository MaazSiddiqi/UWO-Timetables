import { useEffect, useCallback } from "react"

const daysTemplate = ["M", "Tu", "W", "Th", "F"]

export default function ComponentListItem({ component }) {
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
    <div className="w-full text-sm bg-white cursor-pointer rounded-xl shadow-md p-3 btn">
      <div className="flex justify-between">
        <h3 className="font-semibold">
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
                <p key={day + idx} className="px-1 text-gray-100">
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

// {
//     "Section": "004",
//     "Component": "LEC",
//     "Class Nbr": "10293",
//     "Days": [
//         "M",
//         "W",
//         "Th",
//         "F"
//     ],
//     "Start Time": "8:30 AM",
//     "End Time": "9:30 AM",
//     "Location": "SH-3345",
//     "Instructor": "Z. Krougly",
//     "Notes": [
//         "REQUIRES FINAL MARK OF AT LEAST 55% IN CALC 1000A/B OR 1100A/B. ",
//         "REQUISITES: Prerequisite(s): A minimum mark of 55% in one of Calculus 1000A/B, Calculus 1500A/B, Numerical and Mathematical Methods 1412A/B, the former Applied Mathematics 1412A/B."
//     ],
//     "Status": "Full",
//     "Campus": "Main",
//     "Delivery": "In Person"
// }
