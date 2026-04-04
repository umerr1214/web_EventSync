// src/pages/admin/Dashboard.jsx
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <ul className="space-y-3">
          <li className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
            Dashboard
          </li>
          <li className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
            Manage Users
          </li>
          <Link to="/admin/events">
            <li className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
                Manage Events
            </li>
          </Link>
          <li className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
            Tickets
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>

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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="text-gray-500">Total Users</h3>
            <p className="text-2xl font-bold mt-2">120</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="text-gray-500">Total Events</h3>
            <p className="text-2xl font-bold mt-2">45</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="text-gray-500">Tickets Sold</h3>
            <p className="text-2xl font-bold mt-2">320</p>
          </div>

        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

          <ul className="space-y-3 text-gray-600">
            <li>🎉 New event "Music Night" created</li>
            <li>👤 New user registered</li>
            <li>🎟️ 10 tickets sold for Sports Gala</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;