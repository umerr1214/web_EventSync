import { apiFetch } from "./apiClient";

export function listEvents(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v == null || v === "") return;
    qs.set(k, v);
  });
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return apiFetch(`/events${suffix}`);
}

export function getEvent(id) {
  return apiFetch(`/events/${id}`);
}

export function listMyEvents() {
  return apiFetch("/events/mine");
}

export function createEvent(form) {
  const fd = new FormData();
  Object.entries(form).forEach(([k, v]) => {
    if (v == null) return;
    if (k === "poster" && v instanceof File) fd.append("poster", v);
    else fd.append(k, String(v));
  });
  return apiFetch("/events", { method: "POST", body: fd });
}

export function updateEvent(id, patch) {
  const fd = new FormData();
  Object.entries(patch).forEach(([k, v]) => {
    if (v == null) return;
    if (k === "poster" && v instanceof File) fd.append("poster", v);
    else fd.append(k, String(v));
  });
  return apiFetch(`/events/${id}`, { method: "PUT", body: fd });
}

export function deleteEvent(id) {
  return apiFetch(`/events/${id}`, { method: "DELETE" });
}

