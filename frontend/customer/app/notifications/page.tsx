"use client";
import { useEffect, useState } from "react";

export default function CustomerNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/notifications-history/customer?user_id=1")
      .then((res) => res.json())
      .then(setNotifications);
  }, []);

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">Notification History</h2>
      <ul className="border rounded p-2">
        {notifications.length === 0 && <li>No notifications.</li>}
        {notifications.map((n) => (
          <li key={n.id} className="mb-2">
            <span>{n.message}</span>
            <span className="ml-4 text-gray-500 text-sm">{n.created_at}</span>
          </li>
        ))}
      </ul>
    </main>
  );
} 