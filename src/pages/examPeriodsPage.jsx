import React, { useState, useEffect } from "react";
import { PlusCircleIcon, CalendarIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { examPeriodsAPI } from "../api/api";

export default function ExamPeriodsPage() {
  const [periods, setPeriods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    loadPeriods();
  }, []);

  const loadPeriods = async () => {
    try {
      setLoading(true);
      const result = await examPeriodsAPI.getAll();
      if (result.success) {
        setPeriods(result.data);
      }
    } catch (err) {
      console.error("Error loading exam periods:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.startDate || !formData.endDate) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await examPeriodsAPI.create(formData);
      
      if (result.success) {
        alert("Période d'examen créée avec succès!");
        setShowForm(false);
        setFormData({ startDate: "", endDate: "", description: "" });
        loadPeriods();
      } else {
        setError(result.message || "Erreur lors de la création");
      }
    } catch (err) {
      setError("Erreur lors de la création de la période");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async (id) => {
    if (!window.confirm("Voulez-vous activer cette période d'examen ? Cela désactivera la période active actuelle.")) {
      return;
    }

    try {
      const result = await examPeriodsAPI.activate(id);
      if (result.success) {
        alert("Période activée avec succès!");
        loadPeriods();
      }
    } catch (err) {
      alert("Erreur lors de l'activation");
    }
  };

  const handleDeactivate = async (id) => {
    if (!window.confirm("Voulez-vous désactiver cette période d'examen ?")) {
      return;
    }

    try {
      const result = await examPeriodsAPI.deactivate(id);
      if (result.success) {
        alert("Période désactivée avec succès!");
        loadPeriods();
      }
    } catch (err) {
      alert("Erreur lors de la désactivation");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette période ?")) {
      return;
    }

    try {
      const result = await examPeriodsAPI.delete(id);
      if (result.success) {
        alert("Période supprimée avec succès!");
        loadPeriods();
      }
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-500 flex gap-2 items-center">
          <CalendarIcon className="size-8" />
          Gestion des Périodes d'Examens
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-600"
        >
          <PlusCircleIcon className="size-5" />
          Nouvelle Période
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Créer une Période d'Examen</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de début *
                </label>
                <input
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de fin *
                </label>
                <input
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="3"
                placeholder="Ex: Session d'examens du semestre 1"
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
                {loading ? "Création..." : "Créer"}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && !showForm ? (
        <div className="text-center py-8">Chargement...</div>
      ) : (
        <div className="grid gap-4">
          {periods.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucune période d'examen trouvée
            </div>
          ) : (
            periods.map((period) => (
              <div
                key={period.id}
                className={`bg-white rounded-lg shadow p-6 ${
                  period.active ? "border-2 border-green-500" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {period.active && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                        ✓ Période Active
                      </span>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Date de début</p>
                        <p className="font-semibold">{formatDate(period.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date de fin</p>
                        <p className="font-semibold">{formatDate(period.endDate)}</p>
                      </div>
                    </div>

                    {period.description && (
                      <div>
                        <p className="text-sm text-gray-500">Description</p>
                        <p className="text-gray-700">{period.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    {period.active ? (
                      <button
                        onClick={() => handleDeactivate(period.id)}
                        className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center gap-1"
                      >
                        <XCircleIcon className="size-4" />
                        Désactiver
                      </button>
                    ) : (
                      <button
                        onClick={() => handleActivate(period.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
                      >
                        <CheckCircleIcon className="size-4" />
                        Activer
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDelete(period.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
