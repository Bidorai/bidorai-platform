import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRouter from './routes/auth';
import { registerBiddingSocket } from './socket/biddingSocket';
import menuRouter from './routes/menu';
import orderRouter from './routes/order';
import adminRouter from './routes/admin';
import notificationsRouter from './routes/notifications';
import { registerNotificationSocket } from './socket/notificationSocket';
import restaurantRouter from './routes/restaurant';
import paymentRouter from './routes/payment';
import reviewRouter from './routes/review';
import { registerOrderSocket } from './socket/orderSocket';
import restaurantAnalyticsRouter from './routes/restaurant-analytics';
import adminAnalyticsRouter from './routes/admin-analytics';
import notificationsHistoryRouter from './routes/notifications-history';
import adminAuthRouter from './routes/admin-auth';

// Load env vars
dotenv.config();

console.log('PGUSER:', process.env.PGUSER);
console.log('PGPASSWORD:', process.env.PGPASSWORD);
console.log('PGHOST:', process.env.PGHOST);
console.log('PGPORT:', process.env.PGPORT);
console.log('PGDATABASE:', process.env.PGDATABASE);

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(helmet());
app.use(express.json());

// Add a root route
app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to the Bidorai API!' });
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Socket.IO test
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

app.use('/auth', authRouter);
app.use('/menu', menuRouter);
app.use('/order', orderRouter);
app.use('/admin', adminAuthRouter);
app.use('/admin', adminRouter);
app.use('/notifications', notificationsRouter);
app.use('/restaurant', restaurantRouter);
app.use('/payment', paymentRouter);
app.use('/review', reviewRouter);
app.use('/restaurant-analytics', restaurantAnalyticsRouter);
app.use('/admin-analytics', adminAnalyticsRouter);
app.use('/notifications-history', notificationsHistoryRouter);

registerBiddingSocket(io);
registerNotificationSocket(io);
registerOrderSocket(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});

export { app }; 