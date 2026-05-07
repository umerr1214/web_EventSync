import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SocietyLayout from "../../components/SocietyLayout";
import { getMyEvents } from "../../services/eventService.js";
import { getSocietyTickets } from "../../services/ticketService.js";

const SocietyDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (user?._id) {
      getMyEvents(user._id).then(setEvents).catch(console.error);
      getSocietyTickets().then(setTickets).catch(console.error);
    }
  }, [user]);

  const soldOutCount = events.filter((e) => e.ticketsSold >= e.capacity).length;

  const actions = [
    { label: "Create Event", path: "/society/create-event", color: "bg-emerald-600 hover:bg-emerald-700" },
    { label: "Manage Events", path: "/society/events", color: "bg-blue-600 hover:bg-blue-700" },
    { label: "View Tickets", path: "/society/tickets", color: "bg-purple-600 hover:bg-purple-700" },
  ];

  return (
    <SocietyLayout title="Dashboard">

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 p-5 rounded-2xl shadow">
          <h3 className="text-gray-400 text-sm">My Events</h3>
          <p className="text-3xl font-bold mt-2 text-white">{events.length}</p>
        </div>
        <div className="bg-gray-900 p-5 rounded-2xl shadow">
          <h3 className="text-gray-400 text-sm">Tickets Sold</h3>
          <p className="text-3xl font-bold mt-2 text-white">{tickets.length}</p>
        </div>
        <div className="bg-gray-900 p-5 rounded-2xl shadow">
          <h3 className="text-gray-400 text-sm">Sold Out Events</h3>
          <p className="text-3xl font-bold mt-2 text-white">{soldOutCount}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-semibold text-gray-300 mb-4">Quick Actions</h2>
      <div className="flex flex-wrap gap-4">
        {actions.map((action) => (
          <button
            key={action.path}
            onClick={() => navigate(action.path)}
            className={`${action.color} text-white px-6 py-3 rounded-xl font-medium transition shadow-md`}
          >
            {action.label}
          </button>
        ))}
      </div>

    </SocietyLayout>
  );
};

export default SocietyDashboard;
