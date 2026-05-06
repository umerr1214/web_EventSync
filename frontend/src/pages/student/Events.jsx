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
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1374&auto=format&fit=crop",
  },
  {
    id: 2,
    event: "Sports Gala",
    date: "2026-04-15",
    venue: "Main Ground",
    price: 300,
    image: "https://images.unsplash.com/photo-1521055170349-25f955971658?q=80&w=1473&auto=format&fit=crop",
  },
  {
    id: 3,
    event: "Art Exhibition",
    date: "2026-04-20",
    venue: "Gallery Hall",
    price: 200,
    image: "https://images.unsplash.com/photo-1606819717115-9159c900370b?q=80&w=1470&auto=format&fit=crop",
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