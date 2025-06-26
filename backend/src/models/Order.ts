import { Pool } from 'pg';

export interface Order {
  id: number;
  user_id: number;
  restaurant_id: number;
  menu_id: number;
  bid_id?: number;
  price: number;
  status: string;
  payment_status: string;
  order_status: string;
  delivery_partner_id?: number;
  restaurant_name?: string;
  menu_name?: string;
  created_at: Date;
}

const pool = new Pool();

export class OrderModel {
  static async getAll(): Promise<Order[]> {
    const res = await pool.query(`
      SELECT o.*, r.name as restaurant_name, m.name as menu_name
      FROM orders o
      JOIN restaurants r ON o.restaurant_id = r.id
      JOIN menus m ON o.menu_id = m.id
      ORDER BY o.created_at DESC
    `);
    return res.rows;
  }

  static async getByUserId(userId: number): Promise<Order[]> {
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

  static async create(order: Omit<Order, 'id' | 'created_at'>): Promise<Order> {
    const { user_id, restaurant_id, menu_id, bid_id, price, status, payment_status = 'pending', order_status = 'pending' } = order;
    const res = await pool.query(
      'INSERT INTO orders (user_id, restaurant_id, menu_id, bid_id, price, status, payment_status, order_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [user_id, restaurant_id, menu_id, bid_id || null, price, status, payment_status, order_status]
    );
    return res.rows[0];
  }

  static async updatePaymentStatus(orderId: number, payment_status: string): Promise<void> {
    await pool.query('UPDATE orders SET payment_status = $1 WHERE id = $2', [payment_status, orderId]);
  }

  static async updateOrderStatus(orderId: number, order_status: string): Promise<void> {
    await pool.query('UPDATE orders SET order_status = $1 WHERE id = $2', [order_status, orderId]);
  }
} 