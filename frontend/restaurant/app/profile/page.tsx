"use client";
import { useEffect, useState } from "react";

export default function RestaurantProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/restaurant/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setName(data?.name || "");
        setDescription(data?.description || "");
      });
  }, []);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("http://localhost:4000/restaurant/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, description }),
    });
    if (res.ok) setMsg("Profile updated!");
    else setMsg("Failed to update profile");
  }

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">Restaurant Profile</h2>
      <form className="flex flex-col gap-4 max-w-md" onSubmit={saveProfile}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button className="bg-blue-600 text-white p-2 rounded">Save</button>
        {msg && <div className="text-green-700">{msg}</div>}
      </form>
    </main>
  );
} 