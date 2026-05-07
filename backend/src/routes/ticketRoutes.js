import express from "express";
import {
  buyTicket,
  getMyTickets,
  getAllTickets,
  getSocietyTickets,
  markTicketUsed,
} from "../controllers/ticketController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("student"), buyTicket);
router.get("/my", protect, getMyTickets);
router.get("/society", protect, authorize("society"), getSocietyTickets);
router.get("/", protect, authorize("admin"), getAllTickets);
router.put("/:id/use", protect, authorize("admin"), markTicketUsed);

export default router;
