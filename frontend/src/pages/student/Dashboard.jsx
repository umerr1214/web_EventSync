// src/pages/student/Dashboard.jsx
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const { user, logout } = useAuth();

  // Mock data (replace later with API)
  const upcomingEvents = [
    {
      id: 1,
      title: "Music Night",
      date: "2026-04-10",
      venue: "Auditorium",
    },
    {
      id: 2,
      title: "Sports Gala",
      date: "2026-04-15",
      venue: "Ground",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-bold mb-6">Student Panel</h2>

        <ul className="space-y-3">
          <li className="p-2 rounded-lg bg-gray-200 cursor-pointer">
            Dashboard
          </li>

          <Link to="/student/events">
            <li className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
              Browse Events
            </li>
          </Link>

          <Link to="/student/tickets">
            <li className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
              My Tickets
            </li>
          </Link>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>

          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user?.email}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="text-gray-500">Events Available</h3>
            <p className="text-2xl font-bold mt-2">25</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="text-gray-500">My Tickets</h3>
            <p className="text-2xl font-bold mt-2">3</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="text-gray-500">Upcoming Events</h3>
            <p className="text-2xl font-bold mt-2">
              {upcomingEvents.length}
            </p>
          </div>

        </div>

        {/* Upcoming Events */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Upcoming Events
          </h2>

          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{event.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {event.date} • {event.venue}
                  </p>
                </div>

                <Link
                  to={`/student/events/${event.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  View
                </Link>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;