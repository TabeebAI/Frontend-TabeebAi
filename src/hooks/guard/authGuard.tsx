// src/hooks/guard/AuthGuard.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactElement;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (
    role === 'doctor' &&
    location.pathname.startsWith('/dashboard/*') &&
    !location.pathname.includes('profile-doctor')
  ) {
    return <Navigate to="/dashboard/profile-doctor" replace />;
  }

  if (
    role === 'user' &&
    location.pathname.startsWith('/dashboard/*') &&
    !location.pathname.includes('profile-user')
  ) {
    return <Navigate to="/dashboard/profile-user" replace />;
  }

  return children;
};

export default AuthGuard;
