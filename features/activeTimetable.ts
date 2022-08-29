import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppSelector } from "@hooks/redux"
import { Timetable } from "@prisma/client"

interface activeTimetableState {
  value: Timetable | null
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
      action: PayloadAction<Timetable>,
    ) => {
      state.value = action.payload
    },
    setName: (state: activeTimetableState, action: PayloadAction<string>) => {
      if (!state.value) return
      state.value.name = action.payload
    },
    addCourse: (state: activeTimetableState, action: PayloadAction<Course>) => {
      if (!state.value) return
      state.value["courses"].push(action.payload)
      // state.value.
    },
    removeCourse: (
      state: activeTimetableState,
      action: PayloadAction<Course>,
    ) => {
      const updatedCourses = state.value["courses"].filter(
        (course) => JSON.stringify(course) !== JSON.stringify(action.payload),
      )
      state.value["courses"] = [...updatedCourses]
    },
  },
})

export const { setTimetable, addCourse, removeCourse, setName } =
  activeTimetableSlice.actions

export default activeTimetableSlice.reducer

export const useSearchCourses = () => {
  const { courses } = useAppSelector((store) => store.activeTT.value)
  const search = ({ title, component }: Course) => {
    const course = courses.find(
      (course) =>
        course["title"] === title && course["component"] === component,
    )
    const found = course !== undefined

    return [course, found]
  }
  return search
}
