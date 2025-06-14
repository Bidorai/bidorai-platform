'use client';

import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import Button from './Button';

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  distance: number;
  cuisine: string;
  dish: string;
  serves: number;
  bidders: number;
  price: number;
  progress: number;
  tag: string;
  bgColor: string;
  iconBg: string;
}

const BiddingPanel: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState('2:45');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: 'farm-fresh',
      name: 'Farm Fresh Kitchen',
      rating: 4.9,
      distance: 0.8,
      cuisine: 'Organic Certified',
      dish: '🥗 Organic Harvest Bowl',
      serves: 15,
      bidders: 8,
      price: 217,
      progress: 75,
      tag: '🌱 Fresh picked today!',
      bgColor: 'bg-blue-50 border-blue-200',
      iconBg: 'bg-gradient-to-r from-blue-600 to-blue-700'
    },
    {
      id: 'green-garden',
      name: 'Green Garden Bistro',
      rating: 4.8,
      distance: 1.2,
      cuisine: 'Farm-to-Table',
      dish: '🥘 Sustainable Feast Tray',
      serves: 12,
      bidders: 12,
      price: 185,
      progress: 0,
      tag: '',
      bgColor: 'bg-gray-50 border-gray-200',
      iconBg: 'bg-gradient-to-r from-gray-800 to-gray-900'
    },
    {
      id: 'tokyo-sushi',
      name: 'Tokyo Sushi',
      rating: 4.7,
      distance: 2.1,
      cuisine: 'Japanese Fresh',
      dish: '🍣 Sushi Platter',
      serves: 8,
      bidders: 6,
      price: 165,
      progress: 45,
      tag: '🆕 New entry!',
      bgColor: 'bg-blue-50 border-blue-200',
      iconBg: 'bg-gradient-to-r from-blue-600 to-blue-700'
    },
    {
      id: 'el-mariachi',
      name: 'El Mariachi',
      rating: 4.6,
      distance: 1.8,
      cuisine: 'Mexican Authentic',
      dish: '🌮 Taco Bar Setup',
      serves: 20,
      bidders: 15,
      price: 245,
      progress: 92,
      tag: '🚀 Bidding war!',
      bgColor: 'bg-gray-50 border-gray-200',
      iconBg: 'bg-gradient-to-r from-gray-800 to-gray-900'
    },
    {
      id: 'pasta-palace',
      name: 'Pasta Palace',
      rating: 4.5,
      distance: 3.4,
      cuisine: 'Italian Classic',
      dish: '🍝 Pasta Buffet Tray',
      serves: 18,
      bidders: 4,
      price: 195,
      progress: 30,
      tag: '⏰ Ending soon!',
      bgColor: 'bg-blue-50 border-blue-200',
      iconBg: 'bg-gradient-to-r from-blue-600 to-blue-700'
    }
  ]);

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        const [minutes, seconds] = prev.split(':').map(Number);
        let totalSeconds = minutes * 60 + seconds - 1;
        
        if (totalSeconds <= 0) {
          totalSeconds = 180; // Reset to 3 minutes
        }
        
        const newMinutes = Math.floor(totalSeconds / 60);
        const newSeconds = totalSeconds % 60;
        
        return `${newMinutes}:${newSeconds.toString().padStart(2, '0')}`;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update bid prices periodically
  useEffect(() => {
    const bidTimer = setInterval(() => {
      setRestaurants(prev => prev.map(restaurant => ({
        ...restaurant,
        price: restaurant.price + Math.floor(Math.random() * 15) + 1
      })));
    }, 5000);

    return () => clearInterval(bidTimer);
  }, []);

  const handlePlaceBid = () => {
    alert('Bid placement functionality would go here!');
  };

  const RestaurantCard: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => (
    <div className={`${restaurant.bgColor} border rounded-lg p-3 mb-3`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-3 flex-1">
          <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-white font-extrabold text-lg shadow-lg ${restaurant.iconBg}`}>
            {restaurant.name[0]}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 mb-1">{restaurant.name}</h3>
            <div className="text-sm text-gray-600 mb-1">
              <span className="text-blue-600 font-semibold">⭐ {restaurant.rating}</span>
              <span> • </span>
              <span>{restaurant.distance} km</span>
              <span> • </span>
              <span className="font-semibold">{restaurant.cuisine}</span>
            </div>
            <div className="text-sm text-gray-600">{restaurant.dish} • Serves {restaurant.serves}</div>
            <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-1">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
              <span>👥 {restaurant.bidders} people bidding</span>
            </div>
          </div>
        </div>
        <div className="text-2xl font-bold text-blue-600">${restaurant.price}</div>
      </div>
      
      {restaurant.progress > 0 && (
        <div className="w-full h-1 bg-gray-200 rounded-full my-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-full transition-all duration-500"
            style={{ width: `${restaurant.progress}%` }}
          ></div>
        </div>
      )}
      
      {restaurant.tag && (
        <div className="flex justify-center">
          <div className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1">
            <span>{restaurant.tag}</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 min-h-[550px] flex flex-col">
      {/* Header */}
      <div className="flex justify-center items-center mb-4 relative">
        <div className="flex items-center gap-1">
          <span className="text-xl font-extrabold text-gray-800">Party Menu Bidding</span>
          <Info className="w-5 h-5 text-gray-400" />
        </div>
        <span className="absolute right-0 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          LIVE
        </span>
      </div>

      {/* Countdown Timer */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg text-center font-bold mb-4 text-sm shadow-lg shadow-blue-600/30">
        ⏰ <span>{timeRemaining}</span> remaining
      </div>

      {/* Savings Display */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-4 rounded-xl text-center mb-5 shadow-lg shadow-gray-800/30">
        <div className="text-2xl font-extrabold mb-1">Save $284</div>
        <div className="text-sm opacity-90">🎯 Average 18% below market price</div>
      </div>

      {/* Restaurant List */}
      <div className="flex-1 max-h-96 overflow-y-auto mb-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-100">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Button variant="cta" size="md" onClick={handlePlaceBid} className="w-full">
          🎯 Place Your Bid Now
        </Button>
        <Button variant="navy-outline" size="md" className="w-full">
          ▶️ Watch Demo
        </Button>
      </div>
    </div>
  );
};

export default BiddingPanel;