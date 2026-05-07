import { useState, useEffect } from "react";
import StudentLayout from "../../components/StudentLayout";
import { getMyTickets } from "../../services/ticketService.js";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getMyTickets().then(setTickets).catch(console.error);
  }, []);

  return (
    <StudentLayout title="My Tickets">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-gray-700">{ticket.event?.title}</h2>
                <p className="text-gray-600">📅 {ticket.event?.date ? new Date(ticket.event.date).toLocaleDateString() : ""}</p>
                <p className="text-gray-600">📍 {ticket.event?.venue}</p>
                <p className="text-gray-700 font-semibold">💰 Price: Rs {ticket.event?.price}</p>
              </div>
              <span
                className={`mt-4 px-3 py-1 rounded-full text-sm ${
                  ticket.status === "used"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {ticket.status}
              </span>
            </div>
          ))
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow text-center col-span-full">
            <p className="text-gray-500">No tickets purchased yet.</p>
            <p className="text-sm text-gray-400 mt-2">Browse events and buy tickets to see them here.</p>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default MyTickets;
