"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function RestaurantOnboardingPage() {
  // In a real app, fetch status from backend
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending");
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    // Simulate ownerId = 2; in real app, get from auth
    const ownerId = 2;
    const socket: Socket = io("http://localhost:4000");
    socket.emit("joinNotifications", { userId: ownerId });
    socket.on("restaurantApproved", () => {
      setStatus("approved");
      setNotified(true);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  let message = "";
  if (status === "pending") message = "Your restaurant registration is pending admin approval.";
  if (status === "approved") message = "Congratulations! Your restaurant is approved and live.";
  if (status === "rejected") message = "Sorry, your restaurant registration was rejected. Please contact support.";

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-xl font-bold text-center">
        {message}
        {notified && (
          <div className="mt-4 text-green-700">(Real-time approval received!)</div>
        )}
      </div>
    </main>
  );
} 