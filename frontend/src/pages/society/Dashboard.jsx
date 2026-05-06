import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SocietyLayout from "../../components/SocietyLayout";
import { listMyEvents } from "../../services/eventService";

const SocietyDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await listMyEvents();
        if (!cancelled) setEvents(Array.isArray(data) ? data : []);
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

  return (
    <SocietyLayout title="Dashboard">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white">Welcome</h2>
        <p className="text-gray-400 mt-1">
          Create events, track ticket availability, and manage entries.
        </p>

        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-200 text-sm p-3 rounded-lg mt-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
            <div className="text-gray-400 text-sm">My Events</div>
            <div className="text-2xl font-bold text-white mt-1">{loading ? "…" : events.length}</div>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
            <div className="text-gray-400 text-sm">Upcoming</div>
            <div className="text-2xl font-bold text-white mt-1">
              {loading ? "…" : events.filter((e) => new Date(e.date) >= new Date()).length}
            </div>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
            <div className="text-gray-400 text-sm">Sold Out</div>
            <div className="text-2xl font-bold text-white mt-1">
              {loading ? "…" : events.filter((e) => (e.ticketsAvailable ?? 0) <= 0).length}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/society/create-event">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition">
              Create Event
            </button>
          </Link>

          <Link to="/society/events">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition border border-gray-700">
              Manage Events
            </button>
          </Link>

          <Link to="/society/tickets">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition border border-gray-700">
              Manage Tickets
            </button>
          </Link>
        </div>
      </div>
    </SocietyLayout>
  );
};

export default SocietyDashboard;