import { useEffect, useMemo, useState } from "react";
import StudentLayout from "../../components/StudentLayout";
import EventCard from "../../components/EventCard";
import { Link } from "react-router-dom";
import { listEvents } from "../../services/eventService";

const Events = () => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await listEvents({ q: search });
        if (!cancelled) setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load events");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [search]);

  const filteredEvents = useMemo(() => events, [events]);

  return (
    <StudentLayout title="Browse Events">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by event name, location or date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Events Grid */}
      {loading ? (
        <p className="text-gray-400 text-center mt-10">Loading events...</p>
      ) : error ? (
        <p className="text-red-300 text-center mt-10">{error}</p>
      ) : filteredEvents.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">
          No events found!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
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

export default Events;