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

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function RestaurantAnalyticsPage() {
  const [summary, setSummary] = useState<any>(null);
  const [ordersOverTime, setOrdersOverTime] = useState<any[]>([]);
  const [ratingsDist, setRatingsDist] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/restaurant-analytics/summary", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then(setSummary);
    fetch("http://localhost:4000/restaurant-analytics/orders-over-time", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then(setOrdersOverTime);
    fetch("http://localhost:4000/restaurant-analytics/ratings-distribution", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">Restaurant Analytics</h2>
      {!summary ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="mb-4">Total Orders: <b>{summary.totalOrders}</b></div>
          <div className="mb-4">Total Revenue: <b>${summary.totalRevenue}</b></div>
          <div className="mb-4">Average Rating: <b>{summary.avgRating.toFixed(2)}</b></div>
        </>
      )}
      <div className="mb-8">
        <h3 className="font-semibold mb-2">Orders Over Time</h3>
        <Bar data={barData} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Ratings Distribution</h3>
        <Pie data={pieData} />
      </div>
    </main>
  );
} 