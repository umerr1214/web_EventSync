// src/pages/student/EventDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentLayout from "../../components/StudentLayout";
import Modal from "../../components/Modal";
import { getEvent } from "../../services/eventService";
import { buyTicket } from "../../services/ticketService";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getEvent(id);
        if (!cancelled) setEvent(data);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load event");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <StudentLayout title="Event Details">
        <p className="text-gray-400 text-center mt-10">Loading event...</p>
      </StudentLayout>
    );
  }

  if (error || !event) {
    return (
      <StudentLayout title="Event Details">
        <div className="flex justify-center">
          <div className="bg-gray-900 border border-gray-700 p-8 rounded-2xl shadow max-w-xl w-full text-center">
            <h1 className="text-2xl font-bold mb-4 text-white">Event Not Found</h1>
            <p className="text-gray-400 mb-4">
              {error || "The event you're looking for doesn't exist."}
            </p>
            <button
              onClick={() => navigate("/student/events")}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              Back to Events
            </button>
          </div>
        </div>
      </StudentLayout>
    );
  }

  const handleBuy = async () => {
    setSubmitting(true);
    try {
      await buyTicket({ eventId: event._id });
      setIsModalOpen(false);
      navigate("/student/tickets");
    } catch (err) {
      alert(err.message || "Failed to buy ticket");
    } finally {
      setSubmitting(false);
    }
  };

  const ticketsLeft = event.ticketsAvailable ?? Math.max(0, (event.capacity || 0) - (event.ticketsSold || 0));

  return (
    <StudentLayout title={event.title}>
      <div className="flex justify-center">
        <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow max-w-3xl w-full overflow-hidden">
          <img
            src={
              event.posterUrl
                ? `${import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:5000"}${event.posterUrl}`
                : "https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
            }
            alt={event.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold text-white">{event.title}</h1>
            <p className="text-gray-400">📅 {new Date(event.date).toLocaleString()}</p>
            <p className="text-gray-400">📍 {event.venue}</p>
            <p className="text-gray-200">{event.description}</p>
            <p className="text-gray-200 font-semibold">🎟 Price: Rs {event.price}</p>
            <p className="text-gray-200 font-semibold">
              🏷 Tickets Left: {ticketsLeft}
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              disabled={ticketsLeft <= 0}
              className={`w-full mt-4 py-3 rounded-lg ${
                ticketsLeft <= 0
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {ticketsLeft <= 0 ? "Sold Out" : "Buy/Register Ticket"}
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Register for ${event.title}`}
      >
        <p className="text-gray-200 mb-4">
          Confirm your registration for <strong>{event.title}</strong>?
        </p>
        <button
          onClick={handleBuy}
          disabled={submitting}
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 mr-2 disabled:opacity-60"
        >
          {submitting ? "Processing..." : "Yes, Buy Ticket"}
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          disabled={submitting}
          className="bg-gray-700 text-gray-100 px-6 py-2 rounded-lg hover:bg-gray-600 disabled:opacity-60"
        >
          Cancel
        </button>
      </Modal>
    </StudentLayout>
  );
};

export default EventDetails;