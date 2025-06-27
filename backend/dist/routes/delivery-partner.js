"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pg_1 = require("pg");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
const pool = new pg_1.Pool();
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
// Register
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: 'Missing fields' });
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0)
        return res.status(409).json({ error: 'Email already registered' });
    const password_hash = await bcryptjs_1.default.hash(password, 10);
    const userRes = await pool.query('INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *', [email, password_hash, 'delivery']);
    const user = userRes.rows[0];
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});
// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: 'Missing fields' });
    const userRes = await pool.query('SELECT * FROM users WHERE email = $1 AND role = $2', [email, 'delivery']);
    const user = userRes.rows[0];
    if (!user)
        return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcryptjs_1.default.compare(password, user.password_hash);
    if (!valid)
        return res.status(401).json({ error: 'Invalid credentials' });
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});
// Get assigned orders
router.get('/orders', auth_1.default, async (req, res) => {
    const deliveryId = req.user.id;
    const result = await pool.query('SELECT * FROM orders WHERE delivery_partner_id = $1', [deliveryId]);
    res.json(result.rows);
});
// Accept an order
router.post('/orders/:id/accept', auth_1.default, async (req, res) => {
    const deliveryId = req.user.id;
    const { id } = req.params;
    await pool.query('UPDATE orders SET delivery_partner_id = $1, order_status = $2 WHERE id = $3', [deliveryId, 'accepted', id]);
    res.json({ success: true });
});
exports.default = router;
