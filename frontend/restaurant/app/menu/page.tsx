"use client";
import { useEffect, useState } from "react";

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
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Menu</h2>
      <form className="mb-4 flex gap-2" onSubmit={addMenu}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button className="bg-green-600 text-white px-2 py-1 rounded">Add</button>
      </form>
      <ul className="border rounded p-2">
        {menus.map((m) => (
          <li key={m.id} className="mb-2">
            <b>{m.name}</b> - {m.description} (${m.price})
          </li>
        ))}
      </ul>
      {msg && <div className="mt-4 text-green-700">{msg}</div>}
    </main>
  );
} 