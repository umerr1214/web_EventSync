import api from "./api.js";

export const getEvents = () => api("/events");

export const getMyEvents = (userId) => api(`/events?createdBy=${userId}`);

export const getEventById = (id) => api(`/events/${id}`);

export const createEvent = (data) =>
  api("/events", { method: "POST", body: JSON.stringify(data) });

export const updateEvent = (id, data) =>
  api(`/events/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteEvent = (id) =>
  api(`/events/${id}`, { method: "DELETE" });
