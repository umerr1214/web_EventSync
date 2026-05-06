// src/pages/student/EventDetails.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentLayout from "../../components/StudentLayout";
import Modal from "../../components/Modal";
import { useTickets } from "../../context/TicketContext";

const mockEvents = {
  1: {
    id: 1,
    event: "Music Night",
    date: "2026-04-10",
    venue: "Auditorium",
    price: 500,
    description: "A fun evening full of music and performances!",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1374&auto=format&fit=crop",
    ticketsLeft: 50,
  },
  2: {
    id: 2,
    event: "Sports Gala",
    date: "2026-04-15",
    venue: "Main Ground",
    price: 300,
    description: "Exciting sports events organized by the university.",
    image: "https://images.unsplash.com/photo-1521055170349-25f955971658?q=80&w=1473&auto=format&fit=crop",
    ticketsLeft: 20,
  },
  3: {
    id: 3,
    event: "Art Exhibition",
    date: "2026-04-20",
    venue: "Gallery Hall",
    price: 200,
    description: "Explore amazing artworks by students.",
    image: "https://images.unsplash.com/photo-1606819717115-9159c900370b?q=80&w=1470&auto=format&fit=crop",
    ticketsLeft: 0,
  },
};

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addTicket } = useTickets();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const event = mockEvents[id];

  if (!event) {
    return (
      <StudentLayout title="Event Details">
        <div className="flex justify-center">
          <div className="bg-white p-8 rounded-2xl shadow max-w-xl w-full text-center">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-4">
              The event you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/student/events")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Events
            </button>
          </div>
        </div>
      </StudentLayout>
    );
  }

  const handleBuy = () => {
    const newTicket = {
      id: Date.now(),
      eventId: event.id,
      event: event.event,
      date: event.date,
    };

    const success = addTicket(newTicket);
    if (success) {
      alert("Ticket Purchased!");
      setIsModalOpen(false);
      navigate("/student/my-tickets");
    }
  };

  return (
    <StudentLayout title={event.event}>
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl shadow max-w-3xl w-full overflow-hidden">
          <img
            src={event.image}
            alt={event.event}
            className="w-full h-64 object-cover"
          />
          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold">{event.event}</h1>
            <p className="text-gray-600">📅 {event.date}</p>
            <p className="text-gray-600">📍 {event.venue}</p>
            <p className="text-gray-800">{event.description}</p>
            <p className="text-gray-700 font-semibold">🎟 Price: Rs {event.price}</p>
            <p className="text-gray-700 font-semibold">
              🏷 Tickets Left: {event.ticketsLeft}
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              disabled={event.ticketsLeft <= 0}
              className={`w-full mt-4 py-3 rounded-lg ${
                event.ticketsLeft <= 0
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {event.ticketsLeft <= 0 ? "Sold Out" : "Buy/Register Ticket"}
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Register for ${event.event}`}
      >
        <p className="text-gray-700 mb-4">
          Confirm your registration for <strong>{event.event}</strong>?
        </p>
        <button
          onClick={handleBuy}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mr-2"
        >
          Yes, Buy Ticket
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
      </Modal>
    </StudentLayout>
  );
};

export default EventDetails;