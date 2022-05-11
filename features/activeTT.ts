import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppSelector } from "@hooks/redux"

interface activeTTState {
  value: Timetable
}

const initialState: activeTTState = {
  value: { name: "", courses: [] },
}

export const activeTTSlice = createSlice({
  name: "activeTT",
  initialState,
  reducers: {
    setTT: (state: activeTTState, action: PayloadAction<Timetable>) => {
      state.value = action.payload
    },
    addCourse: (state: activeTTState, action: PayloadAction<Course>) => {
      state.value["courses"].push(action.payload)
    },
    removeCourse: (state: activeTTState, action: PayloadAction<Course>) => {
      const updatedCourses = state.value["courses"].filter(
        (course) => JSON.stringify(course) !== JSON.stringify(action.payload),
      )
      state.value["courses"] = [...updatedCourses]
    },
  },
})

export const { setTT, addCourse, removeCourse } = activeTTSlice.actions

export default activeTTSlice.reducer

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
