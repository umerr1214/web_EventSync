// src/controllers/eventController.js
import Event from "../models/Event.js";

// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      venue,
      date,
      time,
      price,
      capacity,
      category,
    } = req.body;

    const posterUrl = req.file ? `/uploads/posters/${req.file.filename}` : undefined;

    const event = await Event.create({
      title,
      description,
      venue,
      date,
      time,
      price,
      capacity,
      category,
      posterUrl,
      createdBy: req.user._id,
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL EVENTS
export const getEvents = async (req, res) => {
  const { q, category, society, from, to } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (society) filter.createdBy = society; // society user id
  if (from || to) {
    filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);
  }
  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { venue: { $regex: q, $options: "i" } },
    ];
  }

  const events = await Event.find(filter)
    .populate("createdBy", "email societyName")
    .sort({ date: 1 });
  res.json(events);
};

// GET SINGLE EVENT
export const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id).populate("createdBy", "email societyName");

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.json(event);
};

// SOCIETY: GET MY EVENTS
export const getMyEvents = async (req, res) => {
  const events = await Event.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
  res.json(events);
};

// UPDATE EVENT
export const updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  // society can only update its own event; admin can update any
  const isOwner = String(event.createdBy) === String(req.user._id);
  if (req.user.role !== "admin" && !isOwner) {
    return res.status(403).json({ message: "Access denied" });
  }

  const patch = { ...req.body };
  if (req.file) {
    patch.posterUrl = `/uploads/posters/${req.file.filename}`;
  }

  const updated = await Event.findByIdAndUpdate(req.params.id, patch, { new: true });

  res.json(updated);
};

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  const isOwner = String(event.createdBy) === String(req.user._id);
  if (req.user.role !== "admin" && !isOwner) {
    return res.status(403).json({ message: "Access denied" });
  }

  await event.deleteOne();

  res.json({ message: "Event deleted" });
};