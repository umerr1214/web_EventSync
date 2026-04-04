import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageEvents = () => {
  const navigate = useNavigate();

  // Mock events (replace later with API)
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Music Night",
      date: "2026-04-10",
      venue: "Auditorium",
      price: 500,
      capacity: 100,
      image: "https://via.placeholder.com/400x200",
    },
    {
      id: 2,
      title: "Sports Gala",
      date: "2026-04-15",
      venue: "Main Ground",
      price: 300,
      capacity: 200,
      image: "https://via.placeholder.com/400x200",
    },
  ]);

  // Delete event
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (confirmDelete) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  // Navigate to edit (you'll build later)
  const handleEdit = (id) => {
    navigate(`/society/edit-event/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Your Events</h1>

        <button
          onClick={() => navigate("/society/create-event")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Create Event
        </button>
      </div>

      {/* Events Grid */}
      {events.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No events created yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow overflow-hidden"
            >
              {/* Image */}
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover"
              />

              {/* Content */}
              <div className="p-4 space-y-2">

                <h2 className="text-lg font-semibold">
                  {event.title}
                </h2>

                <p className="text-gray-500 text-sm">
                  {event.date} • {event.venue}
                </p>

                <p className="text-sm">
                  🎟 Price: Rs {event.price}
                </p>

                <p className="text-sm">
                  👥 Capacity: {event.capacity}
                </p>

                {/* Buttons */}
                <div className="flex gap-2 mt-3">

                  <button
                    onClick={() => handleEdit(event.id)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(event.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
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