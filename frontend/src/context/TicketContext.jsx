// src/context/TicketContext.jsx
import { createContext, useContext, useState } from "react";

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  const addTicket = (ticket) => {
    setTickets((prev) => [...prev, ticket]);
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => useContext(TicketContext);