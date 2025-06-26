export default function AdminDashboard() {
  // Static demo data
  const users = [
    { id: 1, email: "customer@example.com", role: "customer" },
    { id: 2, email: "owner@example.com", role: "restaurant" },
    { id: 3, email: "admin@example.com", role: "admin" },
  ];
  const restaurants = [
    { id: 1, name: "Tasty Eats", owner: "owner@example.com" },
  ];
  const bids = [
    { id: 1, userId: 1, restaurantId: 1, menuId: 1, amount: 100, status: "won" },
  ];

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <section className="mb-8">
        <h3 className="font-semibold">Users</h3>
        <ul className="border rounded p-2">
          {users.map((u) => (
            <li key={u.id}>{u.email} ({u.role})</li>
          ))}
        </ul>
      </section>
      <section className="mb-8">
        <h3 className="font-semibold">Restaurants</h3>
        <ul className="border rounded p-2">
          {restaurants.map((r) => (
            <li key={r.id}>{r.name} (Owner: {r.owner})</li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="font-semibold">Bids</h3>
        <ul className="border rounded p-2">
          {bids.map((b) => (
            <li key={b.id}>User {b.userId} bid ${b.amount} on menu {b.menuId} (Status: {b.status})</li>
          ))}
        </ul>
      </section>
    </main>
  );
} 