"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerNotificationSocket = registerNotificationSocket;
exports.notifyRestaurantApproved = notifyRestaurantApproved;
let ioInstance = null;
function registerNotificationSocket(io) {
    ioInstance = io;
    io.on('connection', (socket) => {
        socket.on('joinNotifications', ({ userId }) => {
            socket.join(`user_${userId}`);
        });
    });
}
function notifyRestaurantApproved(ownerId) {
    if (ioInstance) {
        ioInstance.to(`user_${ownerId}`).emit('restaurantApproved');
    }
}
