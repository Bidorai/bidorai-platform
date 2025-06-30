"use client";
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

interface Bid {
  id: number;
  menu_name: string;
  restaurant: string;
  original_price: number;
  current_bid: number;
  my_bid: number;
  status: 'active' | 'won' | 'lost' | 'expired';
  time_remaining: number;
  total_bidders: number;
  image_url: string;
  created_at: string;
  ends_at: string;
}

export default function BidsPage() {
  const { user, isSignedIn } = useUser();
  const [bids, setBids] = useState<Bid[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn) {
      // Simulate loading bid data
      setTimeout(() => {
        setBids([
          {
            id: 1,
            menu_name: "Sushi Party Platter",
            restaurant: "Tokyo Sushi",
            original_price: 120,
            current_bid: 95,
            my_bid: 95,
            status: 'active',
            time_remaining: 1800, // 30 minutes
            total_bidders: 8,
            image_url: "/restaurants/tokyo-sushi.jpg",
            created_at: "2024-01-15T10:00:00Z",
            ends_at: "2024-01-15T11:30:00Z"
          },
          {
            id: 2,
            menu_name: "BBQ Ribs & Sides",
            restaurant: "Smokehouse BBQ",
            original_price: 150,
            current_bid: 110,
            my_bid: 105,
            status: 'active',
            time_remaining: 3600, // 1 hour
            total_bidders: 12,
            image_url: "/restaurants/smokehouse-bbq.jpg",
            created_at: "2024-01-15T09:00:00Z",
            ends_at: "2024-01-15T12:00:00Z"
          },
          {
            id: 3,
            menu_name: "Organic Garden Salad Tray",
            restaurant: "Farm Fresh Kitchen",
            original_price: 85,
            current_bid: 75,
            my_bid: 75,
            status: 'won',
            time_remaining: 0,
            total_bidders: 5,
            image_url: "/restaurants/farm-fresh.jpg",
            created_at: "2024-01-14T14:00:00Z",
            ends_at: "2024-01-14T16:00:00Z"
          },
          {
            id: 4,
            menu_name: "Italian Pasta Platter",
            restaurant: "Bella Italia",
            original_price: 130,
            current_bid: 125,
            my_bid: 120,
            status: 'lost',
            time_remaining: 0,
            total_bidders: 15,
            image_url: "/restaurants/bella-italia.jpg",
            created_at: "2024-01-13T18:00:00Z",
            ends_at: "2024-01-13T20:00:00Z"
          }
        ]);
        setIsLoading(false);
      }, 1000);
    }
  }, [isSignedIn]);

  // Update countdown timers
  useEffect(() => {
    const interval = setInterval(() => {
      setBids(prevBids => 
        prevBids.map(bid => ({
          ...bid,
          time_remaining: bid.status === 'active' ? Math.max(0, bid.time_remaining - 1) : 0
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your bids</h2>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your bids...</p>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'won': return 'bg-blue-100 text-blue-800';
      case 'lost': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const activeBids = bids.filter(bid => bid.status === 'active');
  const historyBids = bids.filter(bid => bid.status !== 'active');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Bids</h1>
              <p className="text-gray-600 mt-1">Track your active bids and bidding history</p>
            </div>
            <Link
              href="/bidding"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Place New Bid
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Bids</p>
                <p className="text-2xl font-bold text-gray-900">{activeBids.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Won Bids</p>
                <p className="text-2xl font-bold text-gray-900">{bids.filter(b => b.status === 'won').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-red-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Lost Bids</p>
                <p className="text-2xl font-bold text-gray-900">{bids.filter(b => b.status === 'lost').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Saved</p>
                <p className="text-2xl font-bold text-gray-900">$180</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('active')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'active'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Active Bids ({activeBids.length})
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Bid History ({historyBids.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'active' ? (
              <div className="space-y-6">
                {activeBids.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No active bids</h3>
                    <p className="text-gray-600 mb-4">Start bidding on menus to get the best deals!</p>
                    <Link
                      href="/bidding"
                      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                    >
                      Start Bidding
                    </Link>
                  </div>
                ) : (
                  activeBids.map((bid) => (
                    <div key={bid.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-500 text-sm">Image</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{bid.menu_name}</h3>
                              <p className="text-gray-600">{bid.restaurant}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-sm text-gray-500">
                                  {bid.total_bidders} bidders
                                </span>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(bid.status)}`}>
                                  {bid.status}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-red-600">
                                {formatTime(bid.time_remaining)}
                              </div>
                              <p className="text-sm text-gray-500">Time remaining</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Original Price</p>
                              <p className="text-lg font-semibold text-gray-900">${bid.original_price}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Current Bid</p>
                              <p className="text-lg font-semibold text-green-600">${bid.current_bid}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">My Bid</p>
                              <p className="text-lg font-semibold text-blue-600">${bid.my_bid}</p>
                            </div>
                          </div>

                          <div className="mt-4 flex space-x-3">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                              Increase Bid
                            </button>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {historyBids.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bid history</h3>
                    <p className="text-gray-600">Your completed bids will appear here.</p>
                  </div>
                ) : (
                  historyBids.map((bid) => (
                    <div key={bid.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-500 text-sm">Image</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{bid.menu_name}</h3>
                              <p className="text-gray-600">{bid.restaurant}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-sm text-gray-500">
                                  {bid.total_bidders} bidders
                                </span>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(bid.status)}`}>
                                  {bid.status === 'won' ? 'Won' : bid.status === 'lost' ? 'Lost' : 'Expired'}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">
                                {new Date(bid.ends_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Original Price</p>
                              <p className="text-lg font-semibold text-gray-900">${bid.original_price}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Final Price</p>
                              <p className="text-lg font-semibold text-green-600">${bid.current_bid}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">My Bid</p>
                              <p className="text-lg font-semibold text-blue-600">${bid.my_bid}</p>
                            </div>
                          </div>

                          {bid.status === 'won' && (
                            <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-3">
                              <p className="text-green-800 text-sm">
                                🎉 Congratulations! You won this bid. Your order has been placed.
                              </p>
                            </div>
                          )}

                          <div className="mt-4 flex space-x-3">
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                              View Details
                            </button>
                            {bid.status === 'won' && (
                              <Link
                                href={`/orders/${bid.id}`}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                              >
                                View Order
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 