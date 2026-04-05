// src/pages/student/Events.jsx
import React from "react";
import { Link } from "react-router-dom";
import StudentLayout from "../../components/StudentLayout";
import EventCard from "../../components/EventCard";

const events = [
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

const Events = () => {
  return (
    <StudentLayout title="Browse Events">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
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

export default Events;