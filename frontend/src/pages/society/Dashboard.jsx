import { Link } from "react-router-dom";

const SocietyDashboard = () => {
  return (
    <div>
      <h1>Society Dashboard</h1>
      <p>Welcome to the society dashboard!</p>

      <Link to="/society/create-event">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Create Event
        </button>
      </Link>

      <Link to="/society/events">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Manage Events
        </button>
      </Link>

      <Link to="/society/tickets">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Manage Tickets
        </button>
      </Link>
    </div>
  );
};

export default SocietyDashboard;
