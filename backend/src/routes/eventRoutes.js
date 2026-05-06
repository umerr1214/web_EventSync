// src/routes/eventRoutes.js
import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  getMyEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import { posterUpload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getEvents);

router.get(
  "/mine",
  protect,
  authorize("society", "admin"),
  getMyEvents
);

router.get("/:id", getEventById);

router.post(
  "/",
  protect,
  authorize("society", "admin"),
  posterUpload.single("poster"),
  createEvent
);

router.put(
  "/:id",
  protect,
  authorize("society", "admin"),
  posterUpload.single("poster"),
  updateEvent
);

router.delete(
  "/:id",
  protect,
  authorize("society", "admin"),
  deleteEvent
);

export default router;