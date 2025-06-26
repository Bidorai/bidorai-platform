import { Router, Response } from 'express';
import { Pool } from 'pg';
import authenticate, { AuthRequest } from '../middleware/auth';

const router = Router();
const pool = new Pool();

router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id || 1;
  const result = await pool.query(
    'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  res.json(result.rows);
});

router.post('/restaurant-approved', (req: AuthRequest, res: Response) => {
  const { owner_id } = req.body;
  // In real app, send email or push notification
  console.log(`Notify owner ${owner_id}: Your restaurant was approved!`);
  res.json({ success: true });
});

export default router; 