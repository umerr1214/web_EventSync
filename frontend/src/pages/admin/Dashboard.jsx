import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import TicketCard from "../../components/TicketCard";
import { getEvents } from "../../services/eventService.js";
import { getUsers } from "../../services/userService.js";
import { getAllTickets } from "../../services/ticketService.js";

const EventDetailModal = ({ event, onClose }) => {
  if (!event) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={event.image || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819"}
          alt={event.title}
          className="w-full h-52 object-cover"
        />
        <div className="p-6 space-y-3">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-white">{event.title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none ml-4">×</button>
          </div>

          {event.description && (
            <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
          )}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Date</p>
              <p className="text-gray-200 text-sm font-medium">{new Date(event.date).toLocaleDateString()}</p>
            </div>
            {event.time && (
              <div className="bg-gray-800 rounded-xl p-3">
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Time</p>
                <p className="text-gray-200 text-sm font-medium">{event.time}</p>
              </div>
            )}
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Venue</p>
              <p className="text-gray-200 text-sm font-medium">{event.venue}</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Price</p>
              <p className="text-emerald-400 text-sm font-semibold">Rs {event.price}</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Capacity</p>
              <p className="text-gray-200 text-sm font-medium">{event.ticketsSold ?? 0} / {event.capacity} sold</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Status</p>
              <p className={`text-sm font-medium ${event.ticketsSold >= event.capacity ? "text-red-400" : "text-emerald-400"}`}>
                {event.ticketsSold >= event.capacity ? "Sold Out" : "Available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
              showBuyButton={false}
              onClick={() => setSelectedEvent(ev)}
            />
          ))}
        </div>
      </div>

      <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />

    </AdminLayout>
  );
};

export default AdminDashboard;
