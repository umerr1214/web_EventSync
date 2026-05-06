// src/controllers/ticketController.js
import Ticket from "../models/Ticket.js";
import Event from "../models/Event.js";


// 🎟️ BUY TICKET
export const buyTicket = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { eventId, buyerName, receiptNumber, paymentMethod } = req.body;

    // 1. Check duplicate ticket
    // We'll rely on unique index (user,event) AND do a fast pre-check for nicer errors.
    const existing = await Ticket.findOne({ user: userId, event: eventId });
    if (existing) return res.status(400).json({ message: "You already have a ticket for this event" });

    // 2. Atomically reserve a ticket slot (prevents overselling)
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: eventId, ticketsAvailable: { $gt: 0 } },
      { $inc: { ticketsAvailable: -1, ticketsSold: 1 } },
      { new: true }
    );

    if (!updatedEvent) {
      // event missing OR sold out
      const exists = await Event.exists({ _id: eventId });
      return res.status(exists ? 400 : 404).json({
        message: exists ? "Tickets are sold out" : "Event not found",
      });
    }

    // 3. Create ticket
    try {
      const ticket = await Ticket.create({
        user: userId,
        event: eventId,
        buyerName,
        receiptNumber,
        paymentMethod,
      });

      res.status(201).json(ticket);
    } catch (err) {
      // Roll back reservation if ticket creation fails
      await Event.updateOne(
        { _id: eventId },
        { $inc: { ticketsAvailable: 1, ticketsSold: -1 } }
      );

      if (err?.code === 11000) {
        return res.status(400).json({ message: "You already have a ticket for this event" });
      }
      throw err;
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 📥 GET MY TICKETS
export const getMyTickets = async (req, res) => {
  const userId = req.user?.id;

  const tickets = await Ticket.find({ user: userId })
    .populate("event");

  res.json(tickets);
};



// 🛠️ ADMIN: GET ALL TICKETS
export const getAllTickets = async (req, res) => {
  const tickets = await Ticket.find()
    .populate("user", "email")
    .populate("event", "title date");

  res.json(tickets);
};

// 🏷️ SOCIETY/ADMIN: GET TICKETS FOR EVENT
export const getTicketsForEvent = async (req, res) => {
  const { eventId } = req.params;
  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: "Event not found" });

  const isOwner = String(event.createdBy) === String(req.user._id);
  if (req.user.role !== "admin" && !isOwner) {
    return res.status(403).json({ message: "Access denied" });
  }

  const tickets = await Ticket.find({ event: eventId })
    .populate("user", "email")
    .sort({ createdAt: -1 });

  res.json(tickets);
};



// ✅ MARK TICKET AS USED
export const markTicketUsed = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).populate("event");

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  if (!ticket.event) {
    return res.status(404).json({ message: "Event not found" });
  }

  const isOwner = String(ticket.event.createdBy) === String(req.user._id);
  if (req.user.role !== "admin" && !isOwner) {
    return res.status(403).json({ message: "Access denied" });
  }

  ticket.status = "used";
  await ticket.save();

  res.json({ message: "Ticket marked as used" });
};