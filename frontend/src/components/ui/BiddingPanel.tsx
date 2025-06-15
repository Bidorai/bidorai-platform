// frontend/src/components/ui/BiddingPanel.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Info, Clock, Users, DollarSign, Zap, AlertTriangle } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { Auction } from '@/types/bidding';
import { useBidding } from '@/hooks/useBidding';
import { formatTimeRemaining, formatCurrency, calculateSavings } from '@/lib/utils';
import Button from './Button';
import { toast } from 'sonner';
import Link from 'next/link';

interface BiddingPanelProps {
  variant?: 'full' | 'compact';
}

const BiddingPanel: React.FC<BiddingPanelProps> = ({ variant = 'compact' }) => {
  const { isSignedIn } = useAuth();
  const { auctions, isLoading, error, placeBid } = useBidding();
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [bidAmount, setBidAmount] = useState<string>('');
  const [showBidForm, setShowBidForm] = useState(false);

  // Calculate total potential savings
  const totalSavings = auctions.reduce((total, auction) => {
    const savings = calculateSavings(auction.startPrice, auction.currentBid);
    return total + savings.amount;
  }, 0);

  const handlePlaceBid = async () => {
    if (!selectedAuction || !bidAmount) return;

    const amount = parseInt(bidAmount);
    if (isNaN(amount) || amount < selectedAuction.minimumBid) {
      toast.error(`Minimum bid is ${formatCurrency(selectedAuction.minimumBid)}`);
      return;
    }

    try {
      await placeBid(selectedAuction.id, amount);
      setShowBidForm(false);
      setBidAmount('');
      setSelectedAuction(null);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const openBidForm = (auction: Auction) => {
    if (!isSignedIn) {
      toast.error('Please sign in to place bids');
      return;
    }
    setSelectedAuction(auction);
    setBidAmount(auction.minimumBid.toString());
    setShowBidForm(true);
  };

  const RestaurantCard: React.FC<{ auction: Auction }> = ({ auction }) => {
    const timeRemaining = formatTimeRemaining(auction.endTime);
    const isEndingSoon = new Date(auction.endTime).getTime() - Date.now() < 30 * 60 * 1000; // 30 minutes
    
    return (
      <div className={`${auction.id.includes('farm') ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'} border rounded-lg p-3 mb-3 hover:shadow-md transition-shadow`}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-3 flex-1">
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-white font-extrabold text-lg shadow-lg ${
              auction.id.includes('farm') ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-gray-700 to-gray-800'
            }`}>
              {auction.restaurant?.name[0] || auction.title[0]}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-1">{auction.restaurant?.name || auction.title}</h3>
              <div className="text-sm text-gray-600 mb-1">
                <span className="text-blue-600 font-semibold">⭐ {auction.restaurant?.rating || 4.8}</span>
                <span> • </span>
                <span>{auction.restaurant?.location?.city || 'Dallas'}</span>
                <span> • </span>
                <span className="font-semibold">{auction.cuisine}</span>
              </div>
              <div className="text-sm text-gray-600">{auction.dish} • Serves {auction.serves}</div>
              <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-1">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                <span>👥 {auction.totalBidders} people bidding</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(auction.currentBid)}</div>
            <div className="text-xs text-gray-500">Min: {formatCurrency(auction.minimumBid)}</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-200 rounded-full my-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((auction.currentBid / auction.startPrice) * 100, 100)}%` }}
          ></div>
        </div>
        
        {/* Time and Status */}
        <div className="flex items-center justify-between text-sm mb-2">
          <div className={`flex items-center gap-1 ${isEndingSoon ? 'text-red-600' : 'text-gray-600'}`}>
            <Clock className="w-4 h-4" />
            <span>{timeRemaining}</span>
            {isEndingSoon && <AlertTriangle className="w-4 h-4" />}
          </div>
          <div className="text-green-600 font-medium">
            Save {formatCurrency(auction.startPrice - auction.currentBid)}
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={() => openBidForm(auction)}
        >
          <Zap className="w-4 h-4 mr-1" />
          Bid {formatCurrency(auction.minimumBid)}
        </Button>
      </div>
    );
  };

  const BidForm = () => {
    if (!selectedAuction) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full">
          <h3 className="text-xl font-bold mb-4">Place Your Bid</h3>
          <div className="mb-4">
            <h4 className="font-semibold">{selectedAuction.title}</h4>
            <p className="text-gray-600 text-sm">{selectedAuction.restaurant?.name}</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Bid Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                min={selectedAuction.minimumBid}
                step={selectedAuction.bidIncrement}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                placeholder={selectedAuction.minimumBid.toString()}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Minimum bid: {formatCurrency(selectedAuction.minimumBid)}
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => {
                setShowBidForm(false);
                setSelectedAuction(null);
                setBidAmount('');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handlePlaceBid}
              isLoading={isLoading}
            >
              Place Bid
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 min-h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900">Live Bidding</h2>
          <Info className="w-5 h-5 text-gray-400 cursor-help" title="Real-time food auctions" />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-600">LIVE</span>
        </div>
      </div>

      {/* Stats Bar */}
      {auctions.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 mb-6 border border-blue-100">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-blue-600">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{auctions.length} Live</span>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <DollarSign className="w-4 h-4" />
                <span className="font-medium">Save {formatCurrency(totalSavings)}</span>
              </div>
            </div>
            
            <div className="text-gray-600 font-medium">
              🎯 Avg 18% savings
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Auctions List */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : auctions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Live Auctions</h3>
            <p className="text-gray-600 mb-4">Check back soon for delicious deals!</p>
            <Link href="/browse">
              <Button variant="primary" size="sm">
                Browse Restaurants
              </Button>
            </Link>
          </div>
        ) : (
          auctions.map(auction => (
            <RestaurantCard key={auction.id} auction={auction} />
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => auctions.length > 0 && openBidForm(auctions[0])}
          disabled={auctions.length === 0}
        >
          <Zap className="w-5 h-5 mr-2" />
          Quick Bid on Best Deal
        </Button>
        
        <Link href="/browse">
          <Button variant="ghost" size="md" className="w-full">
            🔍 Browse All Restaurants
          </Button>
        </Link>
      </div>

      {/* Bid Form Modal */}
      {showBidForm && <BidForm />}
    </div>
  );
};

export default BiddingPanel;