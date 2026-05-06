import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = ({ children, title }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/users", label: "Manage Users" },
    { path: "/admin/events", label: "Manage Events" },
    { path: "/admin/tickets", label: "Tickets" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex text-gray-200">

      {/* Sidebar */}
      <div className="w-64 bg-gray-950 border-r border-gray-800 p-5">

        <h2 className="text-xl font-bold mb-6 text-white">
          Admin Panel
        </h2>

        <ul className="space-y-2">

          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path}>
                <li
                  className={`p-2 rounded-lg cursor-pointer transition ${
                    isActive
                      ? "bg-green-600 text-white font-medium shadow-md border-l-4 border-green-600"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.label}
                </li>
              </Link>
            );
          })}

        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-2xl font-bold text-white">
            {title}
          </h1>

        </div>

        {/* Page Content */}
        <div className="bg-gray-800 rounded-xl shadow-md p-4 border border-gray-700">
          {children}
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;