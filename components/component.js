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

import { useEffect, useState } from "react"

export default function Component({ data }) {
  const [loaded, setloaded] = useState(false)

  const [time, setTime] = useState([])
  const [days, setDays] = useState([])

  useEffect(() => {
    const { Days: days, "Start Time": startTime, "End Time": endTime } = data

    const getRow = (time) => {
      const row = hourValues.indexOf(time) + 2
      console.log(time, row)
      return row
    }

    const start = getRow(startTime)
    const end = getRow(endTime)

    console.log([start, end])
    setTime([start, end + 1])
    setloaded(true)
  }, [data])

  return (
    <>
      {loaded && (
        <div
          className={`row-start-[${time[0]}] row-end-[${time[1]}] col-start-2 rounded-xl p-4 bg-red-200`}
        >
          <span>ECON 1022</span>
        </div>
      )}
    </>
  )
}
