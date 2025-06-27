"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pg_1 = require("pg");
const role_1 = require("../middleware/role");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
const pool = new pg_1.Pool();
router.use(auth_1.default, (0, role_1.requireRole)('admin'));
// List unapproved restaurants
router.get('/restaurants/pending', async (_req, res) => {
    const result = await pool.query('SELECT * FROM restaurants WHERE approved = false AND (rejected IS NULL OR rejected = false)');
    res.json(result.rows);
});
// Approve a restaurant
router.post('/restaurants/:id/approve', async (req, res) => {
    const { id } = req.params;
    await pool.query('UPDATE restaurants SET approved = true, rejected = false WHERE id = $1', [id]);
    res.json({ success: true });
});
// Reject a restaurant
router.post('/restaurants/:id/reject', async (req, res) => {
    const { id } = req.params;
    await pool.query('UPDATE restaurants SET approved = false, rejected = true WHERE id = $1', [id]);
    res.json({ success: true });
});
// Analytics: user, restaurant, order count, breakdowns
router.get('/analytics', async (_req, res) => {
    const users = await pool.query('SELECT COUNT(*) FROM users');
    const restaurants = await pool.query('SELECT COUNT(*) FROM restaurants');
    const orders = await pool.query('SELECT COUNT(*) FROM orders');
    const usersByRole = await pool.query('SELECT role, COUNT(*) FROM users GROUP BY role');
    const ordersByStatus = await pool.query('SELECT status, COUNT(*) FROM orders GROUP BY status');
    res.json({
        userCount: parseInt(users.rows[0].count, 10),
        restaurantCount: parseInt(restaurants.rows[0].count, 10),
        orderCount: parseInt(orders.rows[0].count, 10),
        usersByRole: Object.fromEntries(usersByRole.rows.map((r) => [r.role, parseInt(r.count, 10)])),
        ordersByStatus: Object.fromEntries(ordersByStatus.rows.map((r) => [r.status, parseInt(r.count, 10)])),
    });
});
exports.default = router;
