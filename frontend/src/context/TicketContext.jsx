// src/context/TicketContext.jsx
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const { user } = useAuth();
  
  const [events, setEvents] = useState([
    { id: 1, title: "Music Night", ticketsLeft: 50 },
    { id: 2, title: "Sports Gala", ticketsLeft: 100 },
  ]);

  const addTicket = (ticket) => {
    const exists = tickets.find(
      (t) =>
        t.eventId === ticket.eventId &&
        t.userEmail === user.email
    );

    if (exists) {
      alert("You already have a ticket for this event!");
      return false;
    }

    const event = events.find((e) => e.id === ticket.eventId);

    if (!event || event.ticketsLeft <= 0) {
      alert("No tickets available!");
      return false;
    }

    // Reduce ticket count
    setEvents((prev) =>
      prev.map((e) =>
        e.id === ticket.eventId
          ? { ...e, ticketsLeft: e.ticketsLeft - 1 }
          : e
      )
    );

    setTickets((prev) => [
      ...prev,
      {
        ...ticket,
        userEmail: user.email,
        status: "unused",
      },
    ]);

    return true;
  };

  return (
    <TicketContext.Provider value={{ tickets, events, addTicket, setTickets }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => useContext(TicketContext);