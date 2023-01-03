import { Class, ClassInTimetable, Course, Timetable } from "@prisma/client"
import styles from "@styles/timetable.module.css"
import TTName from "./TTName"
import CourseGraph from "./courseGraph"

interface TimetableProps {
  timetable: Timetable & {
    classes: (ClassInTimetable & {
      Class: Class & {
        Course: Course
      }
    })[]
  }
  setName: (name: string) => void
  onRemove: (Class: Class) => void
  className?: string
}

export default function TimetableDisplay({
  timetable,
  setName,
  onRemove,
  className = "",
}: TimetableProps) {
  return (
    <>
      <TTName name={timetable.name} setName={setName} />
      <div className={`${styles.timetable} ${className}`}>
        {/* Must explicitly label grid positions so css compiler doesn't purge the currently unused dynamic classes */}
        <p className={`${styles.heading} col-start-1`}>Times</p>
        <p className={`${styles.heading} col-start-2`}>Monday</p>
        <p className={`${styles.heading} col-start-3`}>Tuesday</p>
        <p className={`${styles.heading} col-start-4`}>Wednesday</p>
        <p className={`${styles.heading} col-start-5`}>Thursday</p>
        <p className={`${styles.heading} col-start-6`}>Friday</p>

        <p className={`${styles.time} row-start-[2] row-end-[2]`}>7:00 AM</p>
        <p className={`${styles.time} row-start-[3] row-end-[3]`}>7:30 AM</p>
        <p className={`${styles.time} row-start-[4] row-end-[4]`}>8:00 AM</p>
        <p className={`${styles.time} row-start-[5] row-end-[5]`}>8:30 AM</p>
        <p className={`${styles.time} row-start-[6] row-end-[6]`}>9:00 AM</p>
        <p className={`${styles.time} row-start-[7] row-end-[7]`}>9:30 AM</p>
        <p className={`${styles.time} row-start-[8] row-end-[8]`}>10:00 AM</p>
        <p className={`${styles.time} row-start-[9] row-end-[9]`}>10:30 AM</p>
        <p className={`${styles.time} row-start-[10] row-end-[10]`}>11:00 AM</p>
        <p className={`${styles.time} row-start-[11] row-end-[11]`}>11:30 AM</p>
        <p className={`${styles.time} row-start-[12] row-end-[12]`}>12:00 PM</p>
        <p className={`${styles.time} row-start-[13] row-end-[13]`}>12:30 PM</p>
        <p className={`${styles.time} row-start-[14] row-end-[14]`}>1:00 PM</p>
        <p className={`${styles.time} row-start-[15] row-end-[15]`}>1:30 PM</p>
        <p className={`${styles.time} row-start-[16] row-end-[16]`}>2:00 PM</p>
        <p className={`${styles.time} row-start-[17] row-end-[17]`}>2:30 PM</p>
        <p className={`${styles.time} row-start-[18] row-end-[18]`}>3:00 PM</p>
        <p className={`${styles.time} row-start-[19] row-end-[19]`}>3:30 PM</p>
        <p className={`${styles.time} row-start-[20] row-end-[20]`}>4:00 PM</p>
        <p className={`${styles.time} row-start-[21] row-end-[21]`}>4:30 PM</p>
        <p className={`${styles.time} row-start-[22] row-end-[22]`}>5:00 PM</p>
        <p className={`${styles.time} row-start-[23] row-end-[23]`}>5:30 PM</p>
        <p className={`${styles.time} row-start-[24] row-end-[24]`}>6:00 PM</p>
        <p className={`${styles.time} row-start-[25] row-end-[25]`}>6:30 PM</p>
        <p className={`${styles.time} row-start-[26] row-end-[26]`}>7:00 PM</p>
        <p className={`${styles.time} row-start-[27] row-end-[27]`}>7:30 PM</p>
        <p className={`${styles.time} row-start-[28] row-end-[28]`}>8:00 PM</p>
        <p className={`${styles.time} row-start-[29] row-end-[29]`}>8:30 PM</p>
        <p className={`${styles.time} row-start-[30] row-end-[30]`}>9:00 PM</p>
        <p className={`${styles.time} row-start-[31] row-end-[31]`}>9:30 PM</p>

        {timetable.classes.map(({ Class }, idx) => (
          <CourseGraph
            key={Class.courseId + idx}
            data={Class}
            onRemove={onRemove}
          />
        ))}
      </div>
    </>
  )
}
