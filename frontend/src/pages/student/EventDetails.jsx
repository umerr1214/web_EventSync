// src/pages/student/EventDetails.jsx
import { useParams, useNavigate } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data (normally fetch by ID)
  const event = {
    id,
    title: "Music Night",
    description: "An exciting musical evening with live performances.",
    date: "2026-04-10",
    venue: "Auditorium",
    price: 500,
    ticketsLeft: 50,
  };

  const handleBuy = () => {
    // Later connect to backend
    alert("Ticket Purchased!");
    navigate("/student/tickets");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">

      <div className="bg-white p-8 rounded-2xl shadow max-w-xl w-full">

        <h1 className="text-2xl font-bold mb-4">{event.title}</h1>

        <p className="text-gray-600 mb-4">{event.description}</p>

        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Venue:</strong> {event.venue}</p>
        <p><strong>Price:</strong> Rs. {event.price}</p>
        <p><strong>Tickets Left:</strong> {event.ticketsLeft}</p>

        <button
          onClick={handleBuy}
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Buy Ticket
        </button>

      </div>
    </div>
  );
};

export default EventDetails;