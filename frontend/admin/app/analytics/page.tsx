"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function AdminAnalyticsPage() {
  const [summary, setSummary] = useState<any>(null);
  const [ordersOverTime, setOrdersOverTime] = useState<any[]>([]);
  const [userGrowth, setUserGrowth] = useState<any[]>([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [menuId, setMenuId] = useState("");
  const [menuAnalytics, setMenuAnalytics] = useState<any[]>([]);
  const [regionAnalytics, setRegionAnalytics] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:4000/admin-analytics/summary", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then(setSummary);
    fetch("http://localhost:4000/admin-analytics/orders-over-time", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then(setOrdersOverTime);
    fetch("http://localhost:4000/admin-analytics/user-growth", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then(setUserGrowth);
    if (restaurantId && menuId) {
      fetch(`http://localhost:4000/admin-analytics/menu-analytics?restaurant_id=${restaurantId}&menu_id=${menuId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then(setMenuAnalytics);
    }
    fetch("http://localhost:4000/admin-analytics/region-analytics", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then(setRegionAnalytics);
  }, [restaurantId, menuId]);

  const ordersBarData = {
    labels: ordersOverTime.map((o) => o.date),
    datasets: [
      {
        label: "Orders",
        data: ordersOverTime.map((o) => o.count),
        backgroundColor: "#2563eb",
      },
    ],
  };

  const usersBarData = {
    labels: userGrowth.map((u) => u.date),
    datasets: [
      {
        label: "New Users",
        data: userGrowth.map((u) => u.count),
        backgroundColor: "#22c55e",
      },
    ],
  };

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Analytics</h2>
      {!summary ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="mb-4">Total Users: <b>{summary.userCount}</b></div>
          <div className="mb-4">Total Restaurants: <b>{summary.restaurantCount}</b></div>
          <div className="mb-4">Total Orders: <b>{summary.orderCount}</b></div>
          <div className="mb-4">Total Revenue: <b>${summary.totalRevenue}</b></div>
        </>
      )}
      <div className="mb-4 flex gap-4 items-center">
        <label>
          Restaurant ID:
          <input type="text" value={restaurantId} onChange={e => setRestaurantId(e.target.value)} className="border p-2 rounded ml-2" />
        </label>
        <label>
          Menu ID:
          <input type="text" value={menuId} onChange={e => setMenuId(e.target.value)} className="border p-2 rounded ml-2" />
        </label>
      </div>
      <div className="mb-8">
        <h3 className="font-semibold mb-2">Orders Over Time</h3>
        <Bar data={ordersBarData} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">User Growth</h3>
        <Bar data={usersBarData} />
      </div>
      <div className="mb-8">
        <h3 className="font-semibold mb-2">Region Analytics (Stub)</h3>
        <table className="w-full border rounded">
          <thead>
            <tr>
              <th className="border p-2">Region</th>
              <th className="border p-2">Users</th>
              <th className="border p-2">Restaurants</th>
              <th className="border p-2">Orders</th>
            </tr>
          </thead>
          <tbody>
            {regionAnalytics && regionAnalytics.users.map((u: any, i: number) => (
              <tr key={u.region}>
                <td className="border p-2">{u.region}</td>
                <td className="border p-2">{u.count}</td>
                <td className="border p-2">{regionAnalytics.restaurants[i]?.count || 0}</td>
                <td className="border p-2">{regionAnalytics.orders[i]?.count || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
} 