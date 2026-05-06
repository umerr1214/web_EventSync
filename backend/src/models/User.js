// src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "society", "admin"],
      default: "student",
    },
    societyName: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);