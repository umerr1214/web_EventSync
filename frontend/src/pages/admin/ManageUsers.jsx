// src/pages/admin/ManageUsers.jsx
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";

const ManageUsers = () => {
  // Mock users (replace later with API)
  const [users, setUsers] = useState([
    { id: 1, email: "user@gmail.com", role: "student" },
    { id: 2, email: "society@gmail.com", role: "society" },
    { id: 3, email: "admin@gmail.com", role: "admin" },
  ]);

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleRoleChange = (id, newRole) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
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
              <tr key={user.id} className="border-t text-gray-600 hover:bg-emerald-200">
                <td className="p-4">{user.email}</td>

                <td className="p-4 capitalize">{user.role}</td>

                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user.id, e.target.value)
                    }
                    className="p-2 border rounded-lg"
                  >
                    <option value="student">Student</option>
                    <option value="society">Society</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No users available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ManageUsers;