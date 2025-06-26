import { Router, Request, Response } from 'express';
import { Pool } from 'pg';
import { requireRole } from '../middleware/role';
import authenticate from '../middleware/auth';

const router = Router();
const pool = new Pool();

router.use(authenticate, requireRole('admin'));

// List unapproved restaurants
router.get('/restaurants/pending', async (_req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM restaurants WHERE approved = false AND (rejected IS NULL OR rejected = false)');
  res.json(result.rows);
});

// Approve a restaurant
router.post('/restaurants/:id/approve', async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query('UPDATE restaurants SET approved = true, rejected = false WHERE id = $1', [id]);
  res.json({ success: true });
});

// Reject a restaurant
router.post('/restaurants/:id/reject', async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query('UPDATE restaurants SET approved = false, rejected = true WHERE id = $1', [id]);
  res.json({ success: true });
});

// Analytics: user, restaurant, order count, breakdowns
router.get('/analytics', async (_req: Request, res: Response) => {
  const users = await pool.query('SELECT COUNT(*) FROM users');
  const restaurants = await pool.query('SELECT COUNT(*) FROM restaurants');
  const orders = await pool.query('SELECT COUNT(*) FROM orders');
  const usersByRole = await pool.query('SELECT role, COUNT(*) FROM users GROUP BY role');
  const ordersByStatus = await pool.query('SELECT status, COUNT(*) FROM orders GROUP BY status');
  res.json({
    userCount: parseInt(users.rows[0].count, 10),
    restaurantCount: parseInt(restaurants.rows[0].count, 10),
    orderCount: parseInt(orders.rows[0].count, 10),
    usersByRole: Object.fromEntries(usersByRole.rows.map((r: any) => [r.role, parseInt(r.count, 10)])),
    ordersByStatus: Object.fromEntries(ordersByStatus.rows.map((r: any) => [r.status, parseInt(r.count, 10)])),
  });
});

export default router; 