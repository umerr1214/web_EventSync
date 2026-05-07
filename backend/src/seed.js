import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Event from "./models/Event.js";
import Ticket from "./models/Ticket.js";
import connectDB from "./config/db.js";

dotenv.config();

const seed = async () => {
  await connectDB();

  await User.deleteMany({});
  await Event.deleteMany({});
  await Ticket.deleteMany({});
  console.log("Collections cleared");

  const [adminUser, societyUser, studentUser] = await User.insertMany([
    { email: "admin@gmail.com", password: await bcrypt.hash("admin123", 10), role: "admin" },
    { email: "society@gmail.com", password: await bcrypt.hash("society123", 10), role: "society" },
    { email: "student@gmail.com", password: await bcrypt.hash("student123", 10), role: "student" },
  ]);
  console.log("Users seeded:", adminUser.email, societyUser.email, studentUser.email);

  const [musicNight, sportsGala, artExhibition] = await Event.insertMany([
    {
      title: "Music Night",
      description: "A fun evening full of music and performances!",
      date: new Date("2026-04-10"),
      time: "18:00",
      venue: "Auditorium",
      price: 500,
      capacity: 100,
      ticketsSold: 1,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1374&auto=format&fit=crop",
      createdBy: societyUser._id,
    },
    {
      title: "Sports Gala",
      description: "Exciting sports events organized by the university.",
      date: new Date("2026-04-15"),
      time: "10:00",
      venue: "Main Ground",
      price: 300,
      capacity: 200,
      ticketsSold: 1,
      image: "https://images.unsplash.com/photo-1521055170349-25f955971658?q=80&w=1473&auto=format&fit=crop",
      createdBy: societyUser._id,
    },
    {
      title: "Art Exhibition",
      description: "Explore amazing artworks by students.",
      date: new Date("2026-04-20"),
      time: "12:00",
      venue: "Gallery Hall",
      price: 200,
      capacity: 50,
      ticketsSold: 50,
      image: "https://images.unsplash.com/photo-1606819717115-9159c900370b?q=80&w=1470&auto=format&fit=crop",
      createdBy: societyUser._id,
    },
  ]);
  console.log("Events seeded:", musicNight.title, sportsGala.title, artExhibition.title);

  await Ticket.insertMany([
    { user: studentUser._id, event: musicNight._id, status: "unused" },
    { user: studentUser._id, event: sportsGala._id, status: "used" },
  ]);
  console.log("Tickets seeded: 2 tickets for student");

  console.log("\nSeed complete!");
  console.log("  admin@gmail.com    / admin123");
  console.log("  society@gmail.com  / society123");
  console.log("  student@gmail.com  / student123");

  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
