// src/controllers/ticketController.js
import Ticket from "../models/Ticket.js";
import Event from "../models/Event.js";


// 🎟️ BUY TICKET
export const buyTicket = async (req, res) => {
  try {
    const userId = req.user?.id; // from auth middleware (or mock)
    const { eventId } = req.body;

    // 1. Check duplicate ticket
    const existing = await Ticket.findOne({
      user: userId,
      event: eventId,
    });

    if (existing) {
      return res.status(400).json({
        message: "You already have a ticket for this event",
      });
    }

    // 2. Check event
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 3. Capacity check
    if (event.ticketsSold >= event.capacity) {
      return res.status(400).json({
        message: "Tickets are sold out",
      });
    }

    // 4. Create ticket
    const ticket = await Ticket.create({
      user: userId,
      event: eventId,
    });

    // 5. Increment tickets sold
    event.ticketsSold += 1;
    await event.save();

    res.status(201).json(ticket);

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



// ✅ MARK TICKET AS USED
export const markTicketUsed = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  ticket.status = "used";
  await ticket.save();

  res.json({ message: "Ticket marked as used" });
};