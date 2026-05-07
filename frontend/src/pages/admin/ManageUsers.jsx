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
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Change Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t text-gray-600 hover:bg-emerald-200">
                <td className="p-4">{user.email}</td>
                <td className="p-4 capitalize">{user.role}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-2 border rounded-lg"
                  >
                    <option value="student">Student</option>
                    <option value="society">Society</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
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
