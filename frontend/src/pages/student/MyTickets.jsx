// src/pages/student/MyTickets.jsx
const MyTickets = () => {
  const tickets = [
    { id: 1, event: "Music Night", date: "2026-04-10", status: "unused" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-6">My Tickets</h1>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between"
          >
            <div>
              <h3 className="font-bold">{ticket.event}</h3>
              <p className="text-gray-500 text-sm">{ticket.date}</p>
            </div>

            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
              {ticket.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;