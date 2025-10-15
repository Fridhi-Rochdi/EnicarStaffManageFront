// API Configuration
const API_BASE_URL = 'http://localhost:8081/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to create headers
const createHeaders = (includeAuth = true, isMultipart = false) => {
  const headers = {};
  
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  // If 401, token expired - logout
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
    throw new Error('Session expirée. Veuillez vous reconnecter.');
  }
  
  // If 403, forbidden
  if (response.status === 403) {
    throw new Error('Accès refusé. Vous n\'avez pas les permissions nécessaires.');
  }
  
  return response.json();
};

// Authentication API
export const authAPI = {
  register: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: createHeaders(false),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: createHeaders(false),
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    
    if (result.success && result.data.token) {
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data));
    }
    
    return result;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!getAuthToken();
  },
};

// Tickets API
export const ticketsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'GET',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: 'GET',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  getByStatus: async (status) => {
    const response = await fetch(`${API_BASE_URL}/tickets/status/${status}`, {
      method: 'GET',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  getMyTickets: async () => {
    const response = await fetch(`${API_BASE_URL}/tickets/my-tickets`, {
      method: 'GET',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  create: async (ticketData, file) => {
    const formData = new FormData();
    
    // Add ticket data as JSON blob
    const ticketBlob = new Blob([JSON.stringify(ticketData)], {
      type: 'application/json',
    });
    formData.append('ticket', ticketBlob);
    
    // Add file if exists
    if (file) {
      formData.append('file', file);
    }
    
    const response = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: formData,
    });
    return handleResponse(response);
  },

  update: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: 'PUT',
      headers: createHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: 'DELETE',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },
};

// Exam Periods API
export const examPeriodsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/exam-periods`, {
      method: 'GET',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  getActive: async () => {
    const response = await fetch(`${API_BASE_URL}/exam-periods/active`, {
      method: 'GET',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  isActive: async () => {
    const response = await fetch(`${API_BASE_URL}/exam-periods/is-active`, {
      method: 'GET',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/exam-periods`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  activate: async (id) => {
    const response = await fetch(`${API_BASE_URL}/exam-periods/${id}/activate`, {
      method: 'PUT',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  deactivate: async (id) => {
    const response = await fetch(`${API_BASE_URL}/exam-periods/${id}/deactivate`, {
      method: 'PUT',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/exam-periods/${id}`, {
      method: 'DELETE',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },
};

// Room Reservations API
export const roomReservationsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/room-reservations`, {
      method: 'GET',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  getMyReservations: async () => {
    const response = await fetch(`${API_BASE_URL}/room-reservations/my-reservations`, {
      method: 'GET',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/room-reservations/${id}`, {
      method: 'GET',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  getByStatus: async (status) => {
    const response = await fetch(`${API_BASE_URL}/room-reservations/status/${status}`, {
      method: 'GET',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/room-reservations`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  validate: async (id, adminComment) => {
    const response = await fetch(`${API_BASE_URL}/room-reservations/${id}/validate`, {
      method: 'PUT',
      headers: createHeaders(),
      body: JSON.stringify({ adminComment }),
    });
    return handleResponse(response);
  },

  reject: async (id, adminComment) => {
    const response = await fetch(`${API_BASE_URL}/room-reservations/${id}/reject`, {
      method: 'PUT',
      headers: createHeaders(),
      body: JSON.stringify({ adminComment }),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/room-reservations/${id}`, {
      method: 'DELETE',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },
};

// Users API (Admin only)
export const usersAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'GET',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  update: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: createHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  toggleStatus: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}/toggle-status`, {
      method: 'PATCH',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },

  getByRole: async (role) => {
    const response = await fetch(`${API_BASE_URL}/users/by-role/${role}`, {
      method: 'GET',
      headers: createHeaders(),
    });
    return handleResponse(response);
  },
};

// Export default object with all APIs
export default {
  auth: authAPI,
  tickets: ticketsAPI,
  examPeriods: examPeriodsAPI,
  roomReservations: roomReservationsAPI,
  users: usersAPI,
};
