// src/pages/student/Events.jsx
import { Link } from "react-router-dom";

const Events = () => {
  // Mock data
  const events = [
    {
      id: 1,
      title: "Music Night",
      date: "2026-04-10",
      venue: "Auditorium",
      price: 500,
    },
    {
      id: 2,
      title: "Sports Gala",
      date: "2026-04-15",
      venue: "Ground",
      price: 300,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-6">Browse Events</h1>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold">{event.title}</h2>

            <p className="text-gray-500 mt-2">
              {event.date} • {event.venue}
            </p>

            <p className="mt-2 font-semibold text-blue-600">
              Rs. {event.price}
            </p>

            <Link
              to={`/student/events/${event.id}`}
              className="block mt-4 bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600"
            >
              View Details
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Events;