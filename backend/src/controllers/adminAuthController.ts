import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';

const pool = new Pool();
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

interface AdminUser {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string[];
  created_at: string;
}

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user exists and is an admin
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND role IN ($2, $3, $4)',
      [email, 'admin', 'super_admin', 'moderator']
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials or insufficient privileges' });
    }

    const user = result.rows[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await pool.query(
      'UPDATE users SET last_login = NOW() WHERE id = $1',
      [user.id]
    );

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        type: 'admin'
      }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    // Return user data (without password)
    const userData: AdminUser = {
      id: user.id,
      email: user.email,
      phone: user.phone || '',
      name: user.name || user.email.split('@')[0],
      role: user.role,
      permissions: user.permissions || ['read', 'write'],
      created_at: user.created_at
    };

    res.json({
      success: true,
      token,
      user: userData
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const adminSignup = async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone, role } = req.body;
    
    if (!email || !password || !name || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate role
    const validRoles = ['admin', 'moderator'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create admin user
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, name, phone, role, permissions, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) 
       RETURNING id, email, name, phone, role, permissions, created_at`,
      [email, passwordHash, name, phone || null, role, ['read', 'write']]
    );

    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        type: 'admin'
      }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    const userData: AdminUser = {
      id: user.id,
      email: user.email,
      phone: user.phone || '',
      name: user.name,
      role: user.role,
      permissions: user.permissions,
      created_at: user.created_at
    };

    res.status(201).json({
      success: true,
      token,
      user: userData
    });

  } catch (error) {
    console.error('Admin signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // In a real application, you would integrate with an SMS service
    // For now, we'll generate a mock OTP and store it temporarily
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in database or cache (Redis would be ideal)
    // For now, we'll just return success
    console.log(`OTP for ${phone}: ${otp}`);

    res.json({
      success: true,
      message: 'OTP sent successfully'
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

export const adminLoginWithPhone = async (req: Request, res: Response) => {
  try {
    const { phone, otp } = req.body;
    
    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone and OTP are required' });
    }

    // In a real application, you would verify the OTP
    // For now, we'll accept any 6-digit OTP for demo purposes
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    // Find user by phone
    const result = await pool.query(
      'SELECT * FROM users WHERE phone = $1 AND role IN ($2, $3, $4)',
      [phone, 'admin', 'super_admin', 'moderator']
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials or insufficient privileges' });
    }

    const user = result.rows[0];

    // Update last login
    await pool.query(
      'UPDATE users SET last_login = NOW() WHERE id = $1',
      [user.id]
    );

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        type: 'admin'
      }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    const userData: AdminUser = {
      id: user.id,
      email: user.email,
      phone: user.phone || '',
      name: user.name || user.email.split('@')[0],
      role: user.role,
      permissions: user.permissions || ['read', 'write'],
      created_at: user.created_at
    };

    res.json({
      success: true,
      token,
      user: userData
    });

  } catch (error) {
    console.error('Admin phone login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAdminProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const result = await pool.query(
      'SELECT id, email, name, phone, role, permissions, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    const userData: AdminUser = {
      id: user.id,
      email: user.email,
      phone: user.phone || '',
      name: user.name || user.email.split('@')[0],
      role: user.role,
      permissions: user.permissions || ['read', 'write'],
      created_at: user.created_at
    };

    res.json({
      success: true,
      user: userData
    });

  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateAdminProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { name, phone } = req.body;

    const result = await pool.query(
      'UPDATE users SET name = $1, phone = $2 WHERE id = $3 RETURNING id, email, name, phone, role, permissions, created_at',
      [name, phone, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    const userData: AdminUser = {
      id: user.id,
      email: user.email,
      phone: user.phone || '',
      name: user.name || user.email.split('@')[0],
      role: user.role,
      permissions: user.permissions || ['read', 'write'],
      created_at: user.created_at
    };

    res.json({
      success: true,
      user: userData
    });

  } catch (error) {
    console.error('Update admin profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 