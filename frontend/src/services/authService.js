import { apiFetch, setToken } from "./apiClient";

export async function login({ email, password }) {
  const data = await apiFetch("/auth/login", { method: "POST", body: { email, password } });
  setToken(data.token);
  return data;
}

export async function register({ email, password, role, societyName }) {
  const data = await apiFetch("/auth/register", {
    method: "POST",
    body: { email, password, role, societyName },
  });
  setToken(data.token);
  return data;
}

export async function me() {
  const data = await apiFetch("/auth/me");
  return data.user;
}

export function logout() {
  setToken(null);
}

