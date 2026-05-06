// src/controllers/authController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const sanitizeUser = (user) => ({
  _id: user._id,
  email: user.email,
  role: user.role,
  societyName: user.societyName,
});

// REGISTER
export const register = async (req, res) => {
  try {
    const { email, password, role, societyName } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      role,
      societyName: role === "society" ? societyName : undefined,
    });

    res.status(201).json({
      ...sanitizeUser(user),
      token: generateToken(user),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      ...sanitizeUser(user),
      token: generateToken(user),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const me = async (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
};