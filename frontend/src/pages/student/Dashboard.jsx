import React from "react";
import { Link } from "react-router-dom";
import StudentLayout from "../../components/StudentLayout";
import EventCard from "../../components/EventCard";

const mockEvents = [
  {
    id: 1,
    event: "Music Night",
    date: "2026-04-10",
    venue: "Auditorium",
    price: 500,
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: 2,
    event: "Sports Gala",
    date: "2026-04-15",
    venue: "Main Ground",
    price: 300,
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: 3,
    event: "Art Exhibition",
    date: "2026-04-20",
    venue: "Gallery Hall",
    price: 200,
    image: "https://via.placeholder.com/400x200",
  },
];

const StudentDashboard = () => {
  const upcomingEvents = mockEvents; // can replace later with API/context
  const totalEvents = mockEvents.length;
  const myTickets = 3; // replace with actual ticket context later

  return (
    <StudentLayout title="Student Dashboard">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Events Available</h3>
          <p className="text-2xl font-bold mt-2">{totalEvents}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">My Tickets</h3>
          <p className="text-2xl font-bold mt-2">{myTickets}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Upcoming Events</h3>
          <p className="text-2xl font-bold mt-2">{upcomingEvents.length}</p>
        </div>
      </div>

      {/* Upcoming Events Grid */}
      <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.map((ev) => (
          <Link key={ev.id} to={`/student/events/${ev.id}`}>
            <EventCard
              event={ev.event}
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