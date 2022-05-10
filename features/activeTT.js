import { createSlice } from "@reduxjs/toolkit"

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
      const courses = state.value["courses"]
      const updatedCourses = courses.filter(
        (course) => JSON.stringify(course) !== JSON.stringify(action.payload),
      )
      state.value["courses"] = [...updatedCourses]
    },
  },
})

export const { setTT, addCourse, removeCourse } = activeTTSlice.actions

export default activeTTSlice.reducer
