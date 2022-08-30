import { configureStore } from '@reduxjs/toolkit'
import sessionTimeReducer from './sessionTimeSlice'

export default configureStore({
  reducer: {
    sessionTime: sessionTimeReducer
  }
})