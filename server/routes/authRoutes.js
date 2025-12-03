import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  verifyToken
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.post('/verify', protect, verifyToken);

export default router;
