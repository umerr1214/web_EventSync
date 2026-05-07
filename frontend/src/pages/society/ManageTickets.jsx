import { useState, useEffect } from "react";
import { getSocietyTickets } from "../../services/ticketService.js";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getSocietyTickets().then(setTickets).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Tickets / Event Entries</h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="p-4">Buyer</th>
              <th className="p-4">Event</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="border-t hover:bg-gray-50">
                <td className="p-4">{ticket.user?.email}</td>
                <td className="p-4">{ticket.event?.title}</td>
                <td className="p-4">{ticket.event?.date ? new Date(ticket.event.date).toLocaleDateString() : ""}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      ticket.status === "used"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
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
    </div>
  );
};

export default ManageTickets;
