import { removeCourse } from "@features/activeTT"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useAppDispatch } from "@hooks/redux"
import ClassNode from "./classNode"

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

interface CourseGraphProps {
  name: string
  data: Component
}

export default function CourseGraph({ name, data }: CourseGraphProps) {
  const [position, setPosition] = useState<any>(null)
  const dispatch = useAppDispatch()

  const {
    Days: days,
    "Start Time": startTime,
    "End Time": endTime,
  } = useMemo(() => data, [data])

  const getCourse = useCallback((): Course => {
    return { title: name, component: data }
  }, [data, name])

  const remove = useCallback(() => {
    if (!position) return null
    const course: Course = getCourse()
    dispatch(removeCourse(course))
  }, [dispatch, getCourse, position])

  useEffect(() => {
    const getRows = (startTime: string, endTime: string) => {
      const start = hourValues.indexOf(startTime) + 2
      const end = hourValues.indexOf(endTime) + 2

      return { start, end }
    }

    const getCols = (days: string[]) => {
      const cols = days.map((day) => daysValues.indexOf(day) + 2)
      return cols
    }

    const getPosition = () => {
      const rows = getRows(startTime, endTime)
      const cols = getCols(days)
      return { x: cols, y: rows }
    }

    const pos = getPosition()
    setPosition(pos)
  }, [days, endTime, startTime])

  return (
    <>
      {position &&
        position["x"].map((col: any, idx: number) => (
          <ClassNode
            remove={remove}
            key={name + idx}
            start={position["y"]["start"]}
            end={position["y"]["end"]}
            day={col}
            name={name}
            data={data}
          />
        ))}
    </>
  )
}
