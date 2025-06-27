"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pg_1 = require("pg");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
const pool = new pg_1.Pool();
router.get('/', auth_1.default, async (req, res) => {
    const userId = req.user?.id || 1;
    const result = await pool.query('SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    res.json(result.rows);
});
router.post('/restaurant-approved', (req, res) => {
    const { owner_id } = req.body;
    // In real app, send email or push notification
    console.log(`Notify owner ${owner_id}: Your restaurant was approved!`);
    res.json({ success: true });
});
exports.default = router;
