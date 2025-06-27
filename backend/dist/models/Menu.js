"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuModel = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool();
class MenuModel {
    static async getAll() {
        const res = await pool.query(`
      SELECT m.*, r.name as restaurant_name 
      FROM menus m 
      JOIN restaurants r ON m.restaurant_id = r.id
      ORDER BY m.created_at DESC
    `);
        return res.rows;
    }
    static async getById(id) {
        const res = await pool.query(`
      SELECT m.*, r.name as restaurant_name 
      FROM menus m 
      JOIN restaurants r ON m.restaurant_id = r.id
      WHERE m.id = $1
    `, [id]);
        return res.rows[0] || null;
    }
    static async create(menu) {
        const { restaurant_id, name, description, price, category, image_url } = menu;
        const res = await pool.query('INSERT INTO menus (restaurant_id, name, description, price, category, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [restaurant_id, name, description, price, category || 'main-courses', image_url]);
        return res.rows[0];
    }
}
exports.MenuModel = MenuModel;
