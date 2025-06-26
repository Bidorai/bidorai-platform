"use client";
import { useEffect, useState } from "react";

export default function RestaurantDashboardPage() {
  // Stubs for best-selling items and revenue trend
  const bestSellingItems = [
    { id: 1, name: "Party Platter", sold: 120 },
    { id: 2, name: "Family Feast", sold: 90 },
  ];
  const revenueTrend = [
    { month: "Jan", revenue: 1200 },
    { month: "Feb", revenue: 1500 },
    { month: "Mar", revenue: 1800 },
  ];
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/review")
      .then((res) => res.json())
      .then(setReviews);
  }, []);

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">Restaurant Dashboard</h2>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold mb-2">Best Selling Items</h3>
          <ul className="border rounded p-2">
            {bestSellingItems.map((item) => (
              <li key={item.id} className="mb-2">{item.name} (Sold: {item.sold})</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Revenue Trend</h3>
          <ul className="border rounded p-2">
            {revenueTrend.map((r) => (
              <li key={r.month} className="mb-2">{r.month}: ${r.revenue}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Recent Reviews</h3>
        <ul className="border rounded p-2">
          {reviews.slice(0, 5).map((r) => (
            <li key={r.id} className="mb-2">
              Order #{r.order_id}, User {r.user_id}, Rating: {r.rating}, Comment: {r.comment}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
} 