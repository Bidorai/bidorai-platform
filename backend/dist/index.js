"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const biddingSocket_1 = require("./socket/biddingSocket");
const menu_1 = __importDefault(require("./routes/menu"));
const order_1 = __importDefault(require("./routes/order"));
const admin_1 = __importDefault(require("./routes/admin"));
const notifications_1 = __importDefault(require("./routes/notifications"));
const notificationSocket_1 = require("./socket/notificationSocket");
const restaurant_1 = __importDefault(require("./routes/restaurant"));
const payment_1 = __importDefault(require("./routes/payment"));
const review_1 = __importDefault(require("./routes/review"));
const orderSocket_1 = require("./socket/orderSocket");
const restaurant_analytics_1 = __importDefault(require("./routes/restaurant-analytics"));
const admin_analytics_1 = __importDefault(require("./routes/admin-analytics"));
const notifications_history_1 = __importDefault(require("./routes/notifications-history"));
// Load env vars
dotenv_1.default.config();
console.log('PGUSER:', process.env.PGUSER);
console.log('PGPASSWORD:', process.env.PGPASSWORD);
console.log('PGHOST:', process.env.PGHOST);
console.log('PGPORT:', process.env.PGPORT);
console.log('PGDATABASE:', process.env.PGDATABASE);
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
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
app.use('/auth', auth_1.default);
app.use('/menu', menu_1.default);
app.use('/order', order_1.default);
app.use('/admin', admin_1.default);
app.use('/notifications', notifications_1.default);
app.use('/restaurant', restaurant_1.default);
app.use('/payment', payment_1.default);
app.use('/review', review_1.default);
app.use('/restaurant-analytics', restaurant_analytics_1.default);
app.use('/admin-analytics', admin_analytics_1.default);
app.use('/notifications-history', notifications_history_1.default);
(0, biddingSocket_1.registerBiddingSocket)(io);
(0, notificationSocket_1.registerNotificationSocket)(io);
(0, orderSocket_1.registerOrderSocket)(io);
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
});
