// src/pages/student/Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import StudentLayout from "../../components/StudentLayout";
import EventCard from "../../components/EventCard";
import { listEvents } from "../../services/eventService";
import { myTickets } from "../../services/ticketService";

const StudentDashboard = () => {
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [ev, t] = await Promise.all([listEvents(), myTickets()]);
        if (cancelled) return;
        setEvents(Array.isArray(ev) ? ev : []);
        setTickets(Array.isArray(t) ? t : []);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load dashboard");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const upcomingEvents = useMemo(() => events.slice(0, 6), [events]);
  const totalEvents = events.length;
  const myTicketsCount = tickets.length;

  return (
    <StudentLayout title="Student Dashboard">
      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-200 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-gray-900 border border-gray-700 p-5 rounded-2xl shadow">
          <h3 className="text-gray-400">Events Available</h3>
          <p className="text-2xl font-bold mt-2 text-white">
            {loading ? "…" : totalEvents}
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-700 p-5 rounded-2xl shadow">
          <h3 className="text-gray-400">My Tickets</h3>
          <p className="text-2xl font-bold mt-2 text-white">
            {loading ? "…" : myTicketsCount}
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-700 p-5 rounded-2xl shadow">
          <h3 className="text-gray-400">Upcoming Events</h3>
          <p className="text-2xl font-bold mt-2 text-white">
            {loading ? "…" : upcomingEvents.length}
          </p>
        </div>

      </div>

      {/* Section Title */}
      <h2 className="text-xl font-semibold mb-4 text-gray-200">
        Upcoming Events
      </h2>

      {/* Events Grid */}
      {loading ? (
        <p className="text-gray-400 text-center mt-10">Loading...</p>
      ) : upcomingEvents.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">No upcoming events.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {upcomingEvents.map((ev) => (
          <Link key={ev._id} to={`/student/events/${ev._id}`}>
            <EventCard
              event={ev.title}
              date={new Date(ev.date).toLocaleDateString()}
              venue={ev.venue}
              price={ev.price}
              image={
                ev.posterUrl
                  ? `${import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:5000"}${ev.posterUrl}`
                  : undefined
              }
            />
          </Link>
        ))}

        </div>
      )}

    </StudentLayout>
  );
};

export default StudentDashboard;