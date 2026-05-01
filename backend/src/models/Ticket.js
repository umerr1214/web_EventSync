// src/models/Ticket.js
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    status: {
      type: String,
      enum: ["unused", "used"],
      default: "unused",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);