import { createSlice } from "@reduxjs/toolkit"

export const uesrSlice = createSlice({
  name: "user",
  initialState: { value: { name: "", timetables: [] } },
  reducers: {
    login: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { login } = uesrSlice.actions

export default uesrSlice.reducer
