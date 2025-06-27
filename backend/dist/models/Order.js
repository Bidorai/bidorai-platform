"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool();
class OrderModel {
    static async getAll() {
        const res = await pool.query(`
      SELECT o.*, r.name as restaurant_name, m.name as menu_name
      FROM orders o
      JOIN restaurants r ON o.restaurant_id = r.id
      JOIN menus m ON o.menu_id = m.id
      ORDER BY o.created_at DESC
    `);
        return res.rows;
    }
    static async getByUserId(userId) {
        const res = await pool.query(`
      SELECT o.*, r.name as restaurant_name, m.name as menu_name
      FROM orders o
      JOIN restaurants r ON o.restaurant_id = r.id
      JOIN menus m ON o.menu_id = m.id
      WHERE o.user_id = $1
      ORDER BY o.created_at DESC
    `, [userId]);
        return res.rows;
    }
    static async create(order) {
        const { user_id, restaurant_id, menu_id, bid_id, price, status, payment_status = 'pending', order_status = 'pending' } = order;
        const res = await pool.query('INSERT INTO orders (user_id, restaurant_id, menu_id, bid_id, price, status, payment_status, order_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [user_id, restaurant_id, menu_id, bid_id || null, price, status, payment_status, order_status]);
        return res.rows[0];
    }
    static async updatePaymentStatus(orderId, payment_status) {
        await pool.query('UPDATE orders SET payment_status = $1 WHERE id = $2', [payment_status, orderId]);
    }
    static async updateOrderStatus(orderId, order_status) {
        await pool.query('UPDATE orders SET order_status = $1 WHERE id = $2', [order_status, orderId]);
    }
}
exports.OrderModel = OrderModel;
