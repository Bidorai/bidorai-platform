import { Pool } from 'pg';

export interface Menu {
  id: number;
  restaurant_id: number;
  name: string;
  description: string;
  price: number;
  category?: string;
  image_url?: string;
  restaurant_name?: string;
  created_at: Date;
}

const pool = new Pool();

export class MenuModel {
  static async getAll(): Promise<Menu[]> {
    const res = await pool.query(`
      SELECT m.*, r.name as restaurant_name 
      FROM menus m 
      JOIN restaurants r ON m.restaurant_id = r.id
      ORDER BY m.created_at DESC
    `);
    return res.rows;
  }

  static async getById(id: number): Promise<Menu | null> {
    const res = await pool.query(`
      SELECT m.*, r.name as restaurant_name 
      FROM menus m 
      JOIN restaurants r ON m.restaurant_id = r.id
      WHERE m.id = $1
    `, [id]);
    return res.rows[0] || null;
  }

  static async create(menu: Omit<Menu, 'id' | 'created_at'>): Promise<Menu> {
    const { restaurant_id, name, description, price, category, image_url } = menu;
    const res = await pool.query(
      'INSERT INTO menus (restaurant_id, name, description, price, category, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [restaurant_id, name, description, price, category || 'main-courses', image_url]
    );
    return res.rows[0];
  }
} 