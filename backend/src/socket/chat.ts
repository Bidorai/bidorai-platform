import { Server } from 'socket.io';
import { pool } from '../config/database';
import CacheManager from '../utils/cache';

const cache = CacheManager.getInstance();

export const setupChatSocket = (io: Server) => {
  const chatNamespace = io.of('/chat');

  chatNamespace.on('connection', async (socket) => {
    console.log('User connected to chat:', socket.id);

    // Join room
    socket.on('joinRoom', async (roomId: string) => {
      try {
        const exists = await cache.exists(`room:${roomId}`);
        if (!exists) {
          await pool.query('INSERT INTO chat_rooms (name) VALUES ($1)', [roomId]);
          await cache.set(`room:${roomId}`, roomId);
        }
        socket.join(roomId);
      } catch (error) {
        socket.emit('error', 'Failed to join room');
      }
    });

    // Send message
    socket.on('sendMessage', async (data: { roomId: string; content: string }) => {
      try {
        const { roomId, content } = data;
        
        // Save message to database
        await pool.query(
          'INSERT INTO messages (sender_id, content) VALUES ($1, $2)',
          [socket.handshake.auth.userId, content]
        );

        // Broadcast to room
        chatNamespace.to(roomId).emit('message', {
          content,
          senderId: socket.handshake.auth.userId,
          timestamp: new Date()
        });
      } catch (error) {
        socket.emit('error', 'Failed to send message');
      }
    });

    // Leave room
    socket.on('leaveRoom', async (roomId: string) => {
      socket.leave(roomId);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected from chat:', socket.id);
    });
  });
};
