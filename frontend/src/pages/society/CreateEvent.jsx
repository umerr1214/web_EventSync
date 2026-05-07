import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SocietyLayout from "../../components/SocietyLayout";
import { createEvent } from "../../services/eventService.js";

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

const CreateEvent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", description: "", venue: "", date: "", time: "", price: "", capacity: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.date || !form.venue) {
      setError("Please fill required fields");
      return;
    }
    try {
      let imageUrl = "";
      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadImage(imageFile);
        setUploading(false);
      }
      await createEvent({
        ...form,
        price: Number(form.price),
        capacity: Number(form.capacity),
        image: imageUrl,
      });
      navigate("/society/events");
    } catch (err) {
      setUploading(false);
      setError(err.message);
    }
  };

  return (
    <SocietyLayout title="Create Event">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
      >
        ← Back
      </button>

      <div className="bg-gray-900 rounded-2xl p-8 max-w-3xl">

        {error && (
          <p className="text-red-400 text-sm bg-red-900/30 border border-red-700 rounded-lg px-4 py-2 mb-5">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Event Title *</label>
            <input
              type="text" name="title" placeholder="e.g. Music Night 2026"
              value={form.title} onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              name="description" placeholder="Describe your event..."
              value={form.description} onChange={handleChange} rows="3"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Venue *</label>
            <input
              type="text" name="venue" placeholder="e.g. Auditorium Hall"
              value={form.venue} onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Date *</label>
              <input
                type="date" name="date" value={form.date} onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Time</label>
              <input
                type="time" name="time" value={form.time} onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Ticket Price (Rs)</label>
              <input
                type="number" name="price" placeholder="500"
                value={form.price} onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Capacity</label>
              <input
                type="number" name="capacity" placeholder="100"
                value={form.capacity} onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Event Poster</label>
            <input
              type="file" accept="image/*" onChange={handleImageChange}
              className="w-full text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-700 file:text-white hover:file:bg-emerald-600"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-4 w-full h-48 object-cover rounded-lg" />
            )}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white p-3 rounded-lg transition font-medium shadow-md"
          >
            {uploading ? "Uploading image..." : "Create Event"}
          </button>

        </form>
      </div>
    </SocietyLayout>
  );
};

export default CreateEvent;
