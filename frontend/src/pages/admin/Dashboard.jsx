// src/pages/admin/Dashboard.jsx
import AdminLayout from "../../components/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout title="Dashboard">
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
    </AdminLayout>
  );
};

export default AdminDashboard;