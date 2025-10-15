import React from 'react';
import { Navigate } from 'react-router-dom';
import { authAPI } from '../api/api';
import { LOGIN } from '../routes';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authAPI.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to={LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;
