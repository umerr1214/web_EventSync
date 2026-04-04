// src/pages/student/MyTickets.jsx
import { useTickets } from "../../context/TicketContext";

const MyTickets = () => {
  const { tickets } = useTickets();

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-6">My Tickets</h1>

      <div className="space-y-4">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white p-4 rounded-lg shadow flex justify-between"
            >
              <div>
                <h3 className="font-bold">{ticket.event}</h3>
                <p className="text-gray-500 text-sm">{ticket.date}</p>
              </div>

              <span className={`px-3 py-1 rounded-full text-sm ${
                ticket.status === "used"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}>
                {ticket.status}
              </span>
            </div>
          ))
        ) : (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-500">No tickets purchased yet.</p>
            <p className="text-sm text-gray-400 mt-2">
              Browse events and buy tickets to see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;