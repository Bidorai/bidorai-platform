import { Router, Request, Response } from 'express';
import { Pool } from 'pg';

const router = Router();
const pool = new Pool();

// POST /notifications-history (create notification)
router.post('/', async (req: Request, res: Response) => {
  const { user_id, owner_id, message, type } = req.body;
  if (!message) return res.status(400).json({ error: 'Missing message' });
  await pool.query('INSERT INTO notifications (user_id, owner_id, message, type) VALUES ($1, $2, $3, $4)', [user_id, owner_id, message, type]);
  res.status(201).json({ success: true });
});

// GET /notifications-history/customer?user_id=1
router.get('/customer', async (req: Request, res: Response) => {
  const user_id = Number(req.query.user_id);
  const result = await pool.query('SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC', [user_id]);
  res.json(result.rows);
});

// GET /notifications-history/restaurant?owner_id=2
router.get('/restaurant', async (req: Request, res: Response) => {
  const owner_id = Number(req.query.owner_id);
  const result = await pool.query('SELECT * FROM notifications WHERE owner_id = $1 ORDER BY created_at DESC', [owner_id]);
  res.json(result.rows);
});

export default router; 