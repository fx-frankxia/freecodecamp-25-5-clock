import { createSlice } from '@reduxjs/toolkit'

export const sessionTimeSlice = createSlice({
  name: 'sessionTime',
  initialState: {
    value: 1500,
    isTikking: false,
    isReset:true,
    isSession: true
  },
  reducers: {
    run: state => {
        state.value -= 1;
        state.isReset = false
    },
    playPause: state => {
        state.isTikking = !state.isTikking    
    },
    sessionTimeReset: state => {
        state.value = 1500
        state.isTikking = false
        state.isReset = true
        state.isSession = true   
    },
    setToTarget: (state, action) => {
      state.value = action.payload;   
    },
    toggleIsSession: state => {
      state.isSession = !state.isSession
    }
  }
})

// Action creators are generated for each case reducer function
export const { run, playPause,sessionTimeReset,setToTarget,toggleIsSession } = sessionTimeSlice.actions

export default sessionTimeSlice.reducer