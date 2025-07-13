import React, { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/auth';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  children?: ReactNode; // For nested routes/layouts
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    // Optionally render a loading spinner or placeholder while auth state is being loaded
    return <div>Loading authentication...</div>;
  }

  if (!isAuthenticated) {
    // Not authenticated, redirect to login page
    return <Navigate to="/client-login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Authenticated, but role not allowed
    return <Navigate to="/unauthorized" replace />; // Create an /unauthorized page
  }

  // User is authenticated and has the correct role
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;