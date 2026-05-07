import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import protect from "../middleware/authMiddleware.js";

fs.mkdirSync("uploads", { recursive: true });

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router.post("/", protect, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ url: `http://localhost:5000/uploads/${req.file.filename}` });
});

export default router;
