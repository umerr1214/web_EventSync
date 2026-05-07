import { useState, useEffect } from "react";
import StudentLayout from "../../components/StudentLayout";
import EventCard from "../../components/EventCard";
import { Link } from "react-router-dom";
import { getEvents } from "../../services/eventService.js";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getEvents().then(setEvents).catch(console.error);
  }, []);

  const filteredEvents = events.filter((ev) => {
    const query = search.toLowerCase();
    return (
      ev.title?.toLowerCase().includes(query) ||
      ev.venue?.toLowerCase().includes(query) ||
      ev.date?.includes(query)
    );
  });

  return (
    <StudentLayout title="Browse Events">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by event name, location or date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">No events found!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <Link key={ev._id} to={`/student/events/${ev._id}`}>
              <EventCard
                event={ev.title}
                date={ev.date}
                venue={ev.venue}
                price={ev.price}
                image={ev.image}
              />
            </Link>
          ))}
        </div>
      )}
    </StudentLayout>
  );
};

export default Events;
