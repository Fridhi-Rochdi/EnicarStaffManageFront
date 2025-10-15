import React, { useState } from "react";
import {
  UserCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../api/api";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const getRoleBadge = (role) => {
    const badges = {
      ADMIN: { bg: "bg-red-100", text: "text-red-800", label: "Administrateur" },
      PROFESSOR: { bg: "bg-blue-100", text: "text-blue-800", label: "Professeur" },
      STAFF: { bg: "bg-green-100", text: "text-green-800", label: "Personnel" },
    };
    const badge = badges[role] || badges.STAFF;
    return (
      <span className={`${badge.bg} ${badge.text} px-3 py-1 rounded-full text-sm font-medium`}>
        {badge.label}
      </span>
    );
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      // Ici, vous devriez appeler votre API pour mettre à jour le profil
      // Pour le moment, nous simulons la mise à jour
      setMessage({ type: "success", text: "Profil mis à jour avec succès !" });
      setIsEditing(false);
      
      // Mettre à jour le contexte utilisateur
      if (updateUser) {
        updateUser({
          ...user,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
        });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Erreur lors de la mise à jour du profil" });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    // Validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "Les mots de passe ne correspondent pas" });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: "error", text: "Le mot de passe doit contenir au moins 6 caractères" });
      return;
    }

    try {
      // Ici, vous devriez appeler votre API pour changer le mot de passe
      setMessage({ type: "success", text: "Mot de passe modifié avec succès !" });
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setMessage({ type: "error", text: "Erreur lors du changement de mot de passe" });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <UserCircleIcon className="size-10 text-indigo-500" />
          Mon Profil
        </h1>
        <p className="text-gray-500 mt-2">Gérez vos informations personnelles et vos paramètres</p>
      </div>

      {/* Messages */}
      {message.text && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-400"
              : "bg-red-100 text-red-800 border border-red-400"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircleIcon className="size-6" />
          ) : (
            <XCircleIcon className="size-6" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-4">
            <div className="inline-block">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center shadow-lg">
                <UserCircleIcon className="size-28 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-500 flex items-center gap-2 mt-1">
                <EnvelopeIcon className="size-4" />
                {user?.email}
              </p>
            </div>
            <div>{getRoleBadge(user?.role)}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Statut</p>
              <p className="text-lg font-bold text-indigo-600">
                {user?.active ? "Actif" : "Inactif"}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Rôle</p>
              <p className="text-lg font-bold text-purple-600">
                {user?.role === "ADMIN"
                  ? "Administrateur"
                  : user?.role === "PROFESSOR"
                  ? "Professeur"
                  : "Personnel"}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Membre depuis</p>
              <p className="text-lg font-bold text-blue-600">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("fr-FR") : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Informations Personnelles</h3>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
            >
              <PencilIcon className="size-5" />
              Modifier
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition"
              >
                Sauvegarder
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    firstName: user?.firstName || "",
                    lastName: user?.lastName || "",
                    email: user?.email || "",
                  });
                }}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Annuler
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Prénom</p>
              <p className="text-lg font-medium">{user?.firstName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Nom</p>
              <p className="text-lg font-medium">{user?.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg font-medium">{user?.email}</p>
            </div>
          </div>
        )}
      </div>

      {/* Change Password Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <KeyIcon className="size-6 text-indigo-500" />
            Sécurité
          </h3>
          {!isChangingPassword && (
            <button
              onClick={() => setIsChangingPassword(true)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              Changer le mot de passe
            </button>
          )}
        </div>

        {isChangingPassword ? (
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe actuel
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, currentPassword: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition"
              >
                Changer le mot de passe
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                }}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Annuler
              </button>
            </div>
          </form>
        ) : (
          <p className="text-gray-600">
            Dernière modification : {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString("fr-FR") : "Jamais"}
          </p>
        )}
      </div>
    </div>
  );
}
