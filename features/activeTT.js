import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

export const activeTTSlice = createSlice({
  name: "activeTT",
  initialState: { value: { name: "", courses: [] } },
  reducers: {
    setTT: (state, action) => {
      state.value = action.payload
    },
    addCourse: (state, action) => {
      state.value["courses"].push(action.payload)
    },
    removeCourse: (state, action) => {
      const updatedCourses = state.value["courses"].filter(
        (course) => JSON.stringify(course) !== JSON.stringify(action.payload),
      )
      state.value["courses"] = [...updatedCourses]
    },
  },
})

export const { setTT, addCourse, removeCourse, isInTimetable } =
  activeTTSlice.actions

export default activeTTSlice.reducer

export const useSearchCourses = () => {
  const { courses } = useSelector((store) => store.activeTT.value)
  const search = ({ title, component }) => {
    const course = courses.find(
      (course) =>
        course["title"] === title && course["component"] === component,
    )
    const found = course !== undefined

    return [course, found]
  }
  return search
}
