// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();

  // Not logged in → go to login
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Role check
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <h2 style={{ textAlign: "center" }}>Access Denied</h2>;
  }

  return children;
};

export default ProtectedRoute;