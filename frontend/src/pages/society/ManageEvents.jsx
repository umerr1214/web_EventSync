import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SocietyLayout from "../../components/SocietyLayout";
import { deleteEvent, listMyEvents } from "../../services/eventService";

const ManageEvents = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listMyEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;
    (async () => {
      try {
        await deleteEvent(id);
        await load();
      } catch (err) {
        alert(err.message || "Failed to delete");
      }
    })();
  };

  const handleEdit = (id) => {
    navigate(`/society/edit-event/${id}`);
  };

  return (
    <SocietyLayout title="Manage Events">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <p className="text-gray-400 text-sm mt-1">
            Create, edit and track your events easily
          </p>
        </div>

        <button
          onClick={() => navigate("/society/create-event")}
          className="bg-emerald-600 text-white px-5 py-2 rounded-xl hover:bg-emerald-700 transition shadow-md"
        >
          + Create Event
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-center mt-10">Loading events...</p>
      ) : error ? (
        <p className="text-red-300 text-center mt-10">{error}</p>
      ) : events.length === 0 ? (
        <div className="text-center text-gray-400 mt-20 text-lg">
          No events created yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-gray-900 border border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
            >
              <img
                src={
                  event.posterUrl
                    ? `${import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:5000"}${event.posterUrl}`
                    : "https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
                }
                alt={event.title}
                className="w-full h-44 object-cover"
              />

              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-white">{event.title}</h2>
                <p className="text-gray-400 text-sm">📅 {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-400 text-sm">📍 {event.venue}</p>

                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-emerald-400 font-semibold">Rs {event.price}</span>
                  <span className="text-gray-400">
                    {event.ticketsAvailable ?? "-"} / {event.capacity} left
                  </span>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(event._id)}
                    className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition border border-gray-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(event._id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </SocietyLayout>
  );
};

export default ManageEvents;