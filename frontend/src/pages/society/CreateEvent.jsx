import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SocietyLayout from "../../components/SocietyLayout";
import { createEvent } from "../../services/eventService";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    time: "",
    category: "general",
    price: "",
    capacity: "",
    poster: null,
  });

  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, poster: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.date || !form.venue) {
      alert("Please fill required fields");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await createEvent({
        title: form.title,
        description: form.description,
        venue: form.venue,
        date: form.date,
        time: form.time,
        category: form.category,
        price: form.price,
        capacity: form.capacity,
        poster: form.poster,
      });
      navigate("/society/events");
    } catch (err) {
      setError(err.message || "Failed to create event");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SocietyLayout title="Create Event">
      <div className="bg-gray-900 border border-gray-700 w-full max-w-3xl p-8 rounded-2xl shadow-lg mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white">Create New Event</h1>
          <p className="text-gray-400 text-sm mt-1">
            Fill in the details to publish your event
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-200 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Music Night 2026"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe your event..."
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">
              Venue
            </label>
            <input
              type="text"
              name="venue"
              placeholder="e.g. Auditorium Hall"
              value={form.venue}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-200">
              Category
            </label>
            <input
              type="text"
              name="category"
              placeholder="e.g. music, sports, tech"
              value={form.category}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Price & Capacity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200">
                Ticket Price (Rs)
              </label>
              <input
                type="number"
                name="price"
                placeholder="500"
                value={form.price}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-200">
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                placeholder="100"
                value={form.capacity}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-200">
              Event Poster
            </label>

            <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-emerald-500 transition bg-gray-950">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />

              <p className="text-sm text-gray-400 mt-2">
                Upload an image for your event
              </p>
            </div>

            {/* Preview */}
            <img
              src={
                preview ||
                "https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
              }
              alt="Preview"
              className="mt-4 w-full h-48 object-cover rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition shadow-md disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create Event"}
          </button>

        </form>

      </div>
    </SocietyLayout>
  );
};

export default CreateEvent;