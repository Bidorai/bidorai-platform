"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const redis_1 = require("redis");
const redis = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});
exports.redis = redis;
redis.on('error', (err) => console.error('Redis Client Error', err));
redis.on('connect', () => console.log('Redis connected'));
redis.on('ready', () => console.log('Redis ready'));
// Initialize connection
(async () => {
    try {
        if (!redis.isOpen) {
            await redis.connect();
        }
    }
    catch (error) {
        console.error('Failed to connect to Redis:', error);
    }
})();
