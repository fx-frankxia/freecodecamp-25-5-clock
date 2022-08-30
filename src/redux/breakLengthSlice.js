import { createSlice } from '@reduxjs/toolkit'

export const breakLengthSlice = createSlice({
  name: 'breakLength',
  initialState: {
    value: 5
  },
  reducers: {
    breakIncrement: state => {
      state.value += 1
    },
    breakDecrement: state => {
      state.value -= 1
    },
    breakReset: state => {
        state.value = 5
      }
  }
})

// Action creators are generated for each case reducer function
export const { breakIncrement, breakDecrement, breakReset } = breakLengthSlice.actions

export default breakLengthSlice.reducer