"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Order_1 = require("../models/Order");
const auth_1 = __importDefault(require("../middleware/auth"));
const express_validator_1 = require("express-validator");
const orderSocket_1 = require("../socket/orderSocket");
const pg_1 = require("pg");
const notifications_1 = require("../utils/notifications");
const router = (0, express_1.Router)();
const pool = new pg_1.Pool();
router.post('/', auth_1.default, (0, express_validator_1.body)('user_id').isInt(), (0, express_validator_1.body)('restaurant_id').isInt(), (0, express_validator_1.body)('menu_id').isInt(), (0, express_validator_1.body)('price').isFloat({ gt: 0 }), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { user_id, restaurant_id, menu_id, bid_id, price } = req.body;
    const order = await Order_1.OrderModel.create({ user_id, restaurant_id, menu_id, bid_id, price, status: 'pending', payment_status: 'pending', order_status: 'pending' });
    res.status(201).json(order);
});
router.get('/', auth_1.default, async (req, res) => {
    // Get user ID from JWT token
    const userId = req.user?.id || 1; // For now, default to user 1
    const orders = await Order_1.OrderModel.getByUserId(userId);
    res.json(orders);
});
// Update order_status
router.patch('/:id/status', auth_1.default, async (req, res) => {
    const { id } = req.params;
    const { order_status } = req.body;
    await Order_1.OrderModel.updateOrderStatus(Number(id), order_status);
    // Fetch order and user_id
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    const order = result.rows[0];
    if (order) {
        (0, orderSocket_1.notifyOrderStatusUpdated)(order.user_id, order);
        await (0, notifications_1.createNotification)({ user_id: order.user_id, message: `Order #${order.id} status updated: ${order_status}`, type: 'order_status' });
    }
    res.json({ success: true });
});
// Update payment_status
router.patch('/:id/payment', auth_1.default, async (req, res) => {
    const { id } = req.params;
    const { payment_status } = req.body;
    await Order_1.OrderModel.updatePaymentStatus(Number(id), payment_status);
    // Fetch order and user_id
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    const order = result.rows[0];
    if (order) {
        (0, orderSocket_1.notifyOrderPaymentUpdated)(order.user_id, order);
        await (0, notifications_1.createNotification)({ user_id: order.user_id, message: `Order #${order.id} payment updated: ${payment_status}`, type: 'payment' });
    }
    res.json({ success: true });
});
exports.default = router;
