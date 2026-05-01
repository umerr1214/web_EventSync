// src/routes/ticketRoutes.js
import express from "express";
import {
  buyTicket,
  getMyTickets,
  getAllTickets,
  markTicketUsed,
} from "../controllers/ticketController.js";

const router = express.Router();

// For now (no auth middleware yet)
// later we’ll protect these routes

router.post("/", buyTicket);
router.get("/my", getMyTickets);
router.get("/", getAllTickets);
router.put("/:id/use", markTicketUsed);

export default router;