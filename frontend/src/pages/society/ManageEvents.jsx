import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getMyEvents, deleteEvent } from "../../services/eventService.js";

const ManageEvents = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (user?._id) {
      getMyEvents(user._id).then(setEvents).catch(console.error);
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteEvent(id);
      setEvents(events.filter((e) => e._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Your Events</h1>
          <p className="text-gray-500 text-sm mt-1">Create, edit and track your events easily</p>
        </div>
        <button
          onClick={() => navigate("/society/create-event")}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition shadow-md"
        >
          + Create Event
        </button>
      </div>

      {events.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 text-lg">No events created yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
            >
              <img
                src={event.image || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819"}
                alt={event.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">{event.title}</h2>
                <p className="text-gray-500 text-sm">📅 {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-500 text-sm">📍 {event.venue}</p>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-blue-600 font-semibold">Rs {event.price}</span>
                  <span className="text-gray-500">{event.capacity} seats</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleDelete(event._id)}
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
