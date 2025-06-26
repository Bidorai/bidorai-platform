import { Router, Request, Response } from 'express';
import { OrderModel } from '../models/Order';

const router = Router();

router.post('/pay', async (req: Request, res: Response) => {
  const { user_id, order_id, amount } = req.body;
  // In real app, integrate with payment provider
  console.log(`Simulate payment: user ${user_id}, order ${order_id}, amount $${amount}`);
  await OrderModel.updatePaymentStatus(order_id, 'paid');
  // In real app, trigger notification here
  res.json({ success: true });
});

export default router; 