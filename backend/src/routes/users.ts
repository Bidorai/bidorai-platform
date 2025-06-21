import express from 'express';
import { Request, Response } from 'express';
import { pool } from '../config/database';
import { auth } from '../middleware/auth';

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req: Request, res: Response) => {
  try {
    const user = await pool.query(
      'SELECT id, username, email FROM users WHERE id = $1',
      [req.user.id]
    );
    
    res.json(user.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', auth, async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;
    
    await pool.query(
      'UPDATE users SET username = $1, email = $2 WHERE id = $3',
      [username, email, req.user.id]
    );
    
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update profile' });
  }
});

// Get user preferences
router.get('/preferences', auth, async (req: Request, res: Response) => {
  try {
    const preferences = await pool.query(
      'SELECT * FROM user_preferences WHERE user_id = $1',
      [req.user.id]
    );
    
    res.json(preferences.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch preferences' });
  }
});

// Update user preferences
router.put('/preferences', auth, async (req: Request, res: Response) => {
  try {
    const { theme, notifications_enabled } = req.body;
    
    await pool.query(
      'INSERT INTO user_preferences (user_id, theme, notifications_enabled) 
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id) 
       DO UPDATE SET theme = $2, notifications_enabled = $3',
      [req.user.id, theme, notifications_enabled]
    );
    
    res.json({ message: 'Preferences updated successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update preferences' });
  }
});

export default router;
