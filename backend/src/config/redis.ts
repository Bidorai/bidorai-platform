import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        console.warn('Redis connection failed after 10 retries. Continuing without Redis...');
        return false; // Stop retrying
      }
      return Math.min(retries * 100, 3000); // Exponential backoff with max 3s
    },
    connectTimeout: 5000, // 5 second timeout
  }
});

redis.on('error', (err) => {
  console.warn('Redis Client Error:', err.message);
  // Don't log the full error stack in development to reduce noise
  if (process.env.NODE_ENV === 'production') {
    console.error('Redis Client Error', err);
  }
});

redis.on('connect', () => console.log('Redis connected'));
redis.on('ready', () => console.log('Redis ready'));
redis.on('reconnecting', () => console.log('Redis reconnecting...'));

// Initialize connection with better error handling
let redisConnected = false;

(async () => {
  try {
    if (!redis.isOpen) {
      await redis.connect();
      redisConnected = true;
      console.log('Redis connection established successfully');
    }
  } catch (error) {
    console.warn('Failed to connect to Redis. Application will continue without Redis functionality.');
    console.warn('To fix this, either:');
    console.warn('1. Install Docker Desktop and run: docker compose up -d');
    console.warn('2. Install Redis locally and start the Redis server');
    console.warn('3. Set REDIS_URL environment variable to point to a Redis instance');
    
    if (process.env.NODE_ENV === 'production') {
      console.error('Redis connection failed in production:', error);
    }
  }
})();

// Export a wrapper that handles Redis unavailability
export const getRedisClient = () => {
  if (redisConnected && redis.isOpen) {
    return redis;
  }
  return null;
};

export { redis }; 
