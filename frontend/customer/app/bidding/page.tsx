"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import Link from "next/link";
import { useUser } from '@clerk/nextjs';
import { MapPinIcon, ClockIcon, UsersIcon, StarIcon, TruckIcon } from '@heroicons/react/24/outline';

interface Restaurant {
  id: number;
  name: string;
  rating: number;
  distance: string;
  cuisine: string;
  image: string;
  isOpen: boolean;
}

interface PartyTray {
  id: number;
  name: string;
  description: string;
  serves: number;
  originalPrice: number;
  currentBid: number;
  minBid: number;
  restaurantId: number;
  restaurantName: string;
  image: string;
  timeRemaining: number;
  biddersCount: number;
  tags: string[];
}

interface Bid {
  id: number;
  userId: number;
  userName: string;
  amount: number;
  timestamp: string;
  trayId: number;
}

const SOCKET_URL = "http://localhost:4000";

// Mock data for demonstration
const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Farm Fresh Kitchen",
    rating: 4.9,
    distance: "0.8 km",
    cuisine: "Organic & Healthy",
    image: "/api/placeholder/150/150",
    isOpen: true
  },
  {
    id: 2,
    name: "Green Garden Bistro",
    rating: 4.8,
    distance: "1.2 km",
    cuisine: "Farm-to-Table",
    image: "/api/placeholder/150/150",
    isOpen: true
  },
  {
    id: 3,
    name: "Tokyo Sushi",
    rating: 4.7,
    distance: "2.1 km",
    cuisine: "Japanese",
    image: "/api/placeholder/150/150",
    isOpen: true
  }
];

const mockPartyTrays: PartyTray[] = [
  {
    id: 1,
    name: "Organic Harvest Bowl",
    description: "Fresh organic vegetables, quinoa, and grilled chicken. Perfect for health-conscious gatherings.",
    serves: 15,
    originalPrice: 285,
    currentBid: 217,
    minBid: 220,
    restaurantId: 1,
    restaurantName: "Farm Fresh Kitchen",
    image: "/api/placeholder/200/150",
    timeRemaining: 156, // seconds
    biddersCount: 8,
    tags: ["Organic", "Gluten-Free", "Vegan Option"]
  },
  {
    id: 2,
    name: "Sustainable Feast Tray",
    description: "Locally sourced ingredients featuring seasonal vegetables and free-range chicken.",
    serves: 12,
    originalPrice: 220,
    currentBid: 185,
    minBid: 190,
    restaurantId: 2,
    restaurantName: "Green Garden Bistro",
    image: "/api/placeholder/200/150",
    timeRemaining: 89,
    biddersCount: 12,
    tags: ["Farm-to-Table", "Seasonal", "Local"]
  },
  {
    id: 3,
    name: "Party Sushi Platter",
    description: "Assorted sushi rolls, sashimi, and nigiri. Fresh fish delivered daily.",
    serves: 10,
    originalPrice: 195,
    currentBid: 165,
    minBid: 170,
    restaurantId: 3,
    restaurantName: "Tokyo Sushi",
    image: "/api/placeholder/200/150",
    timeRemaining: 234,
    biddersCount: 5,
    tags: ["Fresh Fish", "Premium", "Chef's Selection"]
  }
];

export default function BiddingPage() {
  const { isSignedIn, user } = useUser();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [selectedTray, setSelectedTray] = useState<PartyTray | null>(null);
  const [bidAmount, setBidAmount] = useState("");
  const [bids, setBids] = useState<Bid[]>([]);
  const [restaurants] = useState<Restaurant[]>(mockRestaurants);
  const [partyTrays, setPartyTrays] = useState<PartyTray[]>(mockPartyTrays);
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming'>('live');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/auth');
      return;
    }

    initializeSocket();
    startTimeUpdates();
  }, [isSignedIn, router]);

  const initializeSocket = () => {
    const s = io(SOCKET_URL);
    setSocket(s);

    s.on("connect", () => {
      console.log("Connected to bidding socket");
    });

    s.on("newBid", (bid: Bid) => {
      setBids(prev => [...prev, bid]);
      // Update the current bid for the tray
      if (selectedTray && bid.trayId === selectedTray.id) {
        setSelectedTray(prev => prev ? { ...prev, currentBid: bid.amount } : null);
      }
    });

    s.on("biddingRoundEnded", ({ winner, trayId }) => {
      setSuccess(`🎉 Bidding ended! Winner: ${winner.userName} with $${winner.amount}`);
      // Update the tray to show it's ended
      setPartyTrays(prev => prev.map(tray => 
        tray.id === trayId ? { ...tray, timeRemaining: 0 } : tray
      ));
    });

    return () => {
      s.disconnect();
    };
  };

  const startTimeUpdates = () => {
    const interval = setInterval(() => {
      setPartyTrays(prev => prev.map(tray => ({
        ...tray,
        timeRemaining: Math.max(0, tray.timeRemaining - 1)
      })));
    }, 1000);

    return () => clearInterval(interval);
  };

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socket || !selectedTray || !bidAmount) return;

    const amount = parseFloat(bidAmount);
    if (amount < selectedTray.minBid) {
      setError(`Minimum bid is $${selectedTray.minBid}`);
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate bid placement
    setTimeout(() => {
      const newBid: Bid = {
        id: Date.now(),
        userId: typeof user?.id === 'string' ? parseInt(user.id) : (user?.id || 1),
        userName: user?.firstName || 'Anonymous',
        amount: amount,
        timestamp: new Date().toISOString(),
        trayId: selectedTray.id
      };

      setBids(prev => [...prev, newBid]);
      setSelectedTray(prev => prev ? { ...prev, currentBid: amount, biddersCount: prev.biddersCount + 1 } : null);
      setBidAmount("");
      setSuccess("Bid placed successfully!");
      setIsLoading(false);

      // Emit to socket
      socket.emit("placeBid", {
        trayId: selectedTray.id,
        userId: typeof user?.id === 'string' ? parseInt(user.id) : (user?.id || 1),
        amount: amount
      });

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    }, 500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTraySelect = (tray: PartyTray) => {
    setSelectedTray(tray);
    setBids([]); // Clear previous bids
    setError("");
    setSuccess("");
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Live Party Tray Bidding</h1>
          <p className="text-xl text-gray-600">Bid on delicious party trays and save up to 30% off retail prices</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ClockIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Bids</p>
                <p className="text-2xl font-bold text-gray-900">{partyTrays.filter(t => t.timeRemaining > 0).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <UsersIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bidders</p>
                <p className="text-2xl font-bold text-gray-900">{partyTrays.reduce((sum, tray) => sum + tray.biddersCount, 0)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <StarIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Savings</p>
                <p className="text-2xl font-bold text-gray-900">18%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TruckIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Restaurants</p>
                <p className="text-2xl font-bold text-gray-900">{restaurants.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Available Trays */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('live')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'live'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Live Bidding ({partyTrays.filter(t => t.timeRemaining > 0).length})
                  </button>
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'upcoming'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Upcoming (0)
                  </button>
                </nav>
              </div>

              {/* Trays List */}
              <div className="p-6">
                {activeTab === 'live' && (
                  <div className="space-y-6">
                    {partyTrays.filter(tray => tray.timeRemaining > 0).map((tray) => (
                      <div
                        key={tray.id}
                        onClick={() => handleTraySelect(tray)}
                        className={`border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
                          selectedTray?.id === tray.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-bold text-gray-900">{tray.name}</h3>
                              <div className="flex items-center space-x-2">
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  {formatTime(tray.timeRemaining)}
                                </span>
                                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                                  {tray.biddersCount} bidders
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-3">{tray.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                              <span className="flex items-center">
                                <MapPinIcon className="w-4 h-4 mr-1" />
                                {tray.restaurantName}
                              </span>
                              <span>•</span>
                              <span>Serves {tray.serves} people</span>
                              <span>•</span>
                              <span className="flex items-center">
                                <StarIcon className="w-4 h-4 mr-1" />
                                4.8
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 mb-3">
                              {tray.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div>
                                  <p className="text-sm text-gray-500">Original Price</p>
                                  <p className="text-lg font-bold text-gray-400 line-through">${tray.originalPrice}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Current Bid</p>
                                  <p className="text-2xl font-bold text-blue-600">${tray.currentBid}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Min. Next Bid</p>
                                  <p className="text-lg font-bold text-green-600">${tray.minBid}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">You Save</p>
                                <p className="text-lg font-bold text-green-600">
                                  ${tray.originalPrice - tray.currentBid}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'upcoming' && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📅</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Bids</h3>
                    <p className="text-gray-600">Check back later for new party tray auctions</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Bidding Interface */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              {!selectedTray ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🎯</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Party Tray</h3>
                  <p className="text-gray-600">Choose a tray from the left to start bidding</p>
                </div>
              ) : (
                <>
                  {/* Selected Tray Info */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedTray.name}</h3>
                    <p className="text-gray-600 mb-4">{selectedTray.description}</p>
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Time Remaining</span>
                        <span className="text-lg font-bold text-red-600">{formatTime(selectedTray.timeRemaining)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                          style={{
                            width: `${Math.max(0, (selectedTray.timeRemaining / 300) * 100)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Current Bid</p>
                        <p className="text-2xl font-bold text-blue-600">${selectedTray.currentBid}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Min. Next Bid</p>
                        <p className="text-xl font-bold text-green-600">${selectedTray.minBid}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bid Form */}
                  <form onSubmit={handleBid} className="mb-6">
                    <div className="mb-4">
                      <label htmlFor="bid-amount" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Bid Amount ($)
                      </label>
                      <input
                        type="number"
                        id="bid-amount"
                        step="0.01"
                        min={selectedTray.minBid}
                        placeholder={`Min. $${selectedTray.minBid}`}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={selectedTray.timeRemaining === 0}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!bidAmount || parseFloat(bidAmount) < selectedTray.minBid || selectedTray.timeRemaining === 0 || isLoading}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? "Placing Bid..." : "Place Bid"}
                    </button>
                  </form>

                  {/* Messages */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4">
                      {success}
                    </div>
                  )}

                  {/* Live Bids */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Recent Bids</h4>
                    <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                      {bids.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No bids yet. Be the first to bid!</p>
                      ) : (
                        <div className="space-y-2">
                          {bids.slice(-5).reverse().map((bid, index) => (
                            <div key={bid.id} className="flex justify-between items-center p-2 bg-white rounded">
                              <span className="text-sm text-gray-600">
                                {bid.userName}
                              </span>
                              <span className="font-semibold text-green-600">${bid.amount}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 