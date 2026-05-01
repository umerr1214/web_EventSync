// src/app.js
import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/events", eventRoutes);
app.use("/tickets", ticketRoutes);

export default app;