// src/components/EventCard.jsx
import React from "react";

const EventCard = ({ event, date, venue, price, image, onClick }) => {
  return (
    <div
      className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Event image */}
      <div className="h-48 w-full">
        <img
          src={image || "https://via.placeholder.com/400x200"}
          alt={event}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Event info */}
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold text-gray-800">{event}</h2>
        <p className="text-gray-500 text-sm">📅 {date} • 📍 {venue}</p>
        <p className="text-gray-600 text-sm">🎟 Price: Rs {price}</p>
      </div>
    </div>
  );
};

export default EventCard;