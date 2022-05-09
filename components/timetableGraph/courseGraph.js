import { useEffect, useState } from "react"
import ClassNode from "./classNode"

// Sample Component:
// {
//     "Section": "570",
//     "Component": "LEC",
//     "Class Nbr": "3135",
//     "Days": ["W", "F"],
//     "Start Time": "8:30 AM",
//     "End Time": "10:30 AM",
//     "Location": "KC-LH103",
//     "Instructor": "T. Pattenden",
//     "Notes": [
//       "RESTRICTED TO STUDENTS REGISTERED AT AN AFFILIATED UNIVERSITY COLLEGE. ",
//       "REQUISITES: Prerequisite(s): Ontario Secondary School MCV4U or Mathematics 0110A/B."
//     ],
//     "Status": "Not Full",
//     "Campus": "King's",
//     "Delivery": "In Person"
// }

const daysValues = ["M", "Tu", "W", "Th", "F"]
const hourValues = [
  "7:00 AM",
  "7:30 AM",
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
]

export default function CourseGraph({ name, data }) {
  const [loaded, setLoaded] = useState(false)
  const [position, setPosition] = useState({})

  const getRows = (startTime, endTime) => {
    const start = hourValues.indexOf(startTime) + 2
    const end = hourValues.indexOf(endTime) + 2

    return { start, end }
  }

  const getCols = (days) => {
    const cols = days.map((day) => daysValues.indexOf(day) + 2)
    return cols
  }

  useEffect(() => {
    const { Days, "Start Time": startTime, "End Time": endTime } = data

    const rows = getRows(startTime, endTime)
    const cols = getCols(Days)

    setPosition({ x: cols, y: rows })
    setLoaded(true)
  }, [data])

  return (
    <>
      {loaded && (
        <>
          {position["x"].map((col, idx) => (
            <ClassNode
              key={idx}
              start={position["y"]["start"]}
              end={position["y"]["end"]}
              // end={position["y"]["start"] + 4}
              day={col}
              name={name}
              type={data["Component"]}
              section={data["Section"]}
              location={data["Location"]}
            />
          ))}
        </>
      )}
    </>
  )
}
