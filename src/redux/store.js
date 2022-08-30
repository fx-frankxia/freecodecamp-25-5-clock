import { configureStore } from '@reduxjs/toolkit'
import sessionTimeReducer from './sessionTimeSlice'
import sessionLengthReducer from './sessionLengthSlice'
import breakLengthReducer from './breakLengthSlice'

export default configureStore({
  reducer: {
    sessionTime: sessionTimeReducer,
    sessionLength: sessionLengthReducer,
    breakLength: breakLengthReducer
  }
})