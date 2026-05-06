// src/pages/admin/ManageUsers.jsx
import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { deleteUser, listUsers, updateUserRole } from "../../services/userService";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => {
    const ok = window.confirm("Delete this user?");
    if (!ok) return;
    (async () => {
      try {
        await deleteUser(id);
        await load();
      } catch (err) {
        alert(err.message || "Failed to delete user");
      }
    })();
  };

  const handleRoleChange = (id, newRole) => {
    (async () => {
      try {
        await updateUserRole(id, newRole);
        await load();
      } catch (err) {
        alert(err.message || "Failed to update role");
      }
    })();
  };

  return (
    <AdminLayout title="Manage Users">
      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-200 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-950 text-gray-300">
            <tr>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Change Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : (
              users.map((user) => (
              <tr key={user._id} className="border-t border-gray-800 text-gray-200 hover:bg-gray-950/40">
                <td className="p-4">{user.email}</td>

                <td className="p-4 capitalize">{user.role}</td>

                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user._id, e.target.value)
                    }
                    className="p-2 rounded-lg bg-gray-950 border border-gray-700 text-white"
                  >
                    <option value="student">Student</option>
                    <option value="society">Society</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )))

            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-400">
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