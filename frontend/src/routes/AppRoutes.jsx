// routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from '../components/ProtectedRoute'
import Navbar from '../components/Navbar'
import ChangePassword from '../pages/ChangePassword'
import AllRides from '../pages/AllRides'

export default function AppRoutes() {
  const user = useSelector(state => state.user.currentUser)

  return (
    <>
      {/* Show Navbar only when user is logged in */}
      {user && <Navbar />}
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/rides"
          element={
            <ProtectedRoute>
              <AllRides />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}