import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  if (adminOnly && !isAdmin()) {
    // Redirect to home if not an admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
