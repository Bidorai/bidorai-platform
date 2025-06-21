import { Server } from 'socket.io';
import { pool } from '../config/database';

export const setupPresenceSocket = (io: Server) => {
  const presenceNamespace = io.of('/presence');

  presenceNamespace.on('connection', async (socket) => {
    console.log('User connected to presence:', socket.id);

    // Track user presence
    socket.on('trackPresence', async (userId: string) => {
      try {
        // Update user status in database
        await pool.query(
          'UPDATE users SET last_seen = CURRENT_TIMESTAMP WHERE id = $1',
          [userId]
        );

        // Broadcast user status update
        presenceNamespace.emit('userStatus', {
          userId,
          status: 'online',
          timestamp: new Date()
        });
      } catch (error) {
        socket.emit('error', 'Failed to track presence');
      }
    });

    // Handle disconnection
    socket.on('disconnect', async () => {
      try {
        // Update user status in database
        await pool.query(
          'UPDATE users SET last_seen = CURRENT_TIMESTAMP WHERE id = $1',
          [socket.handshake.auth.userId]
        );

        // Broadcast user status update
        presenceNamespace.emit('userStatus', {
          userId: socket.handshake.auth.userId,
          status: 'offline',
          timestamp: new Date()
        });
      } catch (error) {
        console.error('Error updating presence:', error);
      }
    });
  });
};
