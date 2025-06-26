import { Router, Request, Response } from 'express';
import { Pool } from 'pg';
import authenticate from '../middleware/auth';
import { requireRole } from '../middleware/role';
import { Parser } from 'json2csv';

const router = Router();
const pool = new Pool();

// GET /restaurant-analytics/summary?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD
router.get('/summary', authenticate, requireRole('restaurant'), async (req: any, res: Response) => {
  const ownerId = req.user.id;
  const { start_date, end_date } = req.query;
  const restResult = await pool.query('SELECT id FROM restaurants WHERE owner_id = $1', [ownerId]);
  const restaurant = restResult.rows[0];
  if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
  const restaurantId = restaurant.id;
  let dateFilter = '';
  const params: any[] = [restaurantId];
  if (start_date) {
    params.push(start_date);
    dateFilter += ` AND created_at >= $${params.length}`;
  }
  if (end_date) {
    params.push(end_date);
    dateFilter += ` AND created_at <= $${params.length}`;
  }
  // Total orders
  const ordersResult = await pool.query('SELECT COUNT(*) FROM orders WHERE restaurant_id = $1' + dateFilter, params);
  // Total revenue
  const revenueResult = await pool.query('SELECT COALESCE(SUM(price),0) FROM orders WHERE restaurant_id = $1 AND payment_status = $2' + dateFilter, [restaurantId, 'paid', ...(params.slice(1))]);
  // Avg rating
  const ratingResult = await pool.query('SELECT COALESCE(AVG(rating),0) FROM reviews WHERE order_id IN (SELECT id FROM orders WHERE restaurant_id = $1' + dateFilter + ')', params);
  res.json({
    totalOrders: parseInt(ordersResult.rows[0].count, 10),
    totalRevenue: parseFloat(revenueResult.rows[0].coalesce),
    avgRating: parseFloat(ratingResult.rows[0].coalesce),
  });
});

// GET /restaurant-analytics/orders-over-time?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD
router.get('/orders-over-time', authenticate, requireRole('restaurant'), async (req: any, res: Response) => {
  const ownerId = req.user.id;
  const { start_date, end_date } = req.query;
  const restResult = await pool.query('SELECT id FROM restaurants WHERE owner_id = $1', [ownerId]);
  const restaurant = restResult.rows[0];
  if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
  const restaurantId = restaurant.id;
  let dateFilter = '';
  const params: any[] = [restaurantId];
  if (start_date) {
    params.push(start_date);
    dateFilter += ` AND created_at >= $${params.length}`;
  }
  if (end_date) {
    params.push(end_date);
    dateFilter += ` AND created_at <= $${params.length}`;
  }
  const result = await pool.query(`
    SELECT TO_CHAR(created_at, 'YYYY-MM-DD') as date, COUNT(*) as count
    FROM orders
    WHERE restaurant_id = $1${dateFilter}
    GROUP BY date
    ORDER BY date ASC
  `, params);
  res.json(result.rows.map((r: any) => ({ date: r.date, count: parseInt(r.count, 10) })));
});

// GET /restaurant-analytics/orders-csv?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD
router.get('/orders-csv', authenticate, requireRole('restaurant'), async (req: any, res: Response) => {
  const ownerId = req.user.id;
  const { start_date, end_date } = req.query;
  const restResult = await pool.query('SELECT id FROM restaurants WHERE owner_id = $1', [ownerId]);
  const restaurant = restResult.rows[0];
  if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
  const restaurantId = restaurant.id;
  let dateFilter = '';
  const params: any[] = [restaurantId];
  if (start_date) {
    params.push(start_date);
    dateFilter += ` AND created_at >= $${params.length}`;
  }
  if (end_date) {
    params.push(end_date);
    dateFilter += ` AND created_at <= $${params.length}`;
  }
  const result = await pool.query('SELECT * FROM orders WHERE restaurant_id = $1' + dateFilter, params);
  const parser = new Parser();
  const csv = parser.parse(result.rows);
  res.header('Content-Type', 'text/csv');
  res.attachment('orders.csv');
  res.send(csv);
});

// GET /restaurant-analytics/ratings-distribution
router.get('/ratings-distribution', authenticate, requireRole('restaurant'), async (req: any, res: Response) => {
  const ownerId = req.user.id;
  const restResult = await pool.query('SELECT id FROM restaurants WHERE owner_id = $1', [ownerId]);
  const restaurant = restResult.rows[0];
  if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
  const restaurantId = restaurant.id;
  const result = await pool.query(`
    SELECT rating, COUNT(*) as count
    FROM reviews
    WHERE order_id IN (SELECT id FROM orders WHERE restaurant_id = $1)
    GROUP BY rating
    ORDER BY rating DESC
  `, [restaurantId]);
  res.json(result.rows.map((r: any) => ({ rating: r.rating, count: parseInt(r.count, 10) })));
});

export default router; 