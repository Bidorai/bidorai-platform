"use client";
import { useState } from "react";

type Mode = "login" | "register";

export default function DeliveryPartnerAuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setToken("");
    const endpoint = mode === "register" ? "/delivery-partner/register" : "/delivery-partner/login";
    const res = await fetch(`http://localhost:4000${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
    } else {
      setError(data.error || "Unknown error");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-center">
          {mode === "login" ? "Login" : "Register"}
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          {mode === "login" ? "Login" : "Register"}
        </button>
        <button
          type="button"
          className="text-blue-600 underline"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login" ? "Need an account? Register" : "Already have an account? Login"}
        </button>
        {error && <div className="text-red-600">{error}</div>}
        {token && <div className="text-green-600 break-all">Token: {token}</div>}
      </form>
    </main>
  );
} 