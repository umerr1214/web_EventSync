import { Link, useLocation } from "react-router-dom";

const SocietyLayout = ({ children, title }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/society", label: "Dashboard" },
    { path: "/society/create-event", label: "Create Event" },
    { path: "/society/events", label: "Manage Events" },
    { path: "/society/tickets", label: "Manage Tickets" },
  ];

  return (
    <div className="min-h-screen bg-gray-800 text-gray-200 flex">
      <div className="w-64 bg-gray-950 border-r border-gray-700 p-5">
        <h2 className="text-xl font-bold mb-6 text-white">Society Panel</h2>

        <ul className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <li
                className={`p-2 rounded-lg cursor-pointer transition ${
                  location.pathname === item.path
                    ? "bg-emerald-600 text-white font-medium shadow-md border-l-4 border-emerald-400"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {item.label}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default SocietyLayout;

