'use client';

import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  distance: number;
  cuisine: string;
  dish: string;
  serves: number;
  bidders: number;
  currentBid: number;
  progress: number;
  tag: string;
}

interface BiddingPanelProps {
  restaurants: Restaurant[];
}

export default function BiddingPanel({ restaurants }: BiddingPanelProps) {
  const [timeRemaining, setTimeRemaining] = useState(165); // 2:45
  const [socket, setSocket] = useState<Socket | null>(null);
  const [liveRestaurants, setLiveRestaurants] = useState<Restaurant[]>(restaurants);

  useEffect(() => {
    // Initialize Socket.IO connection
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to bidding server');
      newSocket.emit('join-bidding', {});
    });

    newSocket.on('bid-update', (data) => {
      setLiveRestaurants(prev => 
        prev.map(r => 
          r.id === data.restaurantId 
            ? { ...r, currentBid: data.newPrice, bidders: data.bidderCount }
            : r
        )
      );
    });

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    setLiveRestaurants(restaurants);
  }, [restaurants]);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) return 180; // Reset to 3:00
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const placeBid = () => {
    alert('Bid placement functionality coming soon!');
  };

  const getBackgroundStyle = (index: number) => {
    return index % 2 === 0 
      ? 'bg-blue-50 border-blue-200' 
      : 'bg-gray-50 border-gray-200';
  };

  const getLogoGradient = (index: number) => {
    return index % 2 === 0
      ? 'from-[#1877F2] to-[#1565C0]'
      : 'from-gray-900 to-gray-700';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 min-h-[550px] flex flex-col">
      {/* Header */}
      <div className="flex justify-center items-center mb-4 relative">
        <div className="text-center">
          <span className="text-xl font-extrabold text-gray-900">Party Menu Bidding</span>
          <span className="ml-2">ℹ️</span>
        </div>
        <span className="absolute right-0 bg-[#1877F2] text-white px-3 py-1 rounded-full text-xs font-medium">
          LIVE
        </span>
      </div>

      {/* Countdown Timer */}
      <div className="bg-gradient-to-r from-[#1877F2] to-[#1565C0] text-white px-4 py-3 rounded-lg text-center font-bold mb-4 shadow-lg">
        ⏰ {formatTime(timeRemaining)} remaining
      </div>

      {/* Savings Display */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 rounded-xl text-center mb-5 shadow-lg">
        <div className="text-2xl font-extrabold mb-1">Save $284</div>
        <div className="text-sm opacity-90">🎯 Average 18% below market price</div>
      </div>

      {/* Restaurant List */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 max-h-96 pr-2">
        {liveRestaurants.map((restaurant, index) => (
          <div
            key={restaurant.id}
            className={`rounded-lg p-3 border transition-all hover:shadow-md ${getBackgroundStyle(index)}`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-3 flex-1">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${getLogoGradient(index)} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                  {restaurant.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{restaurant.name}</h3>
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="text-[#1877F2] font-semibold">⭐ {restaurant.rating}</span>
                    <span className="mx-1">•</span>
                    <span>{restaurant.distance} km</span>
                    <span className="mx-1">•</span>
                    <span className="font-semibold">{restaurant.cuisine}</span>
                  </div>
                  <div className="text-sm text-gray-600">{restaurant.dish} • Serves {restaurant.serves}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#1877F2] animate-pulse"></div>
                    <span>👥 {restaurant.bidders} people bidding</span>
                  </div>
                </div>
              </div>
              <div className={`text-2xl font-bold ${index % 2 === 0 ? 'text-[#1877F2]' : 'text-gray-900'}`}>
                ${restaurant.currentBid}
              </div>
            </div>
            
            {restaurant.progress > 0 && (
              <>
                <div className="w-full h-1 bg-gray-200 rounded-full mb-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#1877F2] to-[#1565C0] rounded-full transition-all duration-500"
                    style={{ width: `${restaurant.progress}%` }}
                  />
                </div>
                {restaurant.tag && (
                  <div className="flex justify-center">
                    <div className="bg-[#1877F2] text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      {restaurant.tag}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={placeBid}
          className="w-full bg-[#1877F2] text-white font-semibold py-3 rounded-lg hover:bg-[#1565C0] transition-colors shadow-lg hover:shadow-xl"
        >
          🎯 Place Your Bid Now
        </button>
        <button className="w-full bg-transparent text-gray-900 border-2 border-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-900 hover:text-white transition-all">
          ▶️ Watch Demo
        </button>
      </div>
    </div>
  );
}