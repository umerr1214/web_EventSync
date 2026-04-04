// src/pages/student/Dashboard.jsx
import { Link } from "react-router-dom";
import StudentLayout from "../../components/StudentLayout";

const StudentDashboard = () => {
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
    <StudentLayout title="Student Dashboard">
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
    </StudentLayout>
  );
};

export default StudentDashboard;