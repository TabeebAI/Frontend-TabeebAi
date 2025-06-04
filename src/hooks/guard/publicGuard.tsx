import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicGuardProps {
  children: React.ReactElement;
}

const PublicGuard: React.FC<PublicGuardProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  // If already logged in, send them to /dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, show the public layout (LandingPage, etc.)
  return children;
};

export default PublicGuard;