import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { getUsers, deleteUser, updateUserRole } from "../../services/userService.js";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers).catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      const updated = await updateUserRole(id, newRole);
      setUsers(users.map((u) => (u._id === id ? updated : u)));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <AdminLayout title="Manage Users">
      <div className="bg-gray-900 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-950 text-gray-400 text-sm uppercase tracking-wide">
            <tr>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Change Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-gray-800 text-gray-200 hover:bg-gray-800 transition">
                <td className="p-4">{user.email}</td>
                <td className="p-4 capitalize">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === "admin" ? "bg-red-900/50 text-red-300" :
                    user.role === "society" ? "bg-blue-900/50 text-blue-300" :
                    "bg-emerald-900/50 text-emerald-300"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="student">Student</option>
                    <option value="society">Society</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">No users available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ManageUsers;
