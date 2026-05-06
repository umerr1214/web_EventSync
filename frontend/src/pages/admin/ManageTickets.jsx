import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { allTickets } from "../../services/ticketService";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await allTickets();
        if (!cancelled) setTickets(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load tickets");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AdminLayout title="Manage Tickets">
      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-200 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-950 text-gray-300">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Event</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr key={ticket._id} className="border-t border-gray-800 hover:bg-gray-950/40">
                  <td className="p-4 text-gray-200">{ticket.user?.email || "-"}</td>
                  <td className="p-4 text-gray-200">{ticket.event?.title || "-"}</td>
                  <td className="p-4 text-gray-400">
                    {ticket.event?.date ? new Date(ticket.event.date).toLocaleDateString() : "-"}
                  </td>

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
                </tr>
              ))
            )}

            {tickets.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-400">
                  No tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ManageTickets;