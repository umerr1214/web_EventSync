// src/pages/admin/ManageEvents.jsx
import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { deleteEvent, listEvents } from "../../services/eventService";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listEvents();
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
    const ok = window.confirm("Delete this event?");
    if (!ok) return;
    (async () => {
      try {
        await deleteEvent(id);
        await load();
      } catch (err) {
        alert(err.message || "Failed to delete event");
      }
    })();
  };

  return (
    <AdminLayout title="Manage Events">
      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-200 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-950 text-gray-300">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Date</th>
              <th className="p-4">Venue</th>
              <th className="p-4">Availability</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event._id} className="border-t border-gray-800 text-gray-200 hover:bg-gray-950/40">
                  <td className="p-4">{event.title}</td>
                  <td className="p-4">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="p-4">{event.venue}</td>
                  <td className="p-4">
                    {event.ticketsAvailable ?? "-"} / {event.capacity}
                  </td>

                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}

            {events.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-400">
                  No events available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ManageEvents;