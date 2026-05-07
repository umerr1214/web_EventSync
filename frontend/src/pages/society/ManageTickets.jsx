import { useState, useEffect } from "react";
import SocietyLayout from "../../components/SocietyLayout";
import { getSocietyTickets } from "../../services/ticketService.js";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getSocietyTickets().then(setTickets).catch(console.error);
  }, []);

  return (
    <SocietyLayout title="Tickets">
      <div className="bg-gray-900 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-950 text-gray-400 text-sm uppercase tracking-wide">
            <tr>
              <th className="p-4">Buyer</th>
              <th className="p-4">Event</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="border-t border-gray-800 text-gray-200 hover:bg-gray-800 transition">
                <td className="p-4">{ticket.user?.email}</td>
                <td className="p-4">{ticket.event?.title}</td>
                <td className="p-4">{ticket.event?.date ? new Date(ticket.event.date).toLocaleDateString() : ""}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      ticket.status === "used"
                        ? "bg-green-900/50 text-green-300"
                        : "bg-yellow-900/50 text-yellow-300"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
              </tr>
            ))}
            {tickets.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">No tickets found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </SocietyLayout>
  );
};

export default ManageTickets;
