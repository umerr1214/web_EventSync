// src/pages/student/Dashboard.jsx
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
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1374&auto=format&fit=crop",
  },
  {
    id: 2,
    event: "Sports Gala",
    date: "2026-04-15",
    venue: "Main Ground",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1521055170349-25f955971658?q=80&w=1473&auto=format&fit=crop",
  },
  {
    id: 3,
    event: "Art Exhibition",
    date: "2026-04-20",
    venue: "Gallery Hall",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1606819717115-9159c900370b?q=80&w=1470&auto=format&fit=crop",
  },
];

const StudentDashboard = () => {
  const upcomingEvents = mockEvents;
  const totalEvents = mockEvents.length;
  const myTickets = 3;

  return (
    <StudentLayout title="Student Dashboard">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-gray-900 border border-gray-700 p-5 rounded-2xl shadow">
          <h3 className="text-gray-400">Events Available</h3>
          <p className="text-2xl font-bold mt-2 text-white">
            {totalEvents}
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-700 p-5 rounded-2xl shadow">
          <h3 className="text-gray-400">My Tickets</h3>
          <p className="text-2xl font-bold mt-2 text-white">
            {myTickets}
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-700 p-5 rounded-2xl shadow">
          <h3 className="text-gray-400">Upcoming Events</h3>
          <p className="text-2xl font-bold mt-2 text-white">
            {upcomingEvents.length}
          </p>
        </div>

      </div>

      {/* Section Title */}
      <h2 className="text-xl font-semibold mb-4 text-gray-200">
        Upcoming Events
      </h2>

      {/* Events Grid */}
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