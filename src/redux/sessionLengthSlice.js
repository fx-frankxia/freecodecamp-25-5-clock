import { createSlice } from '@reduxjs/toolkit'

export const sessionLengthSlice = createSlice({
  name: 'sessionLength',
  initialState: {
    value: 25
  },
  reducers: {
    sessionIncrement: state => {
      state.value += 1
    },
    sessionDecrement: state => {
      state.value -= 1
    },
    sessionReset: state => {
      state.value = 25
    }

  }
})

// Action creators are generated for each case reducer function
export const { sessionIncrement, sessionDecrement, sessionReset } = sessionLengthSlice.actions

export default sessionLengthSlice.reducer