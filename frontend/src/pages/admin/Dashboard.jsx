import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import TicketCard from "../../components/TicketCard";
import { listEvents } from "../../services/eventService";
import { listUsers } from "../../services/userService";
import { allTickets } from "../../services/ticketService";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
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
        const [u, e, t] = await Promise.all([listUsers(), listEvents(), allTickets()]);
        if (cancelled) return;
        setUsers(Array.isArray(u) ? u : []);
        setEvents(Array.isArray(e) ? e : []);
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

  const latestEvents = useMemo(() => events.slice(0, 6), [events]);
  const ticketsSold = tickets.length;

  return (
    <AdminLayout title="Dashboard">
      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-200 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold mt-2">{loading ? "…" : users.length}</p>
        </div>

        <div className="bg-gray-900 p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Total Events</h3>
          <p className="text-2xl font-bold mt-2">{loading ? "…" : events.length}</p>
        </div>

        <div className="bg-gray-900 p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Tickets Sold</h3>
          <p className="text-2xl font-bold mt-2">{loading ? "…" : ticketsSold}</p>
        </div>
      </div>

      {/* Latest Events */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Latest Events
        </h2>

        {loading ? (
          <p className="text-gray-400 text-center mt-10">Loading...</p>
        ) : latestEvents.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">No events yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestEvents.map((ev) => (
              <TicketCard
                key={ev._id}
                event={ev.title}
                date={new Date(ev.date).toLocaleDateString()}
                venue={ev.venue}
                price={ev.price}
                capacity={ev.capacity}
                image={
                  ev.posterUrl
                    ? `${import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:5000"}${ev.posterUrl}`
                    : undefined
                }
                onClick={() => {}}
              />
            ))}
          </div>
        )}
      </div>

    </AdminLayout>
  );
};

export default AdminDashboard;