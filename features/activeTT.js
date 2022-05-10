import { createSlice } from "@reduxjs/toolkit"

export const activeTTSlice = createSlice({
  name: "activeTT",
  initialState: { value: { name: "", courses: [] } },
  reducers: {
    setTT: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setTT } = activeTTSlice.actions

export default activeTTSlice.reducer
