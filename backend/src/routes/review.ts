import { Router, Request, Response } from 'express';
import { Pool } from 'pg';

const router = Router();
const pool = new Pool();

router.post('/', async (req: Request, res: Response) => {
  const { order_id, user_id, rating, comment } = req.body;
  if (!order_id || !user_id || !rating) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  await pool.query('INSERT INTO reviews (order_id, user_id, rating, comment) VALUES ($1, $2, $3, $4)', [order_id, user_id, rating, comment]);
  res.status(201).json({ success: true });
});

// GET /review?rating=5&user_id=1&sort=desc
router.get('/', async (req: Request, res: Response) => {
  const { rating, order_id, user_id, sort } = req.query;
  let query = 'SELECT * FROM reviews';
  const params: any[] = [];
  const conditions: string[] = [];
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

export default router; 