"use client";
import { useUser, useClerk } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

export default function DebugPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { loaded } = useClerk();
  const [authHistory, setAuthHistory] = useState<string[]>([]);

  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString();
    const status = `[${timestamp}] Clerk loaded: ${loaded}, User loaded: ${isLoaded}, Signed in: ${isSignedIn}, User ID: ${user?.id || 'none'}`;
    setAuthHistory(prev => [...prev, status]);
  }, [loaded, isLoaded, isSignedIn, user?.id]);

  const clearHistory = () => {
    setAuthHistory([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Debug</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Current State</h2>
            <div className="space-y-2">
              <p><strong>Clerk Loaded:</strong> {loaded ? '✅ Yes' : '❌ No'}</p>
              <p><strong>User Loaded:</strong> {isLoaded ? '✅ Yes' : '❌ No'}</p>
              <p><strong>Signed In:</strong> {isSignedIn ? '✅ Yes' : '❌ No'}</p>
              <p><strong>User ID:</strong> {user?.id || 'None'}</p>
              <p><strong>Email:</strong> {user?.emailAddresses[0]?.emailAddress || 'None'}</p>
              <p><strong>Name:</strong> {user?.fullName || 'None'}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            <div className="space-y-2">
              <p><strong>First Name:</strong> {user?.firstName || 'None'}</p>
              <p><strong>Last Name:</strong> {user?.lastName || 'None'}</p>
              <p><strong>Image URL:</strong> {user?.imageUrl || 'None'}</p>
              <p><strong>Created At:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleString() : 'None'}</p>
              <p><strong>Updated At:</strong> {user?.updatedAt ? new Date(user.updatedAt).toLocaleString() : 'None'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Authentication History</h2>
            <button 
              onClick={clearHistory}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear History
            </button>
          </div>
          <div className="bg-gray-50 p-4 rounded max-h-96 overflow-y-auto">
            {authHistory.length === 0 ? (
              <p className="text-gray-500">No authentication events recorded yet.</p>
            ) : (
              <div className="space-y-1">
                {authHistory.map((entry, index) => (
                  <div key={index} className="text-sm font-mono bg-white p-2 rounded border">
                    {entry}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">URL Information</h2>
          <div className="space-y-2">
            <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Server side'}</p>
            <p><strong>Hash:</strong> {typeof window !== 'undefined' ? window.location.hash : 'Server side'}</p>
            <p><strong>Search:</strong> {typeof window !== 'undefined' ? window.location.search : 'Server side'}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 