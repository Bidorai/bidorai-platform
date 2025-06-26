import { Router, Request, Response } from 'express';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authenticate from '../middleware/auth';

const router = Router();
const pool = new Pool();
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

// Register
router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) return res.status(409).json({ error: 'Email already registered' });
  const password_hash = await bcrypt.hash(password, 10);
  const userRes = await pool.query(
    'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *',
    [email, password_hash, 'delivery']
  );
  const user = userRes.rows[0];
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  const userRes = await pool.query('SELECT * FROM users WHERE email = $1 AND role = $2', [email, 'delivery']);
  const user = userRes.rows[0];
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

// Get assigned orders
router.get('/orders', authenticate, async (req: any, res: Response) => {
  const deliveryId = req.user.id;
  const result = await pool.query('SELECT * FROM orders WHERE delivery_partner_id = $1', [deliveryId]);
  res.json(result.rows);
});

// Accept an order
router.post('/orders/:id/accept', authenticate, async (req: any, res: Response) => {
  const deliveryId = req.user.id;
  const { id } = req.params;
  await pool.query('UPDATE orders SET delivery_partner_id = $1, order_status = $2 WHERE id = $3', [deliveryId, 'accepted', id]);
  res.json({ success: true });
});

export default router; 