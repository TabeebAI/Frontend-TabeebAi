import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicGuardProps {
  children: React.ReactElement;
}

const PublicGuard: React.FC<PublicGuardProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/dashboard/profile-user" replace />;
  }

  return children;
};

export default PublicGuard;