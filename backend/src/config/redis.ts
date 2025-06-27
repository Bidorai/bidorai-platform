import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redis.on('error', (err) => console.error('Redis Client Error', err));
redis.on('connect', () => console.log('Redis connected'));
redis.on('ready', () => console.log('Redis ready'));

// Initialize connection
(async () => {
  try {
    if (!redis.isOpen) {
      await redis.connect();
    }
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
})();

export { redis }; 
