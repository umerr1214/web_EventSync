// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { TicketProvider } from "./context/TicketContext";
import ProtectedRoute from "./components/ProtectedRoute";

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
  const { user, logout } = useAuth();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Home</h1>

      {user ? (
        <>
          <p>{user.email}</p>
          <p>Role: {user.role}</p>
          <button onClick={logout}>Logout</button>

          <br /><br />

          <Link to="/student">Student</Link> |{" "}
          <Link to="/society">Society</Link> |{" "}
          <Link to="/admin">Admin</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <Router>
          <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔒 Protected Routes */}

          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/society"
            element={
              <ProtectedRoute allowedRoles={["society"]}>
                <SocietyDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirect /admin/dashboard to /admin */}
          <Route
            path="/admin/dashboard"
            element={<Navigate to="/admin" replace />}
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

          </Routes>
        </Router>
      </TicketProvider>
    </AuthProvider>
  );
}

export default App;