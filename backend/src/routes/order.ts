import { Router, Response } from 'express';
import { OrderModel } from '../models/Order';
import authenticate, { AuthRequest } from '../middleware/auth';
import { body, validationResult } from 'express-validator';
import { notifyOrderPaymentUpdated, notifyOrderStatusUpdated } from '../socket/orderSocket';
import { Pool } from 'pg';
import { createNotification } from '../utils/notifications';

const router = Router();
const pool = new Pool();

router.post(
  '/',
  authenticate,
  body('user_id').isInt(),
  body('restaurant_id').isInt(),
  body('menu_id').isInt(),
  body('price').isFloat({ gt: 0 }),
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { user_id, restaurant_id, menu_id, bid_id, price } = req.body;
    const order = await OrderModel.create({ user_id, restaurant_id, menu_id, bid_id, price, status: 'pending', payment_status: 'pending', order_status: 'pending' });
    res.status(201).json(order);
  }
);

router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  // Get user ID from JWT token
  const userId = req.user?.id || 1; // For now, default to user 1
  const orders = await OrderModel.getByUserId(userId);
  res.json(orders);
});

// Update order_status
router.patch('/:id/status', authenticate, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { order_status } = req.body;
  await OrderModel.updateOrderStatus(Number(id), order_status);
  // Fetch order and user_id
  const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
  const order = result.rows[0];
  if (order) {
    notifyOrderStatusUpdated(order.user_id, order);
    await createNotification({ user_id: order.user_id, message: `Order #${order.id} status updated: ${order_status}`, type: 'order_status' });
  }
  res.json({ success: true });
});

// Update payment_status
router.patch('/:id/payment', authenticate, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { payment_status } = req.body;
  await OrderModel.updatePaymentStatus(Number(id), payment_status);
  // Fetch order and user_id
  const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
  const order = result.rows[0];
  if (order) {
    notifyOrderPaymentUpdated(order.user_id, order);
    await createNotification({ user_id: order.user_id, message: `Order #${order.id} payment updated: ${payment_status}`, type: 'payment' });
  }
  res.json({ success: true });
});

export default router; 