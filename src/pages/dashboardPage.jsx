import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { ticketsAPI, usersAPI } from "../api/api";
import { useAuth } from "../context/AuthContext";

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTickets: 0,
    pendingTickets: 0,
    completedTickets: 0,
    inProgressTickets: 0,
    cancelledTickets: 0,
    totalUsers: 0,
    activeUsers: 0,
    recentTickets: [],
    monthlyData: {
      labels: [],
      created: [],
      completed: []
    },
    weeklyData: {
      labels: [],
      values: []
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Charger les tickets
      const ticketsResponse = await ticketsAPI.getAll();
      let tickets = [];
      if (ticketsResponse.success) {
        tickets = ticketsResponse.data;
      }

      // Charger les utilisateurs (seulement pour ADMIN)
      let users = [];
      if (user?.role === "ADMIN") {
        const usersResponse = await usersAPI.getAll();
        if (usersResponse.success) {
          users = usersResponse.data;
        }
      }

      // Calculer les statistiques
      const monthlyStats = calculateMonthlyStats(tickets);
      const weeklyStats = calculateWeeklyStats(tickets);

      const stats = {
        totalTickets: tickets.length,
        pendingTickets: tickets.filter((t) => t.status === "EN_ATTENTE").length,
        completedTickets: tickets.filter((t) => t.status === "TERMINE").length,
        inProgressTickets: tickets.filter((t) => t.status === "EN_COURS").length,
        cancelledTickets: tickets.filter((t) => t.status === "ANNULE").length,
        totalUsers: users.length,
        activeUsers: users.filter((u) => u.active).length,
        recentTickets: tickets.slice(0, 5),
        monthlyData: monthlyStats,
        weeklyData: weeklyStats,
      };

      setStats(stats);
    } catch (err) {
      console.error("Erreur lors du chargement du dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculer les statistiques mensuelles dynamiquement
  const calculateMonthlyStats = (tickets) => {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    const currentYear = new Date().getFullYear();
    const created = new Array(12).fill(0);
    const completed = new Array(12).fill(0);

    tickets.forEach(ticket => {
      const createdDate = new Date(ticket.createdDate);
      if (createdDate.getFullYear() === currentYear) {
        const month = createdDate.getMonth();
        created[month]++;
        if (ticket.status === 'TERMINE') {
          completed[month]++;
        }
      }
    });

    return { labels: months, created, completed };
  };

  // Calculer les statistiques hebdomadaires dynamiquement
  const calculateWeeklyStats = (tickets) => {
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const values = new Array(7).fill(0);
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    tickets.forEach(ticket => {
      const createdDate = new Date(ticket.createdDate);
      if (createdDate >= oneWeekAgo && createdDate <= today) {
        const dayIndex = (createdDate.getDay() + 6) % 7; // Convertir Dimanche=0 à Lundi=0
        values[dayIndex]++;
      }
    });

    return { labels: days, values };
  };

  // Configuration des graphiques Chart.js
  const ticketStatusData = {
    labels: ['En attente', 'En cours', 'Terminé', 'Annulé'],
    datasets: [
      {
        label: 'Tickets par statut',
        data: [
          stats.pendingTickets,
          stats.inProgressTickets,
          stats.completedTickets,
          stats.cancelledTickets,
        ],
        backgroundColor: [
          'rgba(251, 191, 36, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(251, 191, 36)',
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const monthlyTicketsData = {
    labels: stats.monthlyData.labels,
    datasets: [
      {
        label: 'Tickets créés',
        data: stats.monthlyData.created,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Tickets terminés',
        data: stats.monthlyData.completed,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const performanceData = {
    labels: stats.weeklyData.labels,
    datasets: [
      {
        label: 'Tickets traités',
        data: stats.weeklyData.values,
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          family: "'Inter', sans-serif",
          size: 14,
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 13,
        },
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      },
    },
  };

  const StatCard = ({ title, value, icon, gradient, change, changeType }) => (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-gray-600 text-xs font-medium mb-1.5 truncate">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {value}
          </p>
          {change && (
            <div className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
              changeType === 'up' 
                ? 'bg-green-50 text-green-700' 
                : changeType === 'down' 
                ? 'bg-red-50 text-red-700' 
                : 'bg-gray-50 text-gray-700'
            }`}>
              <span className="material-icons" style={{ fontSize: '14px' }}>
                {changeType === 'up' ? 'trending_up' : changeType === 'down' ? 'trending_down' : 'remove'}
              </span>
              <span className="text-xs">{change}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <span className="material-icons text-white text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );

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
          <p className="text-gray-600 font-medium">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  const completionRate = stats.totalTickets > 0 
    ? Math.round((stats.completedTickets / stats.totalTickets) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-icons text-3xl text-indigo-600">dashboard</span>
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Tableau de Bord
          </h1>
        </div>
        <p className="text-gray-600 text-sm ml-11">
          Bienvenue {user?.firstName} {user?.lastName} · Vue d'ensemble de vos activités
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Tickets"
          value={stats.totalTickets}
          icon="confirmation_number"
          gradient="from-indigo-500 to-purple-600"
          change="+12%"
          changeType="up"
        />
        <StatCard
          title="En Attente"
          value={stats.pendingTickets}
          icon="schedule"
          gradient="from-yellow-400 to-orange-500"
          change="3 nouveaux"
          changeType="neutral"
        />
        <StatCard
          title="Terminés"
          value={stats.completedTickets}
          icon="check_circle"
          gradient="from-green-400 to-emerald-600"
          change="+8%"
          changeType="up"
        />
        <StatCard
          title="Taux Réussite"
          value={`${completionRate}%`}
          icon="analytics"
          gradient="from-blue-500 to-cyan-600"
          change="+2.5%"
          changeType="up"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Doughnut Chart */}
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-icons text-indigo-600 text-xl">pie_chart</span>
            <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Répartition des Tickets
            </h2>
          </div>
          <div style={{ height: '220px' }}>
            <Doughnut data={ticketStatusData} options={chartOptions} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-icons text-purple-600 text-xl">bar_chart</span>
            <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Performance Hebdomadaire
            </h2>
          </div>
          <div style={{ height: '220px' }}>
            <Bar data={performanceData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-icons text-blue-600 text-xl">show_chart</span>
          <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Évolution Mensuelle
          </h2>
        </div>
        <div style={{ height: '250px' }}>
          <Line data={monthlyTicketsData} options={chartOptions} />
        </div>
      </div>

      {/* User Stats (Admin Only) */}
      {user?.role === "ADMIN" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md p-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <span className="material-icons text-4xl opacity-80">group</span>
              <div className="text-right">
                <p className="text-2xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {stats.totalUsers}
                </p>
                <p className="text-white/80 text-xs mt-0.5">Utilisateurs</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Actifs</span>
                <span className="font-bold">{stats.activeUsers}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl shadow-md p-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <span className="material-icons text-4xl opacity-80">verified</span>
              <div className="text-right">
                <p className="text-2xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {completionRate}%
                </p>
                <p className="text-white/80 text-xs mt-0.5">Taux Complétion</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Ce mois</span>
                <span className="font-bold">+5.2%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-md p-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <span className="material-icons text-4xl opacity-80">pending_actions</span>
              <div className="text-right">
                <p className="text-2xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {stats.inProgressTickets}
                </p>
                <p className="text-white/80 text-xs mt-0.5">En Cours</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Priorité haute</span>
                <span className="font-bold">3</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Tickets Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="material-icons text-indigo-600">receipt_long</span>
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Tickets Récents
            </h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Titre
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.recentTickets.length > 0 ? (
                stats.recentTickets.map((ticket) => {
                  const badge = getStatusBadge(ticket.status);
                  return (
                    <tr key={ticket.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                            <span className="material-icons text-indigo-600">description</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{ticket.title}</p>
                            <p className="text-sm text-gray-500 line-clamp-1">{ticket.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}>
                          <span className="material-icons text-sm">{badge.icon}</span>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="material-icons text-sm">event</span>
                          <span className="text-sm">
                            {new Date(ticket.createdDate).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="material-icons text-sm">insert_drive_file</span>
                          <span className="text-sm font-medium">{ticket.fileType || 'PDF'}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="material-icons text-6xl text-gray-300">inbox</span>
                      <p className="text-gray-500 font-medium">Aucun ticket récent</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
