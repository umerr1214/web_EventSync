import { createContext, useContext } from "react";

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  return (
    <TicketContext.Provider value={{}}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => useContext(TicketContext);
