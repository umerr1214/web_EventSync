// src/app.js
import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/events", eventRoutes);
app.use("/tickets", ticketRoutes);
app.use("/auth", authRoutes);

export default app;