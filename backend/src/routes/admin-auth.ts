import { Router } from 'express';
import {
  adminLogin,
  adminSignup,
  sendOTP,
  adminLoginWithPhone,
  getAdminProfile,
  updateAdminProfile
} from '../controllers/adminAuthController';
import authenticate from '../middleware/auth';
import { Pool } from 'pg';

const router = Router();
const pool = new Pool();

// Test endpoint to check database structure
router.get('/test-db', async (req, res) => {
  try {
    // Check if users table exists and has required columns
    const result = await pool.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      ORDER BY ordinal_position
    `);
    
    res.json({
      success: true,
      columns: result.rows,
      message: 'Database connection successful'
    });
  } catch (error: any) {
    console.error('Database test error:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Unknown error',
      message: 'Database connection failed'
    });
  }
});

router.post('/signup', adminSignup);
router.post('/login', adminLogin);
router.post('/send-otp', sendOTP);
router.post('/login-phone', adminLoginWithPhone);
router.get('/profile', authenticate, getAdminProfile);
router.put('/profile', authenticate, updateAdminProfile);

export default router; 