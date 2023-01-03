import { Class, ClassInTimetable, Course, Timetable } from "@prisma/client"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

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
    addClass: (
      state: activeTimetableState,
      action: PayloadAction<TimetableValue["classes"][0]>,
    ) => {
      // TODO: currently broken
      if (!state.value) return
      state.value.classes.push(action.payload)
    },
    setClasses: (
      state: activeTimetableState,
      action: PayloadAction<TimetableValue["classes"]>,
    ) => {
      if (!state.value) return
      state.value.classes = action.payload
    },
    removeClass: (
      state: activeTimetableState,
      action: PayloadAction<TimetableValue["classes"][0]["Class"]>,
    ) => {
      // TODO: currently broken
      if (!state.value) return
      state.value.classes = state.value.classes.filter(
        ({ Class }) => Class.id !== action.payload.id,
      )
    },
  },
})

export const {
  setTimetable,
  setName,
  addClass,
  setClasses: removeClass,
} = activeTimetableSlice.actions

export default activeTimetableSlice.reducer
