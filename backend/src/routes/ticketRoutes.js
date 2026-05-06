// src/routes/ticketRoutes.js
import express from "express";
import {
  buyTicket,
  getMyTickets,
  getAllTickets,
  getTicketsForEvent,
  markTicketUsed,
} from "../controllers/ticketController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("student", "admin"), buyTicket);
router.get("/my", protect, authorize("student", "admin"), getMyTickets);

router.get("/", protect, authorize("admin"), getAllTickets);
router.get(
  "/event/:eventId",
  protect,
  authorize("society", "admin"),
  getTicketsForEvent
);

router.put("/:id/use", protect, authorize("society", "admin"), markTicketUsed);

export default router;