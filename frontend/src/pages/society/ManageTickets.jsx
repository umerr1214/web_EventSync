import { useEffect, useMemo, useState } from "react";
import SocietyLayout from "../../components/SocietyLayout";
import { listMyEvents } from "../../services/eventService";
import { markUsed, ticketsForEvent } from "../../services/ticketService";

const ManageTickets = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const evs = await listMyEvents();
        if (cancelled) return;
        setEvents(Array.isArray(evs) ? evs : []);
        const first = Array.isArray(evs) && evs.length ? evs[0]._id : "";
        setSelectedEventId(first);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load events");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedEventId) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const t = await ticketsForEvent(selectedEventId);
        if (!cancelled) setTickets(Array.isArray(t) ? t : []);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load tickets");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedEventId]);

  const selectedEvent = useMemo(
    () => events.find((e) => e._id === selectedEventId),
    [events, selectedEventId]
  );

  const handleMarkUsed = async (id) => {
    try {
      await markUsed(id);
      const t = await ticketsForEvent(selectedEventId);
      setTickets(Array.isArray(t) ? t : []);
    } catch (err) {
      alert(err.message || "Failed to mark used");
    }
  };

  return (
    <SocietyLayout title="Manage Tickets / Entries">
      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-200 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4 mb-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="text-gray-200">
          <div className="font-semibold">{selectedEvent?.title || "Select an event"}</div>
          <div className="text-sm text-gray-400">
            {selectedEvent?.date ? new Date(selectedEvent.date).toLocaleString() : ""}
          </div>
        </div>

        <select
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
          className="p-2 rounded-lg bg-gray-950 border border-gray-700 text-white w-full md:w-80"
        >
          {events.map((e) => (
            <option key={e._id} value={e._id}>
              {e.title}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-950 text-gray-300">
            <tr>
              <th className="p-4">Buyer</th>
              <th className="p-4">Receipt</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : tickets.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-400">
                  No tickets found
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr key={ticket._id} className="border-t border-gray-800 hover:bg-gray-950/40">
                  <td className="p-4 text-gray-200">
                    {ticket.user?.email || ticket.buyerName || "-"}
                  </td>
                  <td className="p-4 text-gray-400">{ticket.receiptNumber || "-"}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm border ${
                        ticket.status === "used"
                          ? "bg-green-900/30 text-green-200 border-green-800"
                          : "bg-yellow-900/30 text-yellow-200 border-yellow-800"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {ticket.status === "unused" && (
                      <button
                        onClick={() => handleMarkUsed(ticket._id)}
                        className="bg-emerald-600 text-white px-3 py-1 rounded-lg hover:bg-emerald-700"
                      >
                        Mark as Used
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </SocietyLayout>
  );
};

export default ManageTickets;