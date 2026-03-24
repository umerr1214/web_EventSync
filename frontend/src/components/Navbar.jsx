import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/user/userSlice'

export default function Navbar() {
  const user = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl">🚗</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Campus Rides
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">

            {user ? (
              <>
                {/* User Info */}
                <div className="hidden md:flex items-center space-x-4 mr-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium">Hi, {user.name || 'User'}!</span>
                  </div>
                </div>

                {/* Navigation Links */}
                <Link
                  to="/"
                  className="px-4 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200 font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/rides"
                  className="px-4 py-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200 font-medium"
                >
                  Rides
                </Link>
                <Link
                  to="/post-ride"
                  className="px-4 py-2 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 transition duration-200 font-medium"
                >
                  Post Ride
                </Link>
                <Link
                  to="/my-bookings"
                  className="px-4 py-2 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition duration-200 font-medium"
                >
                  Bookings
                </Link>

                <Link to="/change-password" className="hover:text-blue-500">
                  Change Password
                </Link>

                <Link to="/rides">Rides</Link>
                
                <button
                  onClick={handleLogout}
                  className="ml-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-xl hover:from-red-600 hover:to-red-700 transition duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition duration-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Register
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  )
}