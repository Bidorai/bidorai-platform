"use client";
import { useEffect, useState } from "react";

export default function ApprovalsPage() {
  const [pending, setPending] = useState<any[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/admin/restaurants/pending", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then(setPending);
  }, [msg]);

  async function approve(id: number) {
    setMsg("");
    const res = await fetch(`http://localhost:4000/admin/restaurants/${id}/approve`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (res.ok) setMsg("Approved!");
    else setMsg("Failed to approve");
  }

  async function reject(id: number) {
    setMsg("");
    // Stub: In real app, POST to /admin/restaurants/:id/reject
    setMsg("Rejected (stub)");
  }

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">Pending Restaurant Approvals</h2>
      <ul className="border rounded p-2">
        {pending.length === 0 && <li>No pending restaurants.</li>}
        {pending.map((r) => (
          <li key={r.id} className="mb-2 flex justify-between items-center">
            <span>
              <b>{r.name}</b> - {r.description}
            </span>
            <span>
              <button
                className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                onClick={() => approve(r.id)}
              >
                Approve
              </button>
              <button
                className="bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => reject(r.id)}
              >
                Reject
              </button>
            </span>
          </li>
        ))}
      </ul>
      {msg && <div className="mt-4 text-green-700">{msg}</div>}
    </main>
  );
} 