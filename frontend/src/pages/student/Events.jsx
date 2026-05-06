import { useState } from "react";
import StudentLayout from "../../components/StudentLayout";
import EventCard from "../../components/EventCard";
import { Link } from "react-router-dom";

const mockEvents = [
  {
    id: 1,
    event: "Music Night",
    date: "2026-04-10",
    venue: "Auditorium",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1374&auto=format&fit=crop",
  },
  {
    id: 2,
    event: "Sports Gala",
    date: "2026-04-15",
    venue: "Main Ground",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1521055170349-25f955971658?q=80&w=1473&auto=format&fit=crop",
  },
  {
    id: 3,
    event: "Art Exhibition",
    date: "2026-04-20",
    venue: "Gallery Hall",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1606819717115-9159c900370b?q=80&w=1470&auto=format&fit=crop",
  },
];

const Events = () => {
  const [search, setSearch] = useState("");

  // filtering logic (title / venue / date)
  const filteredEvents = mockEvents.filter((event) => {
    const query = search.toLowerCase();

    return (
      event.event.toLowerCase().includes(query) ||
      event.venue.toLowerCase().includes(query) ||
      event.date.includes(query)
    );
  });

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
      {filteredEvents.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">
          No events found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <Link key={ev.id} to={`/student/events/${ev.id}`}>
              <EventCard
                event={ev.event}
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