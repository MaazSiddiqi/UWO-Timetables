import { Class, Course } from "@prisma/client"
import { useCallback, useMemo, useState } from "react"
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
  data: Class & {
    Course: Course
  }

  onRemove: (courseClass: Class) => void
}

export default function CourseGraph({ data, onRemove }: CourseGraphProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const { x, y } = useMemo(() => {
    const getRows = () => {
      const start = hourValues.indexOf(data.startTime) + 2
      const end = hourValues.indexOf(data.endTime) + 2

      return { start, end }
    }

    const getCols = () => {
      const cols = data.days.map((day) => daysValues.indexOf(day) + 2)
      return cols
    }

    const rows = getRows()
    const cols = getCols()
    return { x: cols, y: rows }
  }, [data.days, data.endTime, data.startTime])

  const remove = useCallback(() => {
    onRemove(data)
  }, [data, onRemove])

  return (
    <>
      {x.map((col: any, idx: number) => (
        <ClassNode
          remove={remove}
          hover={isHovering}
          emitHover={setIsHovering}
          active={isActive}
          emitActive={setIsActive}
          key={data.id + idx}
          start={y.start}
          end={y.end}
          day={col}
          info={{
            name: data.Course.title,
            location: data.location,
            section: data.section,
            type: data.type,
          }}
        />
      ))}
    </>
  )
}
