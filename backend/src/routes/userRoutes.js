import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import { deleteUser, listUsers, updateUserRole } from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, authorize("admin"), listUsers);
router.patch("/:id/role", protect, authorize("admin"), updateUserRole);
router.delete("/:id", protect, authorize("admin"), deleteUser);

export default router;

