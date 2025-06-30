"use client";
import { useEffect, useState } from "react";
import ProtectedRoute from '../components/ProtectedRoute';
import Header from '../components/Header';

export default function RestaurantMenuPage() {
  const [menus, setMenus] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/menu")
      .then((res) => res.json())
      .then(setMenus);
  }, []);

  async function addMenu(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("http://localhost:4000/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ restaurant_id: 1, name, description, price: parseFloat(price) }),
    });
    if (res.ok) {
      setMsg("Menu added!");
      setName("");
      setDescription("");
      setPrice("");
      fetch("http://localhost:4000/menu").then((res) => res.json()).then(setMenus);
    } else setMsg("Failed to add menu");
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-6">Manage Menu</h1>
            <form className="mb-6 flex gap-4" onSubmit={addMenu}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="border p-2 rounded flex-1"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="border p-2 rounded flex-1"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="border p-2 rounded flex-1"
                required
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add</button>
            </form>
            <div className="border rounded p-4">
              <h3 className="text-lg font-semibold mb-4">Current Menu Items</h3>
              <ul className="space-y-2">
                {menus.map((m) => (
                  <li key={m.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <b className="text-gray-900">{m.name}</b> - {m.description}
                    </div>
                    <span className="text-green-600 font-semibold">${m.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            {msg && <div className="mt-4 text-green-700 font-medium">{msg}</div>}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 