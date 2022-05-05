import React, { useEffect } from "react"
import Component from "./component"

import calcSubjects from "../public/CALCULUS.json"
import styles from "../styles/timetable.module.scss"

const testComponent = calcSubjects["Courses"][0]["Components"][0]

export default function Timetable() {
  useEffect(() => {}, [])

  return (
    <div className="flex flex-col space-y-2 w-1/2 h-fit p-4 text-center drop-shadow-md rounded-2xl bg-white">
      <h1 className="text-2xl font-semibold">Fall/Winter</h1>
      <div className="grid grid-cols-6 grid-flow-row-dense grow border-2 rounded-xl overflow-scroll">
        <p className={styles.heading}>Times</p>
        <p className={styles.heading}>Monday</p>
        <p className={styles.heading}>Tuesday</p>
        <p className={styles.heading}>Wednesday</p>
        <p className={styles.heading}>Thursday</p>
        <p className={styles.heading}>Friday</p>

        <p className={styles.time}>7:00 AM</p>
        <p className={styles.time}>7:30 AM</p>
        <p className={styles.time}>8:00 AM</p>
        <p className={styles.time}>8:30 AM</p>
        <p className={styles.time}>9:00 AM</p>
        <p className={styles.time}>9:30 AM</p>
        <p className={styles.time}>10:00 AM</p>
        <p className={styles.time}>10:30 AM</p>
        <p className={styles.time}>11:00 AM</p>
        <p className={styles.time}>11:30 AM</p>
        <p className={styles.time}>12:00 PM</p>
        <p className={styles.time}>12:30 PM</p>
        <p className={styles.time}>1:00 PM</p>
        <p className={styles.time}>1:30 PM</p>
        <p className={styles.time}>2:00 PM</p>
        <p className={styles.time}>2:30 PM</p>
        <p className={styles.time}>3:00 PM</p>
        <p className={styles.time}>3:30 PM</p>
        <p className={styles.time}>4:00 PM</p>
        <p className={styles.time}>4:30 PM</p>
        <p className={styles.time}>5:00 PM</p>
        <p className={styles.time}>5:30 PM</p>
        <p className={styles.time}>6:00 PM</p>
        <p className={styles.time}>6:30 PM</p>
        <p className={styles.time}>7:00 PM</p>
        <p className={styles.time}>7:30 PM</p>
        <p className={styles.time}>8:00 PM</p>
        <p className={styles.time}>8:30 PM</p>
        <p className={styles.time}>9:00 PM</p>
        <p className={styles.time}>9:30 PM</p>

        <Component data={testComponent} />
      </div>
    </div>
  )
}
