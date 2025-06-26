import { Server, Socket } from 'socket.io';

let ioInstance: Server | null = null;

export function registerOrderSocket(io: Server) {
  ioInstance = io;
  io.on('connection', (socket: Socket) => {
    socket.on('joinOrderNotifications', ({ userId }) => {
      socket.join(`user_${userId}`);
    });
  });
}

export function notifyOrderPaymentUpdated(userId: number, order: any) {
  if (ioInstance) {
    ioInstance.to(`user_${userId}`).emit('orderPaymentUpdated', order);
  }
}

export function notifyOrderStatusUpdated(userId: number, order: any) {
  if (ioInstance) {
    ioInstance.to(`user_${userId}`).emit('orderStatusUpdated', order);
  }
} 