// src/models/Ticket.js
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    status: {
      type: String,
      enum: ["unused", "used"],
      default: "unused",
    },
    buyerName: { type: String },
    receiptNumber: { type: String },
    paymentMethod: { type: String, default: "online" }, // online/cash/etc
  },
  { timestamps: true }
);

ticketSchema.index({ user: 1, event: 1 }, { unique: true });

export default mongoose.model("Ticket", ticketSchema);