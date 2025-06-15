// frontend/src/hooks/useBidding.ts
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Auction, Bid } from '@/types/bidding';
import { generateMockAuctions } from '@/lib/mockData';
import { toast } from 'sonner';

interface UseBiddingReturn {
  auctions: Auction[];
  userBids: Bid[];
  isLoading: boolean;
  error: string | null;
  placeBid: (auctionId: string, amount: number) => Promise<void>;
  refreshAuctions: () => Promise<void>;
}

export const useBidding = (): UseBiddingReturn => {
  const { userId, isSignedIn } = useAuth();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [userBids, setUserBids] = useState<Bid[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Simulate real-time updates
  const updateIntervalRef = useRef<NodeJS.Timeout>();

  const fetchAuctions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Use mock data for now
      const mockAuctions = generateMockAuctions();
      setAuctions(mockAuctions);
    } catch (err) {
      setError('Failed to fetch auctions');
      console.error('Error fetching auctions:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const placeBid = useCallback(async (auctionId: string, amount: number) => {
    if (!isSignedIn || !userId) {
      toast.error('Please sign in to place bids');
      throw new Error('Must be signed in to place bids');
    }

    try {
      setIsLoading(true);
      setError(null);

      // Find the auction
      const auction = auctions.find(a => a.id === auctionId);
      if (!auction) {
        throw new Error('Auction not found');
      }

      // Validate bid amount
      if (amount < auction.minimumBid) {
        throw new Error(`Minimum bid is $${auction.minimumBid}`);
      }

      if (auction.status !== 'live') {
        throw new Error('Auction is not live');
      }

      if (new Date() > auction.endTime) {
        throw new Error('Auction has ended');
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create new bid
      const newBid: Bid = {
        id: `bid-${Date.now()}`,
        auctionId,
        userId,
        amount,
        timestamp: new Date(),
        status: 'active',
        user: {
          firstName: 'You',
        }
      };

      // Update auction optimistically
      setAuctions(prev => prev.map(auction => 
        auction.id === auctionId 
          ? { 
              ...auction, 
              currentBid: amount,
              minimumBid: amount + auction.bidIncrement,
              bids: [newBid, ...auction.bids],
              totalBidders: Math.max(auction.totalBidders, auction.bids.length + 1)
            }
          : auction
      ));

      // Add to user bids
      setUserBids(prev => [newBid, ...prev]);

      toast.success('Bid placed successfully!', {
        description: `You bid $${amount} on ${auction.title}`,
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to place bid';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [auctions, isSignedIn, userId]);

  // Simulate real-time bid updates
  useEffect(() => {
    const simulateUpdates = () => {
      setAuctions(prev => prev.map(auction => {
        // Randomly update some auctions
        if (Math.random() < 0.3 && auction.status === 'live') {
          const increase = Math.floor(Math.random() * 15) + 5;
          return {
            ...auction,
            currentBid: auction.currentBid + increase,
            minimumBid: auction.currentBid + increase + auction.bidIncrement,
            totalBidders: auction.totalBidders + (Math.random() < 0.5 ? 1 : 0)
          };
        }
        return auction;
      }));
    };

    // Update every 10 seconds
    updateIntervalRef.current = setInterval(simulateUpdates, 10000);

    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, []);

  // Initialize
  useEffect(() => {
    fetchAuctions();
  }, [fetchAuctions]);

  return {
    auctions: auctions.filter(a => a.status === 'live'),
    userBids,
    isLoading,
    error,
    placeBid,
    refreshAuctions: fetchAuctions,
  };
};