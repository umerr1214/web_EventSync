// src/pages/student/EventDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useTickets } from "../../context/TicketContext";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addTicket, events } = useTickets();

  // Get real event data from context
  const event = events.find((e) => e.id === Number(id));

  // If event not found, show error
  if (!event) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
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
    );
  }

  // Add default properties for display
  const eventDetails = {
    ...event,
    description: "An exciting event with great entertainment.",
    date: "2026-04-10",
    venue: "Auditorium",
    price: 500,
  };

  const handleBuy = () => {
    const newTicket = {
      id: Date.now(),
      eventId: event.id,
      event: event.title,
      date: eventDetails.date,
    };

    const success = addTicket(newTicket);

    if (success) {
      alert("Ticket Purchased!");
      navigate("/student/tickets");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">

      <div className="bg-white p-8 rounded-2xl shadow max-w-xl w-full">

        <h1 className="text-2xl font-bold mb-4">{eventDetails.title}</h1>

        <p className="text-gray-600 mb-4">{eventDetails.description}</p>

        <p><strong>Date:</strong> {eventDetails.date}</p>
        <p><strong>Venue:</strong> {eventDetails.venue}</p>
        <p><strong>Price:</strong> Rs. {eventDetails.price}</p>
        <p><strong>Tickets Left:</strong> {event.ticketsLeft}</p>

        <button
          onClick={handleBuy}
          disabled={event.ticketsLeft <= 0}
          className={`w-full mt-6 py-3 rounded-lg ${
            event.ticketsLeft <= 0
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {event.ticketsLeft <= 0 ? "Sold Out" : "Buy Ticket"}
        </button>

      </div>
    </div>
  );
};

export default EventDetails;