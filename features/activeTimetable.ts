import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppSelector } from "@hooks/redux"
import { Class, ClassInTimetable, Course, Timetable } from "@prisma/client"

export type TimetableValue = Timetable & {
  classes: (ClassInTimetable & {
    Class: Class & {
      Course: Course
    }
  })[]
}

interface activeTimetableState {
  value: TimetableValue | null
}

const initState: activeTimetableState = {
  value: null,
}
export const activeTimetableSlice = createSlice({
  name: "activeTimetable",
  initialState: initState,
  reducers: {
    setTimetable: (
      state: activeTimetableState,
      action: PayloadAction<TimetableValue>,
    ) => {
      state.value = action.payload
    },
    setName: (state: activeTimetableState, action: PayloadAction<string>) => {
      if (!state.value) return
      state.value.name = action.payload
    },
    // addClass: (state: activeTimetableState, action: PayloadAction<Class>) => {
    //   const { id } = action.payload

    //   console.log("adding class")
    //   const updateTimetable = async () => {
    //     if (!state.value) return
    //     if (state.value.classes.some(({ Class }) => Class.id === id)) return

    //     const timetable = await fetch(
    //       `/api/profile/${state.value.profileId}/timetables/${state.value.id}/addClass`,
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ classId: id }),
    //       },
    //     )
    //       .then((res) => res.json())
    //       .then((data) => data.timetable as TimetableValue)
    //       .catch((error) => {
    //         console.log(error)
    //         return null
    //       })

    //     if (!timetable) return
    //     console.log("updated timetable")
    //     setTimetable(timetable)
    //   }
    //   updateTimetable()
    // },
    // removeClass: (
    //   state: activeTimetableState,
    //   action: PayloadAction<Class>,
    // ) => {
    //   if (!state.value) return

    //   const { id } = action.payload

    //   // remove class from classes in timetable
    //   const updatedClasses = state.value.classes.filter(
    //     (course) => course.classId !== id,
    //   )
    //   state.value.classes = [...updatedClasses]
    // },
  },
})

export const { setTimetable, setName } = activeTimetableSlice.actions

export default activeTimetableSlice.reducer
