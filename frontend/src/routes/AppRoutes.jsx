// src/routes/AppRoutes.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Auth pages
import Login from "../pages/Login";
import Register from "../pages/Register";

// Admin pages
import AdminDashboard from "../pages/admin/Dashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageEvents from "../pages/admin/ManageEvents";
import ManageTickets from "../pages/admin/ManageTickets";

// Student pages
import StudentDashboard from "../pages/student/Dashboard";
import Events from "../pages/student/Events";
import EventDetails from "../pages/student/EventDetails";
import MyTickets from "../pages/student/MyTickets";

// Protected route wrapper
const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    // not logged in
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    // wrong role
    return <Navigate to="/" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <ProtectedRoute role="admin">
              <ManageEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/tickets"
          element={
            <ProtectedRoute role="admin">
              <ManageTickets />
            </ProtectedRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/events"
          element={
            <ProtectedRoute role="student">
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/events/:id"
          element={
            <ProtectedRoute role="student">
              <EventDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/my-tickets"
          element={
            <ProtectedRoute role="student">
              <MyTickets />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;