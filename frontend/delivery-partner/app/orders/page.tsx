"use client";
import { useEffect, useState } from "react";

export default function DeliveryPartnerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [msg, setMsg] = useState("");

  function fetchOrders() {
    fetch("http://localhost:4000/delivery-partner/orders", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then(setOrders);
  }

  useEffect(() => {
    fetchOrders();
  }, [msg]);

  async function acceptOrder(id: number) {
    setMsg("");
    const res = await fetch(`http://localhost:4000/delivery-partner/orders/${id}/accept`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (res.ok) setMsg("Order accepted!");
    else setMsg("Failed to accept order");
  }

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">Assigned Orders</h2>
      <ul className="border rounded p-2">
        {orders.length === 0 && <li>No assigned orders.</li>}
        {orders.map((o) => (
          <li key={o.id} className="mb-2 flex justify-between items-center">
            <span>
              Order #{o.id}: Restaurant {o.restaurant_id}, Menu {o.menu_id}, Status: {o.order_status}
            </span>
            <button
              className="bg-green-600 text-white px-2 py-1 rounded"
              onClick={() => acceptOrder(o.id)}
            >
              Accept
            </button>
          </li>
        ))}
      </ul>
      {msg && <div className="mt-4 text-green-700">{msg}</div>}
    </main>
  );
} 