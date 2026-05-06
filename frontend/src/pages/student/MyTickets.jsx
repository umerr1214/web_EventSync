// src/pages/student/MyTickets.jsx
import React, { useEffect, useState } from "react";
import StudentLayout from "../../components/StudentLayout";
import { myTickets } from "../../services/ticketService";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await myTickets();
        if (!cancelled) setTickets(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load tickets");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <StudentLayout title="My Tickets">
      {loading ? (
        <p className="text-gray-400 text-center mt-10">Loading tickets...</p>
      ) : error ? (
        <p className="text-red-300 text-center mt-10">{error}</p>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-emerald-400">
                  {ticket.event?.title || "Event"}
                </h2>
                <p className="text-gray-400">
                  📅 {ticket.event?.date ? new Date(ticket.event.date).toLocaleString() : "-"}
                </p>
                <p className="text-gray-400">📍 {ticket.event?.venue || "-"}</p>
                <p className="text-gray-200 font-semibold">
                  🎟 Ticket ID: {ticket._id.slice(-8).toUpperCase()}
                </p>
                <p className="text-gray-200 font-semibold">
                  💰 Price: Rs {ticket.event?.price ?? "-"}
                </p>
              </div>
              <span
                className={`mt-4 px-3 py-1 rounded-full text-sm ${
                  ticket.status === "used"
                    ? "bg-green-900/30 text-green-200 border border-green-800"
                    : "bg-yellow-900/30 text-yellow-200 border border-yellow-800"
                }`}
              >
                {ticket.status}
              </span>
            </div>
          ))
        ) : (
          <div className="bg-gray-900 border border-gray-700 p-8 rounded-2xl shadow text-center col-span-full">
            <p className="text-gray-200">No tickets purchased yet.</p>
            <p className="text-sm text-gray-400 mt-2">
              Browse events and buy tickets to see them here.
            </p>
          </div>
        )}
      </div>
      )}
    </StudentLayout>
  );
};

export default MyTickets;