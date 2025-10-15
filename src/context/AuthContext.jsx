import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../api/api";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const currentUser = authAPI.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const result = await authAPI.login(email, password);
      if (result.success) {
        setUser(result.data);
        return { success: true };
      }
      return { success: false, message: result.message };
    } catch (error) {
      return { success: false, message: "Erreur de connexion" };
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    // Navigation will be handled by the component calling logout
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    // Update localStorage as well
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const hasRole = (role) => {
    if (!user) return false;
    return user.role === role;
  };

  const hasAnyRole = (roles) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const isAdmin = () => hasRole("ADMIN");
  const isProfessor = () => hasRole("PROFESSOR");
  const isStaff = () => hasRole("STAFF");

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    hasRole,
    hasAnyRole,
    isAdmin,
    isProfessor,
    isStaff,
    isAuthenticated: !!user,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
