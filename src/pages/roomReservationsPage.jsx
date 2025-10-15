import React, { useState, useEffect } from "react";
import { PlusCircleIcon, HomeIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { roomReservationsAPI } from "../api/api";

export default function RoomReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [myReservations, setMyReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("my"); // "my" or "all"
  
  const [formData, setFormData] = useState({
    roomName: "",
    reservationDate: "",
    startTime: "",
    endTime: "",
    purpose: "",
    equipmentNeeded: "",
  });

  const rooms = [
    "Salle A1",
    "Salle A2",
    "Salle B1",
    "Salle B2",
    "Amphithéâtre",
    "Laboratoire Informatique",
    "Salle de Réunion",
    "Bibliothèque",
  ];

  useEffect(() => {
    loadReservations();
  }, [activeTab]);

  const loadReservations = async () => {
    try {
      setLoading(true);
      
      if (activeTab === "my") {
        const result = await roomReservationsAPI.getMyReservations();
        if (result.success) {
          setMyReservations(result.data);
        }
      } else {
        const result = await roomReservationsAPI.getAll();
        if (result.success) {
          setReservations(result.data);
        }
      }
    } catch (err) {
      console.error("Error loading reservations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.roomName || !formData.reservationDate || !formData.startTime || !formData.endTime || !formData.purpose) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await roomReservationsAPI.create(formData);
      
      if (result.success) {
        alert("Réservation créée avec succès! En attente de validation.");
        setShowForm(false);
        setFormData({
          roomName: "",
          reservationDate: "",
          startTime: "",
          endTime: "",
          purpose: "",
          equipmentNeeded: "",
        });
        loadReservations();
      } else {
        setError(result.message || "Erreur lors de la création");
      }
    } catch (err) {
      setError("Erreur lors de la création de la réservation");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async (id) => {
    const comment = prompt("Commentaire (optionnel):");
    
    try {
      const result = await roomReservationsAPI.validate(id, comment || "");
      if (result.success) {
        alert("Réservation validée!");
        loadReservations();
      }
    } catch (err) {
      alert("Erreur lors de la validation");
    }
  };

  const handleReject = async (id) => {
    const comment = prompt("Raison du refus:");
    if (!comment) return;
    
    try {
      const result = await roomReservationsAPI.reject(id, comment);
      if (result.success) {
        alert("Réservation refusée!");
        loadReservations();
      }
    } catch (err) {
      alert("Erreur lors du refus");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Voulez-vous annuler cette réservation ?")) {
      return;
    }

    try {
      const result = await roomReservationsAPI.delete(id);
      if (result.success) {
        alert("Réservation annulée!");
        loadReservations();
      }
    } catch (err) {
      alert("Erreur lors de l'annulation");
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      EN_ATTENTE: { bg: "bg-yellow-100", text: "text-yellow-800", label: "En Attente" },
      VALIDEE: { bg: "bg-green-100", text: "text-green-800", label: "Validée" },
      REFUSEE: { bg: "bg-red-100", text: "text-red-800", label: "Refusée" },
      ANNULEE: { bg: "bg-gray-100", text: "text-gray-800", label: "Annulée" },
    };
    
    const badge = badges[status] || badges.EN_ATTENTE;
    return (
      <span className={`inline-block ${badge.bg} ${badge.text} text-xs px-2 py-1 rounded-full`}>
        {badge.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const displayReservations = activeTab === "my" ? myReservations : reservations;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-500 flex gap-2 items-center">
          <HomeIcon className="size-8" />
          Réservations de Salles
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-600"
        >
          <PlusCircleIcon className="size-5" />
          Nouvelle Réservation
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab("my")}
            className={`pb-2 px-1 ${
              activeTab === "my"
                ? "border-b-2 border-indigo-500 text-indigo-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Mes Réservations
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-2 px-1 ${
              activeTab === "all"
                ? "border-b-2 border-indigo-500 text-indigo-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Toutes les Réservations (Admin)
          </button>
        </nav>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Réserver une Salle</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salle *
              </label>
              <select
                value={formData.roomName}
                onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Sélectionnez une salle</option>
                {rooms.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.reservationDate}
                  onChange={(e) => setFormData({ ...formData, reservationDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heure de début *
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heure de fin *
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Objet de la réservation *
              </label>
              <textarea
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="3"
                placeholder="Ex: Réunion du club robotique"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Matériel nécessaire
              </label>
              <textarea
                value={formData.equipmentNeeded}
                onChange={(e) => setFormData({ ...formData, equipmentNeeded: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="2"
                placeholder="Ex: Projecteur, tableau blanc, 20 chaises"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:bg-gray-400"
              >
                {loading ? "Création..." : "Réserver"}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && !showForm ? (
        <div className="text-center py-8">Chargement...</div>
      ) : (
        <div className="grid gap-4">
          {displayReservations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucune réservation trouvée
            </div>
          ) : (
            displayReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-indigo-600">
                        {reservation.roomName}
                      </h3>
                      {getStatusBadge(reservation.status)}
                    </div>
                    {activeTab === "all" && reservation.userEmail && (
                      <p className="text-sm text-gray-500">
                        Demandeur: {reservation.userEmail}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {activeTab === "all" && reservation.status === "EN_ATTENTE" && (
                      <>
                        <button
                          onClick={() => handleValidate(reservation.id)}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
                        >
                          <CheckCircleIcon className="size-4" />
                          Valider
                        </button>
                        <button
                          onClick={() => handleReject(reservation.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
                        >
                          <XCircleIcon className="size-4" />
                          Refuser
                        </button>
                      </>
                    )}
                    
                    {activeTab === "my" && reservation.status === "EN_ATTENTE" && (
                      <button
                        onClick={() => handleCancel(reservation.id)}
                        className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
                      >
                        Annuler
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold">{formatDate(reservation.reservationDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Heure</p>
                    <p className="font-semibold flex items-center gap-1">
                      <ClockIcon className="size-4" />
                      {reservation.startTime} - {reservation.endTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Créée le</p>
                    <p className="font-semibold">
                      {new Date(reservation.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Objet</p>
                  <p className="text-gray-700">{reservation.purpose}</p>
                </div>

                {reservation.equipmentNeeded && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Matériel demandé</p>
                    <p className="text-gray-700">{reservation.equipmentNeeded}</p>
                  </div>
                )}

                {reservation.adminComment && (
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-500 mb-1">Commentaire de l'admin</p>
                    <p className="text-gray-700">{reservation.adminComment}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
