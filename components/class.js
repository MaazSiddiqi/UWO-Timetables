import { useEffect } from "react"
import styles from "../styles/class.module.css"

export default function Class({ start, end, day }) {
  useEffect(() => {
    console.log(start, end, day)
  }, [start, end, day])

  return (
    <div
      className={`row-start-[${start}] row-end-[${end}] col-start-${day} rounded-xl p-4 bg-red-200`}
    >
      <span>ECON 1022</span>
    </div>
  )
}
