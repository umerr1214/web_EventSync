// src/components/StudentLayout.jsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const StudentLayout = ({ children, title }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: "/student", label: "Dashboard" },
    { path: "/student/events", label: "Browse Events" },
    { path: "/student/tickets", label: "My Tickets" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-bold mb-6">Student Panel</h2>

        <ul className="space-y-3">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <li 
                className={`p-2 rounded-lg hover:bg-gray-200 cursor-pointer ${
                  location.pathname === item.path ? 'bg-gray-200' : ''
                }`}
              >
                {item.label}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{title}</h1>

          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user?.email}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
};

export default StudentLayout;