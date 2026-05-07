import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/events", eventRoutes);
app.use("/tickets", ticketRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/upload", uploadRoutes);

export default app;
