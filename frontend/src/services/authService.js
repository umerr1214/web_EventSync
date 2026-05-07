import api from "./api.js";

export const login = (email, password) =>
  api("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });

export const register = (email, password, role) =>
  api("/auth/register", { method: "POST", body: JSON.stringify({ email, password, role }) });
