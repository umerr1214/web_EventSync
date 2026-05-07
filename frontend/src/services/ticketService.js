import api from "./api.js";

export const buyTicket = (eventId) =>
  api("/tickets", { method: "POST", body: JSON.stringify({ eventId }) });

export const getMyTickets = () => api("/tickets/my");

export const getAllTickets = () => api("/tickets");

export const getSocietyTickets = () => api("/tickets/society");

export const markTicketUsed = (id) =>
  api(`/tickets/${id}/use`, { method: "PUT" });
