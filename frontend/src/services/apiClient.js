const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("eventsync_token");
}

export function setToken(token) {
  if (!token) localStorage.removeItem("eventsync_token");
  else localStorage.setItem("eventsync_token", token);
}

export async function apiFetch(path, { method = "GET", headers, body } = {}) {
  const token = getToken();
  const url = path.startsWith("http") ? path : `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(headers || {}),
    },
    body: body instanceof FormData ? body : body != null ? JSON.stringify(body) : undefined,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : await res.text().catch(() => "");

  if (!res.ok) {
    const message =
      (data && typeof data === "object" && data.message) ||
      (typeof data === "string" && data) ||
      `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

