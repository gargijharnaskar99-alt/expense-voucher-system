import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  role,
}) {
  const { user } = useAuth();

  // User not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Wrong role
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}