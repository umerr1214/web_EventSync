import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { getEvents, deleteEvent } from "../../services/eventService.js";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(setEvents).catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((e) => e._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <AdminLayout title="Manage Events">
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Date</th>
              <th className="p-4">Venue</th>
              <th className="p-4">Capacity</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id} className="border-t text-gray-600 hover:bg-emerald-200">
                <td className="p-4">{event.title}</td>
                <td className="p-4">{new Date(event.date).toLocaleDateString()}</td>
                <td className="p-4">{event.venue}</td>
                <td className="p-4">{event.capacity}</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">No events available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ManageEvents;
