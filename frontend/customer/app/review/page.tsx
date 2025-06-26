"use client";
import { useEffect, useState } from "react";

export default function ReviewPage() {
  const [orderId, setOrderId] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [filterRating, setFilterRating] = useState("");
  const [filterUserId, setFilterUserId] = useState("");
  const [sort, setSort] = useState("desc");

  function fetchReviews() {
    const params = new URLSearchParams();
    if (filterRating) params.append("rating", filterRating);
    if (filterUserId) params.append("user_id", filterUserId);
    if (sort) params.append("sort", sort);
    fetch(`http://localhost:4000/review?${params.toString()}`)
      .then((res) => res.json())
      .then(setReviews);
  }

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line
  }, [filterRating, filterUserId, sort, msg]);

  async function submitReview(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("http://localhost:4000/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id: orderId, user_id: 1, rating: parseInt(rating), comment }),
    });
    if (res.ok) setMsg("Review submitted!");
    else setMsg("Failed to submit review");
  }

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
      <form className="flex flex-col gap-4 max-w-md" onSubmit={submitReview}>
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={e => setOrderId(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={e => setRating(e.target.value)}
          className="border p-2 rounded"
          min={1}
          max={5}
          required
        />
        <textarea
          placeholder="Comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="border p-2 rounded"
        />
        <button className="bg-blue-600 text-white p-2 rounded">Submit</button>
        {msg && <div className="text-green-700">{msg}</div>}
      </form>
      <h3 className="text-lg font-bold mt-8 mb-2">All Reviews</h3>
      <div className="mb-4 flex gap-4 items-center">
        <select value={filterRating} onChange={e => setFilterRating(e.target.value)} className="border p-2 rounded">
          <option value="">All Ratings</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
        <input
          type="text"
          placeholder="User ID"
          value={filterUserId}
          onChange={e => setFilterUserId(e.target.value)}
          className="border p-2 rounded"
        />
        <select value={sort} onChange={e => setSort(e.target.value)} className="border p-2 rounded">
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>
      <ul className="border rounded p-2">
        {reviews.map((r) => (
          <li key={r.id} className="mb-2">
            Order #{r.order_id}, User {r.user_id}, Rating: {r.rating}, Comment: {r.comment}
          </li>
        ))}
      </ul>
    </main>
  );
} 