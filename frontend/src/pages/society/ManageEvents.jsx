import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageEvents = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Music Night",
      date: "2026-04-10",
      venue: "Auditorium",
      price: 500,
      capacity: 100,
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    },
    {
      id: 2,
      title: "Sports Gala",
      date: "2026-04-15",
      venue: "Main Ground",
      price: 300,
      capacity: 200,
      image:
        "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
    },
  ]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (confirmDelete) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/society/edit-event/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Your Events
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Create, edit and track your events easily
          </p>
        </div>

        <button
          onClick={() => navigate("/society/create-event")}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition shadow-md hover:shadow-lg"
        >
          + Create Event
        </button>
      </div>

      {/* Empty State */}
      {events.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 text-lg">
          No events created yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Image */}
              <img
                src={
                  event.image ||
                  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
                }
                alt={event.title}
                className="w-full h-44 object-cover"
              />

              {/* Content */}
              <div className="p-4 space-y-2">

                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-800">
                  {event.title}
                </h2>

                {/* Date + Venue */}
                <p className="text-gray-500 text-sm">
                  📅 {event.date}
                </p>

                <p className="text-gray-500 text-sm">
                  📍 {event.venue}
                </p>

                {/* Price + Capacity */}
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-blue-600 font-semibold">
                    Rs {event.price}
                  </span>

                  <span className="text-gray-500">
                    {event.capacity} seats
                  </span>
                </div>

                {/* Status Badge */}
                <span className="inline-block mt-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  Upcoming
                </span>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(event.id)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(event.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default ManageEvents;