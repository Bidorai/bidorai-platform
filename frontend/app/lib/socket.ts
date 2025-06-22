import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

class SocketClient {
  private socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket'],
      });

      this.socket.on('connect', () => {
        console.log('Connected to server');
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinAuction(auctionId: string) {
    if (this.socket) {
      this.socket.emit('join_auction', { auctionId });
    }
  }

  leaveAuction(auctionId: string) {
    if (this.socket) {
      this.socket.emit('leave_auction', { auctionId });
    }
  }

  placeBid(auctionId: string, amount: number) {
    if (this.socket) {
      this.socket.emit('place_bid', { auctionId, amount });
    }
  }

  onBidUpdate(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('bid_update', callback);
    }
  }

  onAuctionUpdate(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('auction_update', callback);
    }
  }
}

export default new SocketClient();