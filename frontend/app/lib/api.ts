import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API methods
export const restaurantAPI = {
  getAll: () => api.get('/api/restaurants'),
  getById: (id: string) => api.get(`/api/restaurants/${id}`),
  getMenus: (id: string) => api.get(`/api/restaurants/${id}/menus`),
};

export const biddingAPI = {
  getCurrentAuctions: () => api.get('/api/auctions/current'),
  placeBid: (auctionId: string, amount: number) => 
    api.post(`/api/auctions/${auctionId}/bid`, { amount }),
  getAuctionHistory: () => api.get('/api/auctions/history'),
};

export const orderAPI = {
  create: (data: any) => api.post('/api/orders', data),
  getMyOrders: () => api.get('/api/orders/my-orders'),
  getOrderById: (id: string) => api.get(`/api/orders/${id}`),
};