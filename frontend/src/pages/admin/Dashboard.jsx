import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import TicketCard from "../../components/TicketCard";

const AdminDashboard = () => {
  const { user } = useAuth();

  // Mock data for latest events (replace with API later)
  const latestEvents = [
    {
      id: 1,
      event: "Music Night",
      date: "2026-04-10",
      venue: "Auditorium",
      price: 500,
      capacity: 100,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      event: "Sports Gala",
      date: "2026-04-15",
      venue: "Main Ground",
      price: 300,
      capacity: 200,
      image: "https://images.unsplash.com/photo-1521055170349-25f955971658?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      event: "Art Exhibition",
      date: "2026-04-20",
      venue: "Gallery Hall",
      price: 200,
      capacity: 50,
      image: "https://images.unsplash.com/photo-1606819717115-9159c900370b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="flex justify-between items-center mb-6">
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold mt-2">120</p>
        </div>

        <div className="bg-gray-900 p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Total Events</h3>
          <p className="text-2xl font-bold mt-2">45</p>
        </div>

        <div className="bg-gray-900 p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">Tickets Sold</h3>
          <p className="text-2xl font-bold mt-2">320</p>
        </div>
      </div>

      {/* Latest Events */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Latest Events
        </h2>

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
              onClick={() =>
                alert(`Go to event ${ev.event} details page`)
              }
            />
          ))}
        </div>
      </div>

    </AdminLayout>
  );
};

export default AdminDashboard;