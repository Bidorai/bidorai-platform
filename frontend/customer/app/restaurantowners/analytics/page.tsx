"use client";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ProtectedRoute from '../components/ProtectedRoute';
import Header from '../components/Header';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function RestaurantAnalyticsPage() {
  const [summary, setSummary] = useState<any>(null);
  const [ordersOverTime, setOrdersOverTime] = useState<any[]>([]);
  const [ratingsDist, setRatingsDist] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/restaurant-analytics/summary", {
      headers: { Authorization: `Bearer ${localStorage.getItem("restaurant_token")}` },
    })
      .then((res) => res.json())
      .then(setSummary);
    fetch("http://localhost:4000/restaurant-analytics/orders-over-time", {
      headers: { Authorization: `Bearer ${localStorage.getItem("restaurant_token")}` },
    })
      .then((res) => res.json())
      .then(setOrdersOverTime);
    fetch("http://localhost:4000/restaurant-analytics/ratings-distribution", {
      headers: { Authorization: `Bearer ${localStorage.getItem("restaurant_token")}` },
    })
      .then((res) => res.json())
      .then(setRatingsDist);
  }, []);

  const barData = {
    labels: ordersOverTime.map((o) => o.date),
    datasets: [
      {
        label: "Orders",
        data: ordersOverTime.map((o) => o.count),
        backgroundColor: "#2563eb",
      },
    ],
  };

  const pieData = {
    labels: ratingsDist.map((r) => r.rating),
    datasets: [
      {
        label: "Ratings",
        data: ratingsDist.map((r) => r.count),
        backgroundColor: ["#22c55e", "#3b82f6", "#f59e42", "#f43f5e", "#a21caf"],
      },
    ],
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Restaurant Analytics</h1>
            <p className="mt-1 text-sm text-gray-600">
              Track your restaurant's performance and customer satisfaction
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            {!summary ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading analytics...</span>
              </div>
            ) : (
              <>
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800">Total Orders</h3>
                    <p className="text-3xl font-bold text-blue-600">{summary.totalOrders}</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800">Total Revenue</h3>
                    <p className="text-3xl font-bold text-green-600">${summary.totalRevenue}</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-800">Average Rating</h3>
                    <p className="text-3xl font-bold text-purple-600">{summary.avgRating.toFixed(2)}</p>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Orders Over Time</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Bar data={barData} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Ratings Distribution</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Pie data={pieData} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 