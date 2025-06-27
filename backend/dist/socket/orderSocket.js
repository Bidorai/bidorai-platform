"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerOrderSocket = registerOrderSocket;
exports.notifyOrderPaymentUpdated = notifyOrderPaymentUpdated;
exports.notifyOrderStatusUpdated = notifyOrderStatusUpdated;
let ioInstance = null;
function registerOrderSocket(io) {
    ioInstance = io;
    io.on('connection', (socket) => {
        socket.on('joinOrderNotifications', ({ userId }) => {
            socket.join(`user_${userId}`);
        });
    });
}
function notifyOrderPaymentUpdated(userId, order) {
    if (ioInstance) {
        ioInstance.to(`user_${userId}`).emit('orderPaymentUpdated', order);
    }
}
function notifyOrderStatusUpdated(userId, order) {
    if (ioInstance) {
        ioInstance.to(`user_${userId}`).emit('orderStatusUpdated', order);
    }
}
