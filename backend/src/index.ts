import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import pool from './config/database';
import { createClient } from 'redis';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Redis client
export const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join bidding room
  socket.on('join-bidding', (data) => {
    socket.join('bidding-room');
    console.log(`User ${socket.id} joined bidding room`);
  });

  // Handle bid placement
  socket.on('place-bid', async (bidData) => {
    try {
      // Validate and process bid
      console.log('Bid received:', bidData);
      
      // Broadcast updated bid to all clients
      io.to('bidding-room').emit('bid-update', {
        restaurantId: bidData.restaurantId,
        newPrice: bidData.amount,
        bidderCount: bidData.bidderCount + 1
      });
    } catch (error) {
      socket.emit('bid-error', { message: 'Failed to place bid' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Routes
app.get('/api/health', async (req, res) => {
  try {
    const dbResult = await pool.query('SELECT NOW()');
    const redisStatus = redisClient.isOpen ? 'connected' : 'disconnected';
    
    res.json({
      status: 'healthy',
      database: dbResult.rows[0].now ? 'connected' : 'disconnected',
      redis: redisStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});

// Restaurant routes
app.get('/api/restaurants', async (req, res) => {
  try {
    const { location, cuisine, partySize } = req.query;
    
    // Mock restaurant data for now
    const restaurants = [
      {
        id: 'farm-fresh',
        name: 'Farm Fresh Kitchen',
        rating: 4.9,
        distance: 0.8,
        cuisine: 'Organic Certified',
        dish: '🥗 Organic Harvest Bowl',
        serves: 15,
        bidders: 8,
        currentBid: 217,
        progress: 75,
        tag: '🌱 Fresh picked today!'
      },
      {
        id: 'green-garden',
        name: 'Green Garden Bistro',
        rating: 4.8,
        distance: 1.2,
        cuisine: 'Farm-to-Table',
        dish: '🥘 Sustainable Feast Tray',
        serves: 12,
        bidders: 12,
        currentBid: 185,
        progress: 0,
        tag: ''
      },
      {
        id: 'tokyo-sushi',
        name: 'Tokyo Sushi',
        rating: 4.7,
        distance: 2.1,
        cuisine: 'Japanese Fresh',
        dish: '🍣 Sushi Platter',
        serves: 8,
        bidders: 6,
        currentBid: 165,
        progress: 45,
        tag: '🆕 New entry!'
      }
    ];
    
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

// Start servers
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to Redis
    await redisClient.connect();
    console.log('✅ Redis connected');
    
    // Test database connection
    await pool.query('SELECT NOW()');
    console.log('✅ PostgreSQL connected');
    
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();