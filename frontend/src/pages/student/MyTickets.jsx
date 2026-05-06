// src/pages/student/MyTickets.jsx
import React from "react";
import StudentLayout from "../../components/StudentLayout";
import { useTickets } from "../../context/TicketContext";

const MyTickets = () => {
  const { tickets } = useTickets();

  // fallback to mockTickets if tickets context is empty
  const mockTickets = [
    {
      id: 1,
      event: "Music Night",
      date: "2026-04-10",
      venue: "Auditorium",
      price: 500,
      ticketNumber: "A123",
      status: "Unused",
    },
    {
      id: 2,
      event: "Sports Gala",
      date: "2026-04-15",
      venue: "Main Ground",
      price: 300,
      ticketNumber: "B456",
      status: "Used",
    },
  ];

  const ticketList = tickets && tickets.length > 0 ? tickets : mockTickets;

  return (
    <StudentLayout title="My Tickets">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ticketList.length > 0 ? (
          ticketList.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-gray-700">{ticket.event}</h2>
                <p className="text-gray-600">📅 {ticket.date}</p>
                <p className="text-gray-600">📍 {ticket.venue}</p>
                <p className="text-gray-700 font-semibold">
                  🎟 Ticket No: {ticket.ticketNumber}
                </p>
                <p className="text-gray-700 font-semibold">💰 Price: Rs {ticket.price}</p>
              </div>
              <span
                className={`mt-4 px-3 py-1 rounded-full text-sm ${
                  ticket.status === "Used"
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
            <p className="text-sm text-gray-400 mt-2">
              Browse events and buy tickets to see them here.
            </p>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default MyTickets;