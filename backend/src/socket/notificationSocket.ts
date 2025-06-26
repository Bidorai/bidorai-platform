import { Server, Socket } from 'socket.io';

let ioInstance: Server | null = null;

export function registerNotificationSocket(io: Server) {
  ioInstance = io;
  io.on('connection', (socket: Socket) => {
    socket.on('joinNotifications', ({ userId }) => {
      socket.join(`user_${userId}`);
    });
  });
}

export function notifyRestaurantApproved(ownerId: number) {
  if (ioInstance) {
    ioInstance.to(`user_${ownerId}`).emit('restaurantApproved');
  }
} 