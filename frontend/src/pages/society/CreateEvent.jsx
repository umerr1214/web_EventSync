import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.title || !form.date || !form.venue) {
      alert("Please fill required fields");
      return;
    }

    console.log("Event Created:", form);

    // Later replace with API call

    alert("Event created successfully!");

    navigate("/society"); // redirect to dashboard
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white w-full max-w-3xl p-8 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Event
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Event Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            rows="4"
          />

          {/* Venue */}
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={form.venue}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Price & Capacity */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Ticket Price"
              value={form.price}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={form.capacity}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 font-medium">
              Upload Event Poster
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-full h-48 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Create Event
          </button>

        </form>

      </div>
    </div>
  );
};

export default CreateEvent;