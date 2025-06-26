import { Pool } from 'pg';

export interface User {
  id: number;
  email: string;
  password_hash: string;
  role: string;
  created_at: Date;
}

const pool = new Pool();

export class UserModel {
  static async findByEmail(email: string): Promise<User | null> {
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0] || null;
  }

  static async create(email: string, password_hash: string, role: string): Promise<User> {
    const res = await pool.query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *',
      [email, password_hash, role]
    );
    return res.rows[0];
  }
} 