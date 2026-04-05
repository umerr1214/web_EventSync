import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import TicketCard from "../../components/TicketCard";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  // Mock data for latest events (replace with API later)
  const latestEvents = [
    {
      id: 1,
      event: "Music Night",
      date: "2026-04-10",
      venue: "Auditorium",
      price: 500,
      capacity: 100,
      image: "https://via.placeholder.com/400x200",
    },
    {
      id: 2,
      event: "Sports Gala",
      date: "2026-04-15",
      venue: "Main Ground",
      price: 300,
      capacity: 200,
      image: "https://via.placeholder.com/400x200",
    },
    {
      id: 3,
      event: "Art Exhibition",
      date: "2026-04-20",
      venue: "Gallery Hall",
      price: 200,
      capacity: 50,
      image: "https://via.placeholder.com/400x200",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold mt-2">120</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Total Events</h3>
          <p className="text-2xl font-bold mt-2">45</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Tickets Sold</h3>
          <p className="text-2xl font-bold mt-2">320</p>
        </div>
      </div>

      {/* Latest Events */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Latest Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestEvents.map((ev) => (
            <TicketCard
              key={ev.id}
              event={ev.event}
              date={ev.date}
              venue={ev.venue}
              price={ev.price}
              capacity={ev.capacity}
              image={ev.image}
              onClick={() => alert(`Go to event ${ev.event} details page`)}
            />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;