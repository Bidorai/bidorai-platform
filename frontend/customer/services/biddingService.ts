import { io, Socket } from 'socket.io-client';
import { useState, useEffect } from 'react';

export interface BidUpdate {
  menuId: string;
  currentBid: number;
  bidEndTime: string;
  bidCount: number;
}

export interface BidPlacement {
  menuId: string;
  amount: number;
  userId: string;
}

class BiddingService {
  private socket: Socket | null = null;
  private listeners: Map<string, (update: BidUpdate) => void> = new Map();

  connect(userId?: string) {
    if (this.socket) return;

    this.socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001', {
      auth: {
        userId: userId
      }
    });

    this.socket.on('connect', () => {
      console.log('Connected to bidding service');
    });

    this.socket.on('bidUpdate', (update: BidUpdate) => {
      const listener = this.listeners.get(update.menuId);
      if (listener) {
        listener(update);
      }
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from bidding service');
    });

    this.socket.on('error', (error) => {
      console.error('Bidding service error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.listeners.clear();
  }

  subscribeToBid(menuId: string, callback: (update: BidUpdate) => void) {
    this.listeners.set(menuId, callback);
    
    if (this.socket) {
      this.socket.emit('subscribeToBid', { menuId });
    }
  }

  unsubscribeFromBid(menuId: string) {
    this.listeners.delete(menuId);
    
    if (this.socket) {
      this.socket.emit('unsubscribeFromBid', { menuId });
    }
  }

  placeBid(bidData: BidPlacement): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('Not connected to bidding service'));
        return;
      }

      this.socket.emit('placeBid', bidData, (response: { success: boolean; message: string }) => {
        if (response.success) {
          resolve(response);
        } else {
          reject(new Error(response.message));
        }
      });
    });
  }

  getBidHistory(menuId: string): Promise<Array<{ userId: string; amount: number; timestamp: string }>> {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('Not connected to bidding service'));
        return;
      }

      this.socket.emit('getBidHistory', { menuId }, (response: { success: boolean; data?: any; message?: string }) => {
        if (response.success && response.data) {
          resolve(response.data);
        } else {
          reject(new Error(response.message || 'Failed to get bid history'));
        }
      });
    });
  }
}

export const biddingService = new BiddingService();

// Utility function to format time remaining
export const formatTimeRemaining = (endTime: string): string => {
  const now = new Date().getTime();
  const end = new Date(endTime).getTime();
  const diff = end - now;

  if (diff <= 0) return 'Ended';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days > 0) {
    return `${days}d ${hours}h left`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m left`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s left`;
  } else {
    return `${seconds}s left`;
  }
};

// Hook for real-time bid updates
export const useBidUpdates = (menuId: string) => {
  const [bidData, setBidData] = useState<BidUpdate | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    if (!menuId) return;

    const handleBidUpdate = (update: BidUpdate) => {
      setBidData(update);
    };

    biddingService.subscribeToBid(menuId, handleBidUpdate);

    // Update time remaining every second
    const interval = setInterval(() => {
      if (bidData?.bidEndTime) {
        setTimeRemaining(formatTimeRemaining(bidData.bidEndTime));
      }
    }, 1000);

    return () => {
      biddingService.unsubscribeFromBid(menuId);
      clearInterval(interval);
    };
  }, [menuId]);

  return { bidData, timeRemaining };
}; 