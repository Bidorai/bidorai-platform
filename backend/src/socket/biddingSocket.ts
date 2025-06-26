import { Server, Socket } from 'socket.io';
import { startBiddingRound, placeBid, getWinningBid, getBiddingRound } from '../services/biddingService';

export function registerBiddingSocket(io: Server) {
  io.on('connection', (socket: Socket) => {
    socket.on('joinBiddingRound', ({ roundId }) => {
      socket.join(roundId);
      const round = getBiddingRound(roundId);
      if (round) {
        socket.emit('biddingRoundState', round);
      }
    });

    socket.on('placeBid', ({ roundId, userId, amount }) => {
      const success = placeBid(roundId, userId, amount);
      if (success) {
        const round = getBiddingRound(roundId);
        io.to(roundId).emit('biddingRoundState', round);
      } else {
        socket.emit('bidRejected', { reason: 'Bidding round not active or invalid.' });
      }
    });

    socket.on('startBiddingRound', ({ roundId, menuId, restaurantId }) => {
      const round = startBiddingRound(roundId, menuId, restaurantId);
      io.to(roundId).emit('biddingRoundState', round);
      setTimeout(() => {
        const winner = getWinningBid(roundId);
        io.to(roundId).emit('biddingRoundEnded', { winner });
      }, round.endTime - Date.now());
    });
  });
} 