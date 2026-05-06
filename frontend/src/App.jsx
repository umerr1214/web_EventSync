// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { TicketProvider } from "./context/TicketContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateEvent from "./pages/society/CreateEvent"; 
import SocietyManageEvents from "./pages/society/ManageEvents";
import SocietyManageTickets from "./pages/society/ManageTickets";
import Navbar from "./components/Navbar";

// Dashboards
import StudentDashboard from "./pages/student/Dashboard";
import SocietyDashboard from "./pages/society/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";

import ManageEvents from "./pages/admin/ManageEvents";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageTickets from "./pages/admin/ManageTickets";

import Events from "./pages/student/Events";
import EventDetails from "./pages/student/EventDetails";
import MyTickets from "./pages/student/MyTickets";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to EventSync!
      </h1>

      {user ? (
        <>
          <p className="text-gray-600">{user.email}</p>
          <p className="mb-4 text-gray-500">
            Role: {user.role}
          </p>

          <div className="mt-6 space-x-4">
            <Link to="/student" className="text-blue-500">Student</Link>
            <Link to="/society" className="text-green-500">Society</Link>
            <Link to="/admin" className="text-purple-500">Admin</Link>
          </div>
        </>
      ) : (
        <div className="space-x-4">
          <Link to="/login" className="text-blue-500">Login</Link>
          <Link to="/register" className="text-green-500">Register</Link>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <Router>
          <Navbar />

          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Student Routes */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/student/events"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <Events />
                </ProtectedRoute>
              }
            />

            <Route
              path="/student/events/:id"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <EventDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/student/tickets"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <MyTickets />
                </ProtectedRoute>
              }
            />

            {/* Society Routes */}
            <Route
              path="/society"
              element={
                <ProtectedRoute allowedRoles={["society"]}>
                  <SocietyDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/society/create-event"
              element={
                <ProtectedRoute allowedRoles={["society"]}>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />

            <Route
              path="/society/events"
              element={
                <ProtectedRoute allowedRoles={["society"]}>
                  <SocietyManageEvents />
                </ProtectedRoute>
              }
            />

            <Route
              path="/society/tickets"
              element={
                <ProtectedRoute allowedRoles={["society"]}>
                  <SocietyManageTickets />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/events"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ManageEvents />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ManageUsers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/tickets"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ManageTickets />
                </ProtectedRoute>
              }
            />

            {/* Redirect */}
            <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />

          </Routes>

        </Router>
      </TicketProvider>
    </AuthProvider>
  );
}

export default App;