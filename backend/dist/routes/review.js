"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pg_1 = require("pg");
const router = (0, express_1.Router)();
const pool = new pg_1.Pool();
router.post('/', async (req, res) => {
    const { order_id, user_id, rating, comment } = req.body;
    if (!order_id || !user_id || !rating) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    await pool.query('INSERT INTO reviews (order_id, user_id, rating, comment) VALUES ($1, $2, $3, $4)', [order_id, user_id, rating, comment]);
    res.status(201).json({ success: true });
});
// GET /review?rating=5&user_id=1&sort=desc
router.get('/', async (req, res) => {
    const { rating, order_id, user_id, sort } = req.query;
    let query = 'SELECT * FROM reviews';
    const params = [];
    const conditions = [];
    if (rating) {
        params.push(rating);
        conditions.push(`rating = $${params.length}`);
    }
    if (order_id) {
        params.push(order_id);
        conditions.push(`order_id = $${params.length}`);
    }
    if (user_id) {
        params.push(user_id);
        conditions.push(`user_id = $${params.length}`);
    }
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY created_at ' + (sort === 'asc' ? 'ASC' : 'DESC');
    const result = await pool.query(query, params);
    res.json(result.rows);
});
exports.default = router;
