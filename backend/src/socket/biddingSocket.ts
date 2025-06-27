import { Server, Socket } from 'socket.io';
import { BiddingService } from '../services/biddingService';
import { Pool } from 'pg';

const pool = new Pool();
const biddingService = new BiddingService(pool);

export function registerBiddingSocket(io: Server) {
  const biddingNamespace = io.of('/bidding');
  
  biddingNamespace.on('connection', (socket: Socket) => {
    console.log('User connected to bidding:', socket.id);
    
    socket.on('join-session', async (sessionId: number) => {
      socket.join(`session-${sessionId}`);
      
      // Send current session state
      const session = await biddingService.getActiveSession(sessionId);
      if (session) {
        socket.emit('session-update', session);
      }
    });
    
    socket.on('place-bid', async (data: { sessionId: number, userId: number, amount: number }) => {
      try {
        const bid = await biddingService.placeBid(data.sessionId, data.userId, data.amount);
        
        // Notify all users in the session
        biddingNamespace.to(`session-${data.sessionId}`).emit('new-bid', {
          bidId: bid.id,
          userId: data.userId,
          amount: data.amount,
          timestamp: new Date()
        });
      } catch (error: any) {
        socket.emit('bid-error', { message: error.message });
      }
    });
    
    socket.on('leave-session', (sessionId: number) => {
      socket.leave(`session-${sessionId}`);
    });
  });
  
  // Schedule hourly bidding sessions
  setInterval(async () => {
    const currentMinute = new Date().getMinutes();
    if (currentMinute === 0) { // Start of each hour
      // Get featured menus for bidding
      const result = await pool.query(
        `SELECT id FROM menus WHERE bidding_enabled = true AND featured = true`
      );
      
      for (const menu of result.rows) {
        const session = await biddingService.createBiddingSession(menu.id);
        biddingNamespace.emit('new-session', session);
        
        // Schedule session end
        setTimeout(async () => {
          await biddingService.endSession(session.id);
          biddingNamespace.to(`session-${session.id}`).emit('session-ended', session.id);
        }, 3 * 60 * 1000); // 3 minutes
      }
    }
  }, 60 * 1000); // Check every minute
} 