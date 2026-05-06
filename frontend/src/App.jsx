// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-200">

      <h1 className="text-6xl md:text-7xl font-brand tracking-widest uppercase bg-emerald-500 bg-clip-text text-transparent mb-6">
        EventSync
      </h1>

      <p className="text-gray-400 mb-10 text-lg">
        All your tickets in one place
      </p>

      {user ? (
        <>
          <p className="text-gray-300">{user.email}</p>
          <p className="mb-6 text-gray-500">
            Role: {user.role}
          </p>

          <div className="flex gap-4">

            <Link
              to="/student"
              className="bg-gray-800 hover:bg-emerald-600 px-6 py-2 rounded-lg transition"
            >
              Student
            </Link>

            <Link
              to="/society"
              className="bg-gray-800 hover:bg-emerald-600 px-6 py-2 rounded-lg transition"
            >
              Society
            </Link>

            <Link
              to="/admin"
              className="bg-gray-800 hover:bg-emerald-600 px-6 py-2 rounded-lg transition"
            >
              Admin
            </Link>

          </div>
        </>
      ) : (
        <div className="flex gap-4">

          <Link
            to="/login"
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition"
          >
            Register
          </Link>

        </div>
      )}

    </div>
  );
};

// Layout now properly wraps routes
const Layout = () => {
  const location = useLocation();

  const hideNavbar = location.pathname === "/";
  const isAuthPage = ["/login", "/register"].includes(location.pathname);


  return (
    <>
      {!hideNavbar && <Navbar minimal={isAuthPage} />}

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
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <Router>
          <Layout />
        </Router>
      </TicketProvider>
    </AuthProvider>
  );
}

export default App;