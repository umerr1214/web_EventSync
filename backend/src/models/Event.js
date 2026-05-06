// src/models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    venue: String,
    time: { type: String }, // optional, e.g. "18:30"
    category: { type: String, default: "general" },
    price: { type: Number, default: 0, min: 0 },
    capacity: { type: Number, required: true, min: 1 },
    ticketsSold: { type: Number, default: 0, min: 0 },
    ticketsAvailable: { type: Number, default: 0, min: 0 },
    posterUrl: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

eventSchema.pre("validate", function (next) {
  if (this.isNew) {
    this.ticketsSold = 0;
    this.ticketsAvailable = this.capacity;
  }
  next();
});

eventSchema.index({ date: 1 });
eventSchema.index({ category: 1, date: 1 });
eventSchema.index({ createdBy: 1, date: -1 });

export default mongoose.model("Event", eventSchema);