import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../services/eventService.js";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    time: "",
    price: "",
    capacity: "",
    image: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.date || !form.venue) {
      setError("Please fill required fields");
      return;
    }
    try {
      await createEvent({
        ...form,
        price: Number(form.price),
        capacity: Number(form.capacity),
      });
      navigate("/society/events");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-lg">

        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Create New Event</h1>
          <p className="text-gray-500 text-sm mt-1">Fill in the details to publish your event</p>
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-1">Event Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Music Night 2026"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Describe your event..."
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Venue</label>
            <input
              type="text"
              name="venue"
              placeholder="e.g. Auditorium Hall"
              value={form.venue}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ticket Price (Rs)</label>
              <input
                type="number"
                name="price"
                placeholder="500"
                value={form.price}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Capacity</label>
              <input
                type="number"
                name="capacity"
                placeholder="100"
                value={form.capacity}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Event Poster URL</label>
            <input
              type="text"
              name="image"
              placeholder="https://..."
              value={form.image}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-4 w-full h-48 object-cover rounded-lg"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition shadow-md"
          >
            Create Event
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
