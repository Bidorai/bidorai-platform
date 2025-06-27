"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = createNotification;
const pg_1 = require("pg");
const pool = new pg_1.Pool();
async function createNotification({ user_id, owner_id, message, type }) {
    await pool.query('INSERT INTO notifications (user_id, owner_id, message, type) VALUES ($1, $2, $3, $4)', [user_id || null, owner_id || null, message, type || null]);
}
