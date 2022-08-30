import { createSlice } from '@reduxjs/toolkit'

export const sessionTimeSlice = createSlice({
  name: 'sessionTime',
  initialState: {
    value: 1500,
    isTikking: false
  },
  reducers: {
    run: state => {
        state.value -= 1
    },
    flip: state => {
        state.isTikking = !state.isTikking    
    },
    sessionTimeReset: state => {
        state.value = 1500    
    }
  }
})

// Action creators are generated for each case reducer function
export const { run, flip,sessionTimeReset } = sessionTimeSlice.actions

export default sessionTimeSlice.reducer