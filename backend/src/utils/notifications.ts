import { Pool } from 'pg';

const pool = new Pool();

export async function createNotification({ user_id, owner_id, message, type }: { user_id?: number, owner_id?: number, message: string, type?: string }) {
  await pool.query('INSERT INTO notifications (user_id, owner_id, message, type) VALUES ($1, $2, $3, $4)', [user_id || null, owner_id || null, message, type || null]);
} 