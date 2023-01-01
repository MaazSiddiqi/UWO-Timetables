import {
  TimetableValue,
  setName as _setName,
  setTimetable as _setTimeTable,
} from "@features/activeTimetable"
import { useAppDispatch, useAppSelector } from "./redux"
import { Class } from "@prisma/client"
import { useCallback } from "react"

export const useActiveTT = () => {
  const activeTT = useAppSelector((state) => state.activeTT.value)
  const dispatch = useAppDispatch()

  const setTimetable = useCallback(
    (tt: TimetableValue) => dispatch(_setTimeTable(tt)),
    [dispatch],
  )
  const setName = useCallback(
    async (name: string) => {
      if (!activeTT) return
      if (activeTT.name === name) return

      const timetable = await fetch(
        `/api/profile/${activeTT.profileId}/timetables/${activeTT.id}/changeName`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        },
      )
        .then((res) => res.json())
        .then((data) => data.timetable as TimetableValue)
        .catch((error) => {
          console.log(error)
          return null
        })

      if (!timetable) return
      return dispatch(_setName(name))
    },
    [activeTT, dispatch],
  )

  const addClass = useCallback(
    async (courseClass: Class) => {
      if (!activeTT) return
      if (activeTT.classes.some(({ Class }) => Class.id === courseClass.id))
        return

      const timetable = await fetch(
        `/api/profile/${activeTT.profileId}/timetables/${activeTT.id}/addClass`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ classId: courseClass.id }),
        },
      )
        .then((res) => res.json())
        .then((data) => data.timetable as TimetableValue)
        .catch((error) => {
          console.log(error)
          return null
        })

      if (!timetable) return
      setTimetable(timetable)
    },
    [activeTT, setTimetable],
  )

  const removeClass = useCallback(
    async (courseClass: Class) => {
      if (!activeTT) return
      if (!activeTT.classes.some(({ Class }) => Class.id === courseClass.id))
        return

      const timetable = await fetch(
        `/api/profile/${activeTT.profileId}/timetables/${activeTT.id}/removeClass`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ classId: courseClass.id }),
        },
      )
        .then((res) => res.json())
        .then((data) => data.timetable as TimetableValue)
        .catch((error) => {
          console.log(error)
          return null
        })

      if (!timetable) return
      setTimetable(timetable)
    },
    [activeTT, setTimetable],
  )

  return {
    activeTT,
    setTimetable,
    setName,
    addClass,
    removeClass,
  }
}
