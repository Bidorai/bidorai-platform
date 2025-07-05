'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { biddingService, formatTimeRemaining } from '@/services/biddingService';

interface BiddingModalProps {
  isOpen: boolean;
  onClose: () => void;
  menu: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    currentBid: number | null;
    bidEndTime: string | null;
  };
  restaurantName: string;
}

export function BiddingModal({ isOpen, onClose, menu, restaurantName }: BiddingModalProps) {
  const [bidAmount, setBidAmount] = useState(menu.currentBid ? menu.currentBid + 1 : menu.price * 0.9);
  const [isPlacingBid, setIsPlacingBid] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen || !menu.bidEndTime) return;

    const updateTimeRemaining = () => {
      setTimeRemaining(formatTimeRemaining(menu.bidEndTime!));
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [isOpen, menu.bidEndTime]);

  const handlePlaceBid = async () => {
    if (bidAmount <= (menu.currentBid || menu.price * 0.9)) {
      setError('Bid must be higher than current bid');
      return;
    }

    setIsPlacingBid(true);
    setError('');

    try {
      const userId = 'user-123'; // Replace with actual user ID
      
      await biddingService.placeBid({
        menuId: menu.id,
        amount: bidAmount,
        userId
      });

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place bid');
    } finally {
      setIsPlacingBid(false);
    }
  };

  const getMinBid = () => {
    return menu.currentBid ? menu.currentBid + 1 : Math.ceil(menu.price * 0.9);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <CurrencyDollarIcon className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-semibold">Place Your Bid</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start space-x-4 mb-6">
            <img
              src={menu.image}
              alt={menu.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{menu.name}</h3>
              <p className="text-sm text-gray-600">{restaurantName}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Current Bid:</span>
              <span className="text-lg font-semibold text-gray-900">
                ${menu.currentBid || 'No bids yet'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Original Price:</span>
              <span className="text-sm text-gray-500 line-through">${menu.price}</span>
            </div>
            {menu.bidEndTime && (
              <div className="flex items-center space-x-2 mt-2 text-sm text-orange-600">
                <ClockIcon className="w-4 h-4" />
                <span>{timeRemaining}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Bid Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                min={getMinBid()}
                step="0.01"
                value={bidAmount}
                onChange={(e) => setBidAmount(parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Minimum: $${getMinBid()}`}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Minimum bid: ${getMinBid()}
            </p>
            {error && (
              <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handlePlaceBid}
              disabled={isPlacingBid || bidAmount < getMinBid()}
              className="flex-1 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPlacingBid ? 'Placing Bid...' : 'Place Bid'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 