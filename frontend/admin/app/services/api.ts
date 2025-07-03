import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/admin/login', { email, password }),
  
  loginWithPhone: (phone: string, otp: string) =>
    api.post('/admin/login-phone', { phone, otp }),
  
  sendOTP: (phone: string) =>
    api.post('/admin/send-otp', { phone }),
  
  signup: (userData: any) =>
    api.post('/admin/signup', userData),
  
  getProfile: () =>
    api.get('/admin/profile'),
  
  updateProfile: (data: any) =>
    api.put('/admin/profile', data),
};

// Analytics API
export const analyticsAPI = {
  getSummary: () =>
    api.get('/admin-analytics/summary'),
  
  getOrdersOverTime: () =>
    api.get('/admin-analytics/orders-over-time'),
  
  getUserGrowth: () =>
    api.get('/admin-analytics/user-growth'),
  
  getMenuAnalytics: (restaurantId: string, menuId?: string) =>
    api.get('/admin-analytics/menu-analytics', {
      params: { restaurant_id: restaurantId, menu_id: menuId }
    }),
  
  getUserAnalytics: (role: string) =>
    api.get('/admin-analytics/user-analytics', {
      params: { role }
    }),
};

// Restaurant Management API
export const restaurantAPI = {
  getPendingApprovals: () =>
    api.get('/admin/restaurants/pending'),
  
  approveRestaurant: (id: string) =>
    api.post(`/admin/restaurants/${id}/approve`),
  
  rejectRestaurant: (id: string, reason?: string) =>
    api.post(`/admin/restaurants/${id}/reject`, { reason }),
  
  getAllRestaurants: (page = 1, limit = 10, search?: string) =>
    api.get('/admin/restaurants', {
      params: { page, limit, search }
    }),
  
  getRestaurantDetails: (id: string) =>
    api.get(`/admin/restaurants/${id}`),
  
  updateRestaurant: (id: string, data: any) =>
    api.put(`/admin/restaurants/${id}`, data),
  
  suspendRestaurant: (id: string, reason?: string) =>
    api.post(`/admin/restaurants/${id}/suspend`, { reason }),
  
  activateRestaurant: (id: string) =>
    api.post(`/admin/restaurants/${id}/activate`),
};

// User Management API
export const userAPI = {
  getAllUsers: (page = 1, limit = 10, role?: string, search?: string) =>
    api.get('/admin/users', {
      params: { page, limit, role, search }
    }),
  
  getUserDetails: (id: string) =>
    api.get(`/admin/users/${id}`),
  
  updateUser: (id: string, data: any) =>
    api.put(`/admin/users/${id}`, data),
  
  suspendUser: (id: string, reason?: string) =>
    api.post(`/admin/users/${id}/suspend`, { reason }),
  
  activateUser: (id: string) =>
    api.post(`/admin/users/${id}/activate`),
  
  deleteUser: (id: string) =>
    api.delete(`/admin/users/${id}`),
};

// Order Management API
export const orderAPI = {
  getAllOrders: (page = 1, limit = 10, status?: string, dateRange?: string) =>
    api.get('/admin/orders', {
      params: { page, limit, status, dateRange }
    }),
  
  getOrderDetails: (id: string) =>
    api.get(`/admin/orders/${id}`),
  
  updateOrderStatus: (id: string, status: string) =>
    api.put(`/admin/orders/${id}/status`, { status }),
  
  getOrderAnalytics: (dateRange?: string) =>
    api.get('/admin/orders/analytics', {
      params: { dateRange }
    }),
};

// Bidding Management API
export const biddingAPI = {
  getAllBids: (page = 1, limit = 10, status?: string) =>
    api.get('/admin/bids', {
      params: { page, limit, status }
    }),
  
  getBidDetails: (id: string) =>
    api.get(`/admin/bids/${id}`),
  
  updateBidStatus: (id: string, status: string) =>
    api.put(`/admin/bids/${id}/status`, { status }),
  
  getBiddingAnalytics: () =>
    api.get('/admin/bids/analytics'),
};

// Notification Management API
export const notificationAPI = {
  getAllNotifications: (page = 1, limit = 10, type?: string) =>
    api.get('/admin/notifications', {
      params: { page, limit, type }
    }),
  
  sendNotification: (data: any) =>
    api.post('/admin/notifications/send', data),
  
  getNotificationHistory: (page = 1, limit = 10) =>
    api.get('/admin/notifications/history', {
      params: { page, limit }
    }),
};

// System Settings API
export const settingsAPI = {
  getSystemSettings: () =>
    api.get('/admin/settings'),
  
  updateSystemSettings: (data: any) =>
    api.put('/admin/settings', data),
  
  getPlatformStats: () =>
    api.get('/admin/stats'),
};

export default api; 