import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Ticket } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-950 shadow-md border-b border-green-400 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <Ticket className="w-6 h-6 text-green-500 group-hover:rotate-12 transition" />

          <span className="text-2xl font-brand uppercase bg-white bg-clip-text text-transparent">
            EventSync
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {user ? (
            <>
              {/* User Info */}
              <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-medium text-gray-700">
                  {user.name || user.email}
                </span>
                <span className="text-xs text-gray-400 capitalize">
                  {user.role}
                </span>
              </div>

              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}