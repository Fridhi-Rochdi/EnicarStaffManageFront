import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { LOGIN } from "../routes";

export default function RoleProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={LOGIN} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">⛔</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Accès Refusé</h1>
          <p className="text-gray-600 mb-4">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
          <p className="text-sm text-gray-500">
            Votre rôle : <span className="font-semibold">{user.role}</span>
          </p>
          <p className="text-sm text-gray-500">
            Rôles requis : <span className="font-semibold">{allowedRoles.join(", ")}</span>
          </p>
          <button
            onClick={() => window.history.back()}
            className="mt-6 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  return children;
}

RoleProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};
