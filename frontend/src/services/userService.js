import api from "./api.js";

export const getUsers = () => api("/users");

export const deleteUser = (id) => api(`/users/${id}`, { method: "DELETE" });

export const updateUserRole = (id, role) =>
  api(`/users/${id}/role`, { method: "PUT", body: JSON.stringify({ role }) });
