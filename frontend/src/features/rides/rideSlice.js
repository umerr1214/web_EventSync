import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  rides: [],
  bookings: [],
}

const rideSlice = createSlice({
  name: 'rides',
  initialState,
  reducers: {
    addRide: (state, action) => {
      state.rides.push(action.payload)
    },
    bookRide: (state, action) => {
      const { rideId, user } = action.payload
      const ride = state.rides.find(r => r.id === rideId)

      if (ride && ride.availableSeats > 0) {
        ride.availableSeats -= 1
        state.bookings.push({ rideId, user })
      }
    },
  },
})

export const { addRide, bookRide } = rideSlice.actions
export default rideSlice.reducer