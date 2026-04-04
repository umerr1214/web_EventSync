// src/pages/admin/ManageEvents.jsx
import { useState } from "react";

const ManageEvents = () => {
  // Mock Data (replace later with API)
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Music Night",
      date: "2026-04-10",
      venue: "Auditorium",
      tickets: 100,
    },
    {
      id: 2,
      title: "Sports Gala",
      date: "2026-04-15",
      venue: "Ground",
      tickets: 200,
    },
  ]);

  const handleDelete = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-6">Manage Events</h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Date</th>
              <th className="p-4">Venue</th>
              <th className="p-4">Tickets</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{event.title}</td>
                <td className="p-4">{event.date}</td>
                <td className="p-4">{event.venue}</td>
                <td className="p-4">{event.tickets}</td>

                <td className="p-4 flex gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {events.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No events available
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>
    </div>
  );
};

export default ManageEvents;