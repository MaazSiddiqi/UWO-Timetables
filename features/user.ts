import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
  value: User
}

const initialState: UserState = {
  value: {
    name: "",
    timetables: [],
  },
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state: UserState, action: PayloadAction<User>) => {
      state.value = action.payload
    },
  },
})

export const { login } = userSlice.actions

export default userSlice.reducer
