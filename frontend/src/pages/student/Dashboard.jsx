import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StudentLayout from "../../components/StudentLayout";
import EventCard from "../../components/EventCard";
import { getEvents } from "../../services/eventService.js";
import { getMyTickets } from "../../services/ticketService.js";

const StudentDashboard = () => {
  const [events, setEvents] = useState([]);
  const [ticketCount, setTicketCount] = useState(0);

  useEffect(() => {
    getEvents().then(setEvents).catch(console.error);
    getMyTickets().then((t) => setTicketCount(t.length)).catch(console.error);
  }, []);

  return (
    <StudentLayout title="Student Dashboard">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-700 p-5 rounded-2xl shadow">
          <h3 className="text-gray-400">Events Available</h3>
          <p className="text-2xl font-bold mt-2 text-white">{events.length}</p>
        </div>
        <div className="bg-gray-900 border border-gray-700 p-5 rounded-2xl shadow">
          <h3 className="text-gray-400">My Tickets</h3>
          <p className="text-2xl font-bold mt-2 text-white">{ticketCount}</p>
        </div>
        <div className="bg-gray-900 border border-gray-700 p-5 rounded-2xl shadow">
          <h3 className="text-gray-400">Upcoming Events</h3>
          <p className="text-2xl font-bold mt-2 text-white">{events.length}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-gray-200">Upcoming Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <Link key={ev._id} to={`/student/events/${ev._id}`}>
            <EventCard
              event={ev.title}
              date={ev.date}
              venue={ev.venue}
              price={ev.price}
              image={ev.image}
            />
          </Link>
        ))}
      </div>

    </StudentLayout>
  );
};

export default StudentDashboard;
