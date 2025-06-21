import express from 'express';
import { Request, Response } from 'express';
import { auth } from '../middleware/auth';
import { pool } from '../config/database';
import CacheManager from '../utils/cache';

const router = express.Router();
const cache = CacheManager.getInstance();

// Create notification
router.post('/', auth, async (req: Request, res: Response) => {
  try {
    const { recipientId, type, message, data } = req.body;

    await pool.query(
      'INSERT INTO notifications (sender_id, recipient_id, type, message, data, read_at) 
       VALUES ($1, $2, $3, $4, $5, NULL)',
      [req.user.id, recipientId, type, message, JSON.stringify(data)]
    );

    // Send notification via Socket.IO if user is online
    const onlineUsers = await cache.get('online_users');
    if (onlineUsers && onlineUsers.includes(recipientId)) {
      req.app.get('io').emit('notification', {
        senderId: req.user.id,
        type,
        message,
        data,
      });
    }

    res.json({ message: 'Notification created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

// Get user notifications
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const { limit = 20, offset = 0 } = req.query;

    const notifications = await pool.query(
      'SELECT id, sender_id, type, message, data, created_at, read_at 
       FROM notifications 
       WHERE recipient_id = $1 
       ORDER BY created_at DESC 
       LIMIT $2 OFFSET $3',
      [req.user.id, parseInt(limit as string), parseInt(offset as string)]
    );

    res.json(notifications.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Mark notification as read
router.put('/:id/read', auth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await pool.query(
      'UPDATE notifications SET read_at = CURRENT_TIMESTAMP WHERE id = $1 AND recipient_id = $2',
      [id, req.user.id]
    );

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
});

export default router;
