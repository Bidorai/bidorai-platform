"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

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
    <main className="flex flex-col items-center gap-4 p-8">
      <h2 className="text-2xl font-bold">Bidding Management</h2>
      <div className="w-full max-w-md">
        <h3 className="font-semibold">Active Rounds:</h3>
        <ul className="border rounded p-2 min-h-[60px]">
          {rounds.map((round) => (
            <li key={round.id}>
              <button
                className={`underline ${selectedRound === round.id ? "font-bold" : ""}`}
                onClick={() => setSelectedRound(round.id)}
              >
                {round.id}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedRound && (
        <>
          <div className="w-full max-w-md">
            <h3 className="font-semibold">Bids for {selectedRound}:</h3>
            <ul className="border rounded p-2 min-h-[60px]">
              {bids.map((bid, i) => (
                <li key={i}>
                  User {bid.userId}: ${bid.amount}
                </li>
              ))}
            </ul>
          </div>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded mt-4"
            onClick={handleDeclareWinner}
          >
            Declare Winner (Simulate End)
          </button>
          {winner && (
            <div className="text-green-700 font-bold mt-2">
              Winner: User {winner.userId} with ${winner.amount}
            </div>
          )}
        </>
      )}
    </main>
  );
} 