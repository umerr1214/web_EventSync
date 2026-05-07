import Ticket from "../models/Ticket.js";
import Event from "../models/Event.js";

export const buyTicket = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.body;

    const existing = await Ticket.findOne({ user: userId, event: eventId });
    if (existing) {
      return res.status(400).json({ message: "You already have a ticket for this event" });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.ticketsSold >= event.capacity) {
      return res.status(400).json({ message: "Tickets are sold out" });
    }

    const ticket = await Ticket.create({ user: userId, event: eventId });

    event.ticketsSold += 1;
    await event.save();

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).populate("event");
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("user", "email")
      .populate("event", "title date");
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSocietyTickets = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user._id }).select("_id");
    const eventIds = events.map((e) => e._id);
    const tickets = await Ticket.find({ event: { $in: eventIds } })
      .populate("user", "email")
      .populate("event", "title date");
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markTicketUsed = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    ticket.status = "used";
    await ticket.save();
    res.json({ message: "Ticket marked as used" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
