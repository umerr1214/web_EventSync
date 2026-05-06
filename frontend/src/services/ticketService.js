import { apiFetch } from "./apiClient";

export function buyTicket({ eventId, buyerName, receiptNumber, paymentMethod }) {
  return apiFetch("/tickets", {
    method: "POST",
    body: { eventId, buyerName, receiptNumber, paymentMethod },
  });
}

export function myTickets() {
  return apiFetch("/tickets/my");
}

export function ticketsForEvent(eventId) {
  return apiFetch(`/tickets/event/${eventId}`);
}

export function allTickets() {
  return apiFetch("/tickets");
}

export function markUsed(ticketId) {
  return apiFetch(`/tickets/${ticketId}/use`, { method: "PUT" });
}

