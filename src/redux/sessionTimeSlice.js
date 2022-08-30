import { createSlice } from '@reduxjs/toolkit'

export const sessionTimeSlice = createSlice({
  name: 'sessionTime',
  initialState: {
    value: 1500
  },
  reducers: {
    run: state => {
      state.value -= 1
    }
  }
})

// Action creators are generated for each case reducer function
export const { run } = sessionTimeSlice.actions

export default sessionTimeSlice.reducer