import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SocietyLayout from "../../components/SocietyLayout";
import { getMyEvents, deleteEvent, updateEvent } from "../../services/eventService.js";

const BASE_URL = "http://localhost:5000";

const uploadImage = async (file) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Upload failed");
  return data.url;
};

const EditModal = ({ event, onClose, onSave }) => {
  const [form, setForm] = useState({
    title: event.title || "",
    description: event.description || "",
    venue: event.venue || "",
    date: event.date ? event.date.slice(0, 10) : "",
    time: event.time || "",
    price: event.price || "",
    capacity: event.capacity || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(event.image || null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setError("");
    try {
      let imageUrl = event.image || "";
      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadImage(imageFile);
        setUploading(false);
      }
      const updated = await updateEvent(event._id, {
        ...form,
        price: Number(form.price),
        capacity: Number(form.capacity),
        image: imageUrl,
      });
      onSave(updated);
    } catch (err) {
      setUploading(false);
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-white">Edit Event</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">×</button>
        </div>

        {error && (
          <p className="text-red-400 text-sm bg-red-900/30 border border-red-700 rounded-lg px-4 py-2 mb-4">{error}</p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Event Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="3"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Venue</label>
            <input type="text" name="venue" value={form.venue} onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Time</label>
              <input type="time" name="time" value={form.time} onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Price (Rs)</label>
              <input type="number" name="price" value={form.price} onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Capacity</label>
              <input type="number" name="capacity" value={form.capacity} onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Event Poster</label>
            <input type="file" accept="image/*" onChange={handleImageChange}
              className="w-full text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-700 file:text-white hover:file:bg-emerald-600" />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-3 w-full h-40 object-cover rounded-lg" />
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={uploading}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white py-2 rounded-lg transition font-medium"
          >
            {uploading ? "Uploading..." : "Save Changes"}
          </button>
          <button onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ManageEvents = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

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

  const handleSave = (updated) => {
    setEvents(events.map((e) => (e._id === updated._id ? updated : e)));
    setEditingEvent(null);
  };

  return (
    <SocietyLayout title="Manage Events">

      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/society/create-event")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl transition shadow-md"
        >
          + Create Event
        </button>
      </div>

      {events.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 text-lg">No events created yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
              <img
                src={event.image || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819"}
                alt={event.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-white">{event.title}</h2>
                <p className="text-gray-400 text-sm">📅 {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-400 text-sm">📍 {event.venue}</p>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-emerald-400 font-semibold">Rs {event.price}</span>
                  <span className="text-gray-400">{event.ticketsSold}/{event.capacity} sold</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setEditingEvent(event)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingEvent && (
        <EditModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onSave={handleSave}
        />
      )}
    </SocietyLayout>
  );
};

export default ManageEvents;
