import express from 'express';
import multer from 'multer';
import path from 'path';
import { auth } from '../middleware/auth';
import { pool } from '../config/database';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
    }
  },
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
const dir = 'uploads';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Upload single file
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    await pool.query(
      'INSERT INTO files (user_id, filename, mimetype, size) VALUES ($1, $2, $3, $4)',
      [req.user.id, req.file.filename, req.file.mimetype, req.file.size]
    );

    res.json({
      message: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Get user's files
router.get('/files', auth, async (req, res) => {
  try {
    const files = await pool.query(
      'SELECT filename, mimetype, size, created_at FROM files WHERE user_id = $1',
      [req.user.id]
    );

    res.json(files.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// Delete file
router.delete('/files/:filename', auth, async (req, res) => {
  try {
    const { filename } = req.params;

    // Delete from database
    await pool.query(
      'DELETE FROM files WHERE user_id = $1 AND filename = $2',
      [req.user.id, filename]
    );

    // Delete from filesystem
    const filePath = path.join(__dirname, '../uploads', filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

export default router;
