"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import Link from "next/link";

interface Menu {
  id: number;
  name: string;
  description: string;
  price: number;
  restaurant_name: string;
}

interface Bid {
  id: number;
  userId: number;
  amount: number;
  timestamp: string;
  userName?: string;
}

const SOCKET_URL = "http://localhost:4000";

export default function BiddingPage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [amount, setAmount] = useState("");
  const [bids, setBids] = useState<Bid[]>([]);
  const [winner, setWinner] = useState<any>(null);
  const [isActive, setIsActive] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [roundId, setRoundId] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth');
      return;
    }

    fetchMenus();
    initializeSocket();
  }, [router]);

  useEffect(() => {
    const menuId = searchParams.get('menuId');
    if (menuId && menus.length > 0) {
      const menu = menus.find(m => m.id === parseInt(menuId));
      if (menu) {
        setSelectedMenu(menu);
        setRoundId(`round-${menu.id}-${Date.now()}`);
      }
    }
  }, [searchParams, menus]);

  const fetchMenus = async () => {
    try {
      const response = await fetch("http://localhost:4000/menu");
      if (response.ok) {
        const data = await response.json();
        setMenus(data);
      } else {
        setError("Failed to load menus");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const initializeSocket = () => {
    const s = io(SOCKET_URL);
    setSocket(s);

    s.on("connect", () => {
      console.log("Connected to bidding socket");
    });

    s.on("biddingRoundState", (round) => {
      setBids(round.bids || []);
      setIsActive(round.isActive);
    });

    s.on("biddingRoundEnded", ({ winner }) => {
      setWinner(winner);
      setIsActive(false);
    });

    s.on("newBid", (bid) => {
      setBids(prev => [...prev, bid]);
    });

    return () => {
      s.disconnect();
    };
  };

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socket || !selectedMenu || !amount) return;

    const bidAmount = parseFloat(amount);
    if (bidAmount <= 0) {
      setError("Bid amount must be greater than 0");
      return;
    }

    socket.emit("placeBid", { 
      roundId, 
      userId: 1, // In real app, get from JWT
      amount: bidAmount,
      menuId: selectedMenu.id
    });
    setAmount("");
    setError("");
  };

  const handleStartRound = () => {
    if (!socket || !selectedMenu) return;
    
    const newRoundId = `round-${selectedMenu.id}-${Date.now()}`;
    setRoundId(newRoundId);
    setWinner(null);
    setBids([]);
    
    socket.emit("startBiddingRound", { 
      roundId: newRoundId, 
      menuId: selectedMenu.id, 
      restaurantId: 1 
    });
  };

  const handleMenuSelect = (menu: Menu) => {
    setSelectedMenu(menu);
    setRoundId(`round-${menu.id}-${Date.now()}`);
    setWinner(null);
    setBids([]);
    setIsActive(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bidding interface...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Bidorai
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
                Dashboard
              </Link>
              <Link href="/menu" className="text-blue-600 hover:text-blue-800">
                Browse Menus
              </Link>
              <Link href="/orders" className="text-blue-600 hover:text-blue-800">
                My Orders
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  router.push('/');
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Bidding</h1>
          <p className="text-gray-600">Place bids on party trays and get the best prices</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Menu Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Menu</h2>
              {menus.length === 0 ? (
                <p className="text-gray-600">No menus available</p>
              ) : (
                <div className="space-y-3">
                  {menus.map((menu) => (
                    <button
                      key={menu.id}
                      onClick={() => handleMenuSelect(menu)}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        selectedMenu?.id === menu.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900">{menu.name}</h3>
                      <p className="text-sm text-gray-600">{menu.restaurant_name}</p>
                      <p className="text-sm text-gray-500">${menu.price}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bidding Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              {!selectedMenu ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Menu</h3>
                  <p className="text-gray-600">Choose a menu from the left to start bidding</p>
                </div>
              ) : (
                <>
                  {/* Selected Menu Info */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{selectedMenu.name}</h2>
                    <p className="text-gray-600 mb-2">{selectedMenu.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{selectedMenu.restaurant_name}</span>
                      <span className="text-lg font-bold text-blue-600">${selectedMenu.price}</span>
                    </div>
                  </div>

                  {/* Bidding Controls */}
                  <div className="mb-6">
                    <button
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleStartRound}
                      disabled={isActive}
                    >
                      {isActive ? "Bidding Active" : "Start Bidding Round"}
                    </button>
                  </div>

                  {/* Bid Form */}
                  <form onSubmit={handleBid} className="mb-6">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label htmlFor="bid-amount" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Bid Amount ($)
                        </label>
                        <input
                          type="number"
                          id="bid-amount"
                          step="0.01"
                          min="0"
                          placeholder="Enter your bid"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          disabled={!isActive}
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!isActive || !amount}
                        >
                          Place Bid
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                      {error}
                    </div>
                  )}

                  {/* Live Bids */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Bids</h3>
                    <div className="bg-gray-50 rounded-lg p-4 min-h-[200px] max-h-[300px] overflow-y-auto">
                      {bids.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">
                          {isActive ? "No bids yet. Be the first to bid!" : "Bidding not started"}
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {bids.map((bid, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-white rounded">
                              <span className="text-sm text-gray-600">
                                User {bid.userId} {bid.userName && `(${bid.userName})`}
                              </span>
                              <span className="font-semibold text-green-600">${bid.amount}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Winner Announcement */}
                  {winner && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
                      <h3 className="font-semibold mb-1">🎉 Bidding Round Complete!</h3>
                      <p>Winner: User {winner.userId} with ${winner.amount}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 