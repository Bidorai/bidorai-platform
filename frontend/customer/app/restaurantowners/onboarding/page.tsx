"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import ProtectedRoute from '../components/ProtectedRoute';
import Header from '../components/Header';

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
  let statusColor = "";
  let statusIcon = "";
  
  if (status === "pending") {
    message = "Your restaurant registration is pending admin approval.";
    statusColor = "text-yellow-600";
    statusIcon = "⏳";
  }
  if (status === "approved") {
    message = "Congratulations! Your restaurant is approved and live.";
    statusColor = "text-green-600";
    statusIcon = "✅";
  }
  if (status === "rejected") {
    message = "Sorry, your restaurant registration was rejected. Please contact support.";
    statusColor = "text-red-600";
    statusIcon = "❌";
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Onboarding Status</h1>
            <p className="mt-1 text-sm text-gray-600">
              Track your restaurant approval process
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">{statusIcon}</div>
              <h2 className={`text-2xl font-bold mb-4 ${statusColor}`}>
                {status === "pending" && "Pending Approval"}
                {status === "approved" && "Approved!"}
                {status === "rejected" && "Registration Rejected"}
              </h2>
              <p className="text-lg text-gray-600 mb-6">{message}</p>
              
              {notified && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="text-green-700 font-medium">
                    🎉 Real-time approval received!
                  </div>
                </div>
              )}

              {status === "pending" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Our team will review your restaurant information</li>
                    <li>• We'll verify your business details</li>
                    <li>• You'll receive an email notification once approved</li>
                    <li>• You can start adding menu items and accepting orders</li>
                  </ul>
                </div>
              )}

              {status === "approved" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-medium text-green-900 mb-2">You're all set!</h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Your restaurant is now live on the platform</li>
                    <li>• Start adding menu items in the Menu section</li>
                    <li>• Begin accepting orders from customers</li>
                    <li>• Monitor your performance in the Analytics section</li>
                  </ul>
                </div>
              )}

              {status === "rejected" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-medium text-red-900 mb-2">Need help?</h3>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Contact our support team for assistance</li>
                    <li>• Review your application information</li>
                    <li>• Ensure all required documents are submitted</li>
                    <li>• You may reapply after addressing any issues</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 