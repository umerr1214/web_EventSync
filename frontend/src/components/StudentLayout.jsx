// src/components/StudentLayout.jsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const StudentLayout = ({ children, title }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { path: "/student", label: "Dashboard" },
    { path: "/student/events", label: "Browse Events" },
    { path: "/student/tickets", label: "My Tickets" },
  ];

  return (
    <div className="min-h-screen bg-gray-800 text-gray-200 flex">

      {/* Sidebar */}
      <div className="w-64 bg-gray-950 border-r border-gray-700 p-5">
        <h2 className="text-xl font-bold mb-6 text-white">
          Student Panel
        </h2>

        <ul className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <li
                className={`p-2 rounded-lg cursor-pointer transition ${
                  location.pathname === item.path
                    ? "bg-emerald-600 text-white"
                    : "hover:bg-gray-700"
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

        {/* Top Bar*/}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-2xl font-bold text-white">
            {title}
          </h1>

        </div>

        {/* Page Content */}
        {children}

      </div>

    </div>
  );
};

export default StudentLayout;