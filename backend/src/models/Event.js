// src/models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    venue: String,
    price: Number,
    capacity: Number,
    ticketsSold: { type: Number, default: 0 },
    image: String,
    time: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);