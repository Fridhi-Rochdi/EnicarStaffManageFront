import React, { useState, useEffect } from "react";
import PrintCard from "../components/printCard";
import { ticketsAPI } from "../api/api";

function Landing() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const result = await ticketsAPI.getAll();
      
      if (result.success) {
        setTickets(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Erreur lors du chargement des tickets");
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "ALL" || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadFile = async (ticketId, fileName) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token récupéré:', token ? 'Présent' : 'Absent');
      
      if (!token) {
        alert('Vous devez être connecté pour télécharger un fichier');
        return;
      }
      
      const response = await fetch(`http://localhost:8081/api/tickets/${ticketId}/download`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      console.log('Statut de la réponse:', response.status);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Non autorisé. Veuillez vous reconnecter.');
        }
        throw new Error('Erreur lors du téléchargement du fichier');
      }

      // Convertir la réponse en blob
      const blob = await response.blob();
      
      // Créer un lien temporaire pour télécharger le fichier
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'document.pdf';
      document.body.appendChild(link);
      link.click();
      
      // Nettoyer
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Erreur de téléchargement:', err);
      alert(err.message || 'Erreur lors du téléchargement du fichier');
    }
  };

  const handleViewDocument = async (ticketId, fileName) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token récupéré pour visualisation:', token ? 'Présent' : 'Absent');
      
      if (!token) {
        alert('Vous devez être connecté pour visualiser un fichier');
        return;
      }
      
      const response = await fetch(`http://localhost:8081/api/tickets/${ticketId}/download`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      console.log('Statut de la réponse (visualisation):', response.status);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Non autorisé. Veuillez vous reconnecter.');
        }
        throw new Error('Erreur lors du chargement du fichier');
      }

      // Convertir la réponse en blob
      const blob = await response.blob();
      
      // Créer une URL temporaire et ouvrir dans un nouvel onglet
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      
      // Nettoyer après un délai (pour laisser le temps au navigateur d'ouvrir le fichier)
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
    } catch (err) {
      console.error('Erreur d\'affichage:', err);
      alert(err.message || 'Erreur lors de l\'affichage du fichier');
    }
  };

  const handleOpenDocumentModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowDocumentModal(true);
  };

  const getStatusBadge = (status) => {
    const badges = {
      EN_ATTENTE: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", label: "En attente", icon: "schedule" },
      EN_COURS: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", label: "En cours", icon: "autorenew" },
      TERMINE: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", label: "Terminé", icon: "check_circle" },
      ANNULE: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", label: "Annulé", icon: "cancel" },
    };
    return badges[status] || badges.EN_ATTENTE;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement des tickets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <span className="material-icons text-6xl text-red-500 mb-4">error_outline</span>
          <p className="text-xl text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="material-icons text-4xl text-indigo-600">confirmation_number</span>
          <h1 className="text-4xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Gestion des Tickets
          </h1>
        </div>
        <p className="text-gray-600 ml-14">
          {filteredTickets.length} ticket{filteredTickets.length > 1 ? 's' : ''} trouvé{filteredTickets.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Bar */}
          <div className="relative">
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">search</span>
            <input
              type="text"
              placeholder="Rechercher un ticket..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {[
              { value: 'ALL', label: 'Tous', icon: 'filter_list' },
              { value: 'EN_ATTENTE', label: 'En attente', icon: 'schedule' },
              { value: 'EN_COURS', label: 'En cours', icon: 'autorenew' },
              { value: 'TERMINE', label: 'Terminé', icon: 'check_circle' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => {
                  setFilterStatus(filter.value);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl font-medium transition ${
                  filterStatus === filter.value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="material-icons text-sm">{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-sm">title</span>
                    Titre
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-sm">description</span>
                    Description
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-sm">flag</span>
                    Statut
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-sm">event</span>
                    Date
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-sm">folder</span>
                    Type
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-sm">settings</span>
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentTickets.length > 0 ? (
                currentTickets.map((ticket) => {
                  const badge = getStatusBadge(ticket.status);
                  return (
                    <tr key={ticket.id} className="hover:bg-indigo-50/50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <span className="material-icons text-white text-sm">description</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{ticket.title}</p>
                            <p className="text-xs text-gray-500">#{ticket.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                          {ticket.description || 'Pas de description'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}>
                          <span className="material-icons text-sm">{badge.icon}</span>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="material-icons text-sm">calendar_today</span>
                          <span className="text-sm">
                            {new Date(ticket.createdDate).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="material-icons text-sm text-indigo-600">insert_drive_file</span>
                          <span className="text-sm font-medium text-gray-700">{ticket.fileType || 'PDF'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleOpenDocumentModal(ticket)}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
                        >
                          <span className="material-icons text-sm">visibility</span>
                          Voir
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="material-icons text-6xl text-gray-300">inbox</span>
                      <p className="text-gray-500 font-medium">Aucun ticket trouvé</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Affichage de <span className="font-semibold">{indexOfFirstItem + 1}</span> à{' '}
              <span className="font-semibold">{Math.min(indexOfLastItem, filteredTickets.length)}</span> sur{' '}
              <span className="font-semibold">{filteredTickets.length}</span> tickets
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`inline-flex items-center gap-1 px-4 py-2 rounded-xl font-medium transition ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                <span className="material-icons text-sm">chevron_left</span>
                Précédent
              </button>

              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`w-10 h-10 rounded-xl font-semibold transition ${
                          currentPage === pageNumber
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} className="px-2 text-gray-400">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`inline-flex items-center gap-1 px-4 py-2 rounded-xl font-medium transition ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Suivant
                <span className="material-icons text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      {showDocumentModal && selectedTicket && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-icons text-4xl">description</span>
                  <div>
                    <h2 className="text-2xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {selectedTicket.title}
                    </h2>
                    <p className="text-indigo-100 text-sm">Ticket #{selectedTicket.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDocumentModal(false)}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-icons text-indigo-600 text-sm">flag</span>
                    <p className="text-xs font-semibold text-gray-600 uppercase">Statut</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusBadge(selectedTicket.status).bg} ${getStatusBadge(selectedTicket.status).text} ${getStatusBadge(selectedTicket.status).border}`}>
                    <span className="material-icons text-sm">{getStatusBadge(selectedTicket.status).icon}</span>
                    {getStatusBadge(selectedTicket.status).label}
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-icons text-indigo-600 text-sm">event</span>
                    <p className="text-xs font-semibold text-gray-600 uppercase">Date de création</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(selectedTicket.createdDate).toLocaleString('fr-FR')}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-icons text-indigo-600 text-sm">folder</span>
                    <p className="text-xs font-semibold text-gray-600 uppercase">Type de fichier</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{selectedTicket.fileType || 'PDF'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-icons text-indigo-600 text-sm">numbers</span>
                    <p className="text-xs font-semibold text-gray-600 uppercase">Nombre total</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{selectedTicket.totalNumber || '0'}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-icons text-indigo-600">notes</span>
                  <p className="text-sm font-bold text-gray-700 uppercase">Description</p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {selectedTicket.description || 'Aucune description disponible'}
                </p>
              </div>

              {selectedTicket.fileName ? (
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-icons text-3xl text-indigo-600">attachment</span>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">Document attaché</p>
                      <p className="text-sm text-gray-600">{selectedTicket.fileName}</p>
                    </div>
                  </div>
                  {selectedTicket.filePath ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDownloadFile(selectedTicket.id, selectedTicket.fileName)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-medium shadow-md hover:shadow-lg"
                      >
                        <span className="material-icons">download</span>
                        Télécharger
                      </button>
                      <button
                        onClick={() => handleViewDocument(selectedTicket.id, selectedTicket.fileName)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-medium shadow-md hover:shadow-lg"
                      >
                        <span className="material-icons">visibility</span>
                        Voir le document
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-amber-600">
                      <span className="material-icons">info</span>
                      <p className="text-sm font-medium">Le fichier n'est pas encore disponible</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-3 text-gray-500">
                    <span className="material-icons text-3xl">description</span>
                    <p className="text-sm">Aucun document attaché à ce ticket</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <button
                onClick={() => setShowDocumentModal(false)}
                className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-medium"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Landing;
