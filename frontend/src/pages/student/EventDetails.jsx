import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentLayout from "../../components/StudentLayout";
import Modal from "../../components/Modal";
import { getEventById } from "../../services/eventService.js";
import { buyTicket } from "../../services/ticketService.js";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getEventById(id).then(setEvent).catch(() => setEvent(null));
  }, [id]);

  if (!event) {
    return (
      <StudentLayout title="Event Details">
        <div className="flex justify-center">
          <div className="bg-white p-8 rounded-2xl shadow max-w-xl w-full text-center">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
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

  const ticketsLeft = event.capacity - event.ticketsSold;

  const handleBuy = async () => {
    setError("");
    try {
      await buyTicket(event._id);
      setIsModalOpen(false);
      navigate("/student/tickets");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <StudentLayout title={event.title}>
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl shadow max-w-3xl w-full overflow-hidden">
          <img
            src={event.image || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1374&auto=format&fit=crop"}
            alt={event.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <p className="text-gray-600">📅 {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-600">📍 {event.venue}</p>
            <p className="text-gray-800">{event.description}</p>
            <p className="text-gray-700 font-semibold">🎟 Price: Rs {event.price}</p>
            <p className="text-gray-700 font-semibold">🏷 Tickets Left: {ticketsLeft}</p>

            <button
              onClick={() => { setError(""); setIsModalOpen(true); }}
              disabled={ticketsLeft <= 0}
              className={`w-full mt-4 py-3 rounded-lg ${
                ticketsLeft <= 0
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {ticketsLeft <= 0 ? "Sold Out" : "Buy/Register Ticket"}
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setError(""); }}
        title={`Register for ${event.title}`}
      >
        <p className="text-gray-700 mb-4">
          Confirm your registration for <strong>{event.title}</strong>?
        </p>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleBuy}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Yes, Buy Ticket
          </button>
          <button
            onClick={() => { setIsModalOpen(false); setError(""); }}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </StudentLayout>
  );
};

export default EventDetails;
