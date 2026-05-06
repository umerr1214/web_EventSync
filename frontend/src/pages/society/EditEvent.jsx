import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SocietyLayout from "../../components/SocietyLayout";
import { getEvent, updateEvent } from "../../services/eventService";

const EditEvent = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const ev = await getEvent(id);
        if (cancelled) return;
        setForm({
          title: ev.title || "",
          description: ev.description || "",
          venue: ev.venue || "",
          date: ev.date ? new Date(ev.date).toISOString().slice(0, 10) : "",
          time: ev.time || "",
          category: ev.category || "general",
          price: ev.price ?? "",
          capacity: ev.capacity ?? "",
          poster: null,
        });
        setPreview(
          ev.posterUrl
            ? `${import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:5000"}${ev.posterUrl}`
            : null
        );
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load event");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handlePoster = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((p) => ({ ...p, poster: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await updateEvent(id, {
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
      setError(err.message || "Failed to update event");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SocietyLayout title="Edit Event">
      {loading ? (
        <p className="text-gray-400 text-center mt-10">Loading...</p>
      ) : (
        <div className="bg-gray-900 border border-gray-700 w-full max-w-3xl p-8 rounded-2xl shadow-lg mx-auto">
          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-200 text-sm p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Event title"
              className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows={4}
              className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="venue"
                value={form.venue}
                onChange={handleChange}
                placeholder="Venue"
                className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                placeholder="Capacity"
                className="w-full p-3 rounded-lg bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 bg-gray-950">
              <input type="file" accept="image/*" onChange={handlePoster} className="w-full" />
              {preview && (
                <img src={preview} alt="Poster" className="mt-4 w-full h-48 object-cover rounded-lg" />
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition shadow-md disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      )}
    </SocietyLayout>
  );
};

export default EditEvent;

