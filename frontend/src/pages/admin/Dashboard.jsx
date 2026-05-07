import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import TicketCard from "../../components/TicketCard";
import { getEvents } from "../../services/eventService.js";
import { getUsers } from "../../services/userService.js";
import { getAllTickets } from "../../services/ticketService.js";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);

  useEffect(() => {
    getEvents().then(setEvents).catch(console.error);
    getUsers().then((u) => setUserCount(u.length)).catch(console.error);
    getAllTickets().then((t) => setTicketCount(t.length)).catch(console.error);
  }, []);

  return (
    <AdminLayout title="Dashboard">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold mt-2">{userCount}</p>
        </div>
        <div className="bg-gray-900 p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Total Events</h3>
          <p className="text-2xl font-bold mt-2">{events.length}</p>
        </div>
        <div className="bg-gray-900 p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Tickets Sold</h3>
          <p className="text-2xl font-bold mt-2">{ticketCount}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Latest Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev) => (
            <TicketCard
              key={ev._id}
              event={ev.title}
              date={ev.date}
              venue={ev.venue}
              price={ev.price}
              capacity={ev.capacity}
              image={ev.image}
            />
          ))}
        </div>
      </div>

    </AdminLayout>
  );
};

export default AdminDashboard;
