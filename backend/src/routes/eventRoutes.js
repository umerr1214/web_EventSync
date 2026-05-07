import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", protect, authorize("society"), createEvent);
router.put("/:id", protect, authorize("society", "admin"), updateEvent);
router.delete("/:id", protect, authorize("society", "admin"), deleteEvent);

export default router;
