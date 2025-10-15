import React, { useState, useEffect } from "react";
import { 
  UserPlusIcon, 
  PencilIcon, 
  TrashIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon
} from "@heroicons/react/24/solid";
import { usersAPI } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function UsersManagementPage() {
  const { user: currentUser } = useAuth(); // Récupérer l'utilisateur connecté
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "PROFESSOR",
    active: true,
  });
  const [filterRole, setFilterRole] = useState("ALL");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.getAll();
      if (response.success) {
        setUsers(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Erreur lors du chargement des utilisateurs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let response;
      if (editingUser) {
        // Update existing user
        const updateData = { ...formData };
        // Remove password if empty (don't update it)
        if (!updateData.password) {
          delete updateData.password;
        }
        response = await usersAPI.update(editingUser.id, updateData);
      } else {
        // Create new user
        response = await usersAPI.create(formData);
      }

      if (response.success) {
        alert(editingUser ? "Utilisateur modifié avec succès" : "Utilisateur créé avec succès");
        setShowModal(false);
        resetForm();
        loadUsers();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Erreur lors de la sauvegarde");
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: "",
      role: user.role,
      active: user.active,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      return;
    }

    try {
      const response = await usersAPI.delete(id);
      if (response.success) {
        alert("Utilisateur supprimé avec succès");
        loadUsers();
      } else {
        alert(response.message);
      }
    } catch (err) {
      alert("Erreur lors de la suppression");
      console.error(err);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const response = await usersAPI.toggleStatus(id);
      if (response.success) {
        loadUsers();
      } else {
        alert(response.message);
      }
    } catch (err) {
      alert("Erreur lors de la modification du statut");
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      role: "PROFESSOR",
      active: true,
    });
    setEditingUser(null);
    setError("");
  };

  const getRoleBadge = (role) => {
    const badges = {
      ADMIN: { bg: "bg-red-100", text: "text-red-800", label: "Admin" },
      PROFESSOR: { bg: "bg-blue-100", text: "text-blue-800", label: "Professeur" },
      STAFF: { bg: "bg-green-100", text: "text-green-800", label: "Personnel" },
    };
    const badge = badges[role] || badges.STAFF;
    return (
      <span className={`${badge.bg} ${badge.text} text-xs px-2 py-1 rounded-full font-medium`}>
        {badge.label}
      </span>
    );
  };

  const filteredUsers = filterRole === "ALL" 
    ? users 
    : users.filter(user => user.role === filterRole);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-indigo-500 flex items-center gap-2">
          <UserGroupIcon className="size-8" />
          Gestion des Utilisateurs
        </h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          <UserPlusIcon className="size-5" />
          Nouvel Utilisateur
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilterRole("ALL")}
          className={`px-4 py-2 rounded-lg ${filterRole === "ALL" ? "bg-indigo-500 text-white" : "bg-gray-200"}`}
        >
          Tous ({users.length})
        </button>
        <button
          onClick={() => setFilterRole("ADMIN")}
          className={`px-4 py-2 rounded-lg ${filterRole === "ADMIN" ? "bg-red-500 text-white" : "bg-gray-200"}`}
        >
          Admins ({users.filter(u => u.role === "ADMIN").length})
        </button>
        <button
          onClick={() => setFilterRole("PROFESSOR")}
          className={`px-4 py-2 rounded-lg ${filterRole === "PROFESSOR" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Professeurs ({users.filter(u => u.role === "PROFESSOR").length})
        </button>
        <button
          onClick={() => setFilterRole("STAFF")}
          className={`px-4 py-2 rounded-lg ${filterRole === "STAFF" ? "bg-green-500 text-white" : "bg-gray-200"}`}
        >
          Personnel ({users.filter(u => u.role === "STAFF").length})
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rôle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getRoleBadge(user.role)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    disabled={user.email === currentUser?.email && user.active}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      user.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    } ${user.email === currentUser?.email && user.active ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {user.active ? (
                      <>
                        <CheckCircleIcon className="size-4" />
                        Actif
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="size-4" />
                        Inactif
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    <PencilIcon className="size-5" />
                  </button>
                  {user.email !== currentUser?.email && (
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="size-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe {editingUser ? "(laisser vide pour ne pas modifier)" : "*"}
                </label>
                <input
                  type="password"
                  required={!editingUser}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rôle *
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="PROFESSOR">Professeur</option>
                  <option value="STAFF">Personnel</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="active" className="text-sm font-medium text-gray-700">
                  Compte actif
                </label>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
                >
                  {editingUser ? "Modifier" : "Créer"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
