import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import rideReducer from '../features/rides/rideSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    rides: rideReducer,
  },
})  