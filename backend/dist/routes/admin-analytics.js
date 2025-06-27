"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pg_1 = require("pg");
const auth_1 = __importDefault(require("../middleware/auth"));
const role_1 = require("../middleware/role");
const router = (0, express_1.Router)();
const pool = new pg_1.Pool();
// GET /admin-analytics/summary
router.get('/summary', auth_1.default, (0, role_1.requireRole)('admin'), async (_req, res) => {
    const users = await pool.query('SELECT COUNT(*) FROM users');
    const restaurants = await pool.query('SELECT COUNT(*) FROM restaurants');
    const orders = await pool.query('SELECT COUNT(*) FROM orders');
    const revenue = await pool.query('SELECT COALESCE(SUM(price),0) FROM orders WHERE payment_status = $1', ['paid']);
    res.json({
        userCount: parseInt(users.rows[0].count, 10),
        restaurantCount: parseInt(restaurants.rows[0].count, 10),
        orderCount: parseInt(orders.rows[0].count, 10),
        totalRevenue: parseFloat(revenue.rows[0].coalesce),
    });
});
// GET /admin-analytics/orders-over-time
router.get('/orders-over-time', auth_1.default, (0, role_1.requireRole)('admin'), async (_req, res) => {
    const result = await pool.query(`
    SELECT TO_CHAR(created_at, 'YYYY-MM-DD') as date, COUNT(*) as count
    FROM orders
    GROUP BY date
    ORDER BY date ASC
  `);
    res.json(result.rows.map((r) => ({ date: r.date, count: parseInt(r.count, 10) })));
});
// GET /admin-analytics/user-growth
router.get('/user-growth', auth_1.default, (0, role_1.requireRole)('admin'), async (_req, res) => {
    const result = await pool.query(`
    SELECT TO_CHAR(created_at, 'YYYY-MM-DD') as date, COUNT(*) as count
    FROM users
    GROUP BY date
    ORDER BY date ASC
  `);
    res.json(result.rows.map((r) => ({ date: r.date, count: parseInt(r.count, 10) })));
});
// GET /admin-analytics/menu-analytics?restaurant_id=1&menu_id=2
router.get('/menu-analytics', auth_1.default, (0, role_1.requireRole)('admin'), async (req, res) => {
    const { restaurant_id, menu_id } = req.query;
    if (!restaurant_id)
        return res.status(400).json({ error: 'Missing restaurant_id' });
    let menuFilter = '';
    const params = [restaurant_id];
    if (menu_id) {
        params.push(menu_id);
        menuFilter = ' AND m.id = $2';
    }
    const result = await pool.query(`
    SELECT m.id as menu_id, m.name, COUNT(o.id) as orders, COALESCE(SUM(o.price),0) as revenue
    FROM menus m
    LEFT JOIN orders o ON o.menu_id = m.id AND o.restaurant_id = $1
    WHERE m.restaurant_id = $1${menuFilter}
    GROUP BY m.id, m.name
    ORDER BY orders DESC
  `, params);
    res.json(result.rows.map((r) => ({ menu_id: r.menu_id, name: r.name, orders: parseInt(r.orders, 10), revenue: parseFloat(r.revenue) })));
});
// GET /admin-analytics/user-analytics?role=customer
router.get('/user-analytics', auth_1.default, (0, role_1.requireRole)('admin'), async (req, res) => {
    const { role } = req.query;
    if (!role)
        return res.status(400).json({ error: 'Missing role' });
    const result = await pool.query('SELECT * FROM users WHERE role = $1', [role]);
    res.json({ count: result.rows.length, users: result.rows });
});
exports.default = router;
