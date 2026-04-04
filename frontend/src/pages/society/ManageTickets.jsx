import { useState } from "react";

const ManageTickets = () => {
  // Mock ticket data (replace with API later)
  const [tickets, setTickets] = useState([
    {
      id: 1,
      user: "user1@gmail.com",
      event: "Music Night",
      quantity: 2,
      status: "unused",
    },
    {
      id: 2,
      user: "user2@gmail.com",
      event: "Music Night",
      quantity: 1,
      status: "used",
    },
    {
      id: 3,
      user: "user3@gmail.com",
      event: "Sports Gala",
      quantity: 3,
      status: "unused",
    },
  ]);

  // Mark ticket as used (entry check)
  const handleMarkUsed = (id) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, status: "used" } : ticket
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">
        Manage Tickets / Event Entries
      </h1>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="p-4">Buyer</th>
              <th className="p-4">Event</th>
              <th className="p-4">Tickets</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-t hover:bg-gray-50">

                <td className="p-4">{ticket.user}</td>

                <td className="p-4">{ticket.event}</td>

                <td className="p-4">{ticket.quantity}</td>

                {/* Status Badge */}
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

                {/* Action */}
                <td className="p-4">
                  {ticket.status === "unused" && (
                    <button
                      onClick={() => handleMarkUsed(ticket.id)}
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
                  No tickets found
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