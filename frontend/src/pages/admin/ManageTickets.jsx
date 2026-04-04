import { useState } from "react";

const ManageTickets = () => {
  // Mock ticket data (replace later with API)
  const [tickets, setTickets] = useState([
    {
      id: 1,
      user: "user@gmail.com",
      event: "Music Night",
      date: "2026-04-10",
      status: "unused",
    },
    {
      id: 2,
      user: "society@gmail.com",
      event: "Sports Gala",
      date: "2026-04-15",
      status: "used",
    },
  ]);

  const markAsUsed = (id) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, status: "used" } : ticket
    );
    setTickets(updatedTickets);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-6">Manage Tickets</h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Event</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-t hover:bg-gray-50">

                <td className="p-4">{ticket.user}</td>
                <td className="p-4">{ticket.event}</td>
                <td className="p-4">{ticket.date}</td>

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

                <td className="p-4">
                  {ticket.status === "unused" && (
                    <button
                      onClick={() => markAsUsed(ticket.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                    >
                      Mark as Used
                    </button>
                  )}
                </td>

              </tr>
            ))}

            {tickets.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No tickets available
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>
    </div>
  );
};

export default ManageTickets;