"use client";
import { useEffect, useState } from "react";
import ProtectedRoute from '../components/ProtectedRoute';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

export default function RestaurantProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/restaurant/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("restaurant_token")}` },
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
        Authorization: `Bearer ${localStorage.getItem("restaurant_token")}`,
      },
      body: JSON.stringify({ name, description }),
    });
    if (res.ok) setMsg("Profile updated!");
    else setMsg("Failed to update profile");
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Restaurant Profile</h1>
            <p className="mt-1 text-sm text-gray-600">
              Update your restaurant information and settings
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Form */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Profile</h3>
                <form className="space-y-4" onSubmit={saveProfile}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Restaurant Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Restaurant Name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      placeholder="Restaurant description"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  {msg && (
                    <div className={`text-center p-3 rounded-lg ${
                      msg.includes('updated') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {msg}
                    </div>
                  )}
                </form>
              </div>

              {/* Current Profile Info */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Current Information</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
                      <p className="text-gray-900 font-medium">{user?.restaurantName || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Owner Name</label>
                      <p className="text-gray-900 font-medium">{user?.ownerName || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-gray-900 font-medium">{user?.email || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="text-gray-900 font-medium">{user?.phone || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <p className="text-gray-900 font-medium">{user?.address || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cuisine Type</label>
                      <p className="text-gray-900 font-medium">{user?.cuisine || 'Not set'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 