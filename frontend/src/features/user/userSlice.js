import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  users: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action) => {
      state.users.push(action.payload)
    },
    login: (state, action) => {
      state.currentUser = action.payload
    },
    logout: (state) => {
      state.currentUser = null
    },
    changePassword: (state, action) => {
      const { email, newPassword } = action.payload
      const user = state.users.find(u => u.email === email)
      if (user) user.password = newPassword
    },
  },
})

export const { register, login, logout, changePassword } = userSlice.actions
export default userSlice.reducer