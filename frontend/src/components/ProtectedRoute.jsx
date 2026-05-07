import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AccessDenied = ({ user }) => {
  const navigate = useNavigate();
  const dashboardPath = `/${user.role}`;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-gray-200">
      <div className="text-6xl mb-6">🔒</div>
      <h1 className="text-4xl font-bold text-white mb-2">Access Denied</h1>
      <p className="text-gray-400 mb-1">
        You are logged in as <span className="capitalize text-emerald-400 font-semibold">{user.role}</span>
      </p>
      <p className="text-gray-500 text-sm mb-8">
        You don't have permission to view this page.
      </p>
      <button
        onClick={() => navigate(dashboardPath)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition font-medium shadow-lg"
      >
        Go to my Dashboard
      </button>
    </div>
  );
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <AccessDenied user={user} />;
  }

  return children;
};

export default ProtectedRoute;
