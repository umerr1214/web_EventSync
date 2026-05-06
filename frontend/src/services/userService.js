import { apiFetch } from "./apiClient";

export function listUsers() {
  return apiFetch("/users");
}

export function updateUserRole(userId, role) {
  return apiFetch(`/users/${userId}/role`, { method: "PATCH", body: { role } });
}

export function deleteUser(userId) {
  return apiFetch(`/users/${userId}`, { method: "DELETE" });
}

