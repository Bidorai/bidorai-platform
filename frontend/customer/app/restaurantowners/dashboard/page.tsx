"use client";
import ProtectedRoute from '../components/ProtectedRoute';
import Header from '../components/Header';

export default function RestaurantDashboardPage() {
  return (
    <ProtectedRoute>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Restaurant Dashboard</h1>
          <p className="text-gray-600 mb-4">
            Welcome to your restaurant management portal. Here you can manage your menu, view orders, 
            monitor bidding sessions, and track your restaurant's performance.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Active Orders</h3>
              <p className="text-3xl font-bold text-blue-600">12</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Today's Revenue</h3>
              <p className="text-3xl font-bold text-green-600">$1,250</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800">Menu Items</h3>
              <p className="text-3xl font-bold text-purple-600">24</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-800">Active Bids</h3>
              <p className="text-3xl font-bold text-orange-600">8</p>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
} 