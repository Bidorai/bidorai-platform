"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import ProtectedRoute from '../components/ProtectedRoute';
import Header from '../components/Header';

const SOCKET_URL = "http://localhost:4000";
const RESTAURANT_ID = 1;

export default function RestaurantBiddingPage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [rounds, setRounds] = useState<any[]>([]);
  const [selectedRound, setSelectedRound] = useState<string | null>(null);
  const [bids, setBids] = useState<any[]>([]);
  const [winner, setWinner] = useState<any>(null);

  useEffect(() => {
    const s = io(SOCKET_URL);
    setSocket(s);
    // Simulate fetching active rounds for this restaurant
    setRounds([{ id: "demo-round", menuId: 1, isActive: true }]);
    s.emit("joinBiddingRound", { roundId: "demo-round" });
    s.on("biddingRoundState", (round) => {
      setBids(round.bids || []);
    });
    s.on("biddingRoundEnded", ({ winner }) => {
      setWinner(winner);
    });
    return () => {
      s.disconnect();
    };
  }, []);

  function handleDeclareWinner() {
    if (!socket || !selectedRound) return;
    // In real app, backend would handle this automatically
    socket.emit("startBiddingRound", { roundId: selectedRound, menuId: 1, restaurantId: RESTAURANT_ID });
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Bidding Management</h1>
            <p className="mt-1 text-sm text-gray-600">
              Monitor and manage live bidding sessions for your menu items
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Active Rounds:</h3>
                <div className="border rounded-lg p-4 min-h-[200px]">
                  {rounds.map((round) => (
                    <div key={round.id} className="mb-2">
                      <button
                        className={`text-left w-full p-3 rounded-lg border transition-colors ${
                          selectedRound === round.id 
                            ? "bg-blue-50 border-blue-200 text-blue-700 font-semibold" 
                            : "hover:bg-gray-50 border-gray-200"
                        }`}
                        onClick={() => setSelectedRound(round.id)}
                      >
                        <div className="font-medium">{round.id}</div>
                        <div className="text-sm text-gray-500">Menu ID: {round.menuId}</div>
                        <div className="text-sm text-green-600">Active</div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {selectedRound && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Bids for {selectedRound}:</h3>
                  <div className="border rounded-lg p-4 min-h-[200px]">
                    {bids.length > 0 ? (
                      <div className="space-y-2">
                        {bids.map((bid, i) => (
                          <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">User {bid.userId}</span>
                            <span className="text-green-600 font-bold">${bid.amount}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No bids yet</p>
                    )}
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <button
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      onClick={handleDeclareWinner}
                    >
                      Declare Winner (Simulate End)
                    </button>
                    
                    {winner && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="text-green-800 font-bold text-center">
                          🎉 Winner: User {winner.userId} with ${winner.amount}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 