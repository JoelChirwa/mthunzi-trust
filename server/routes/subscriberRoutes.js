import express from 'express';
import { subscribe, unsubscribe, getAllSubscribers, deleteSubscriber } from '../controllers/subscriberController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/subscribe', subscribe);
router.get('/unsubscribe', unsubscribe);

// Admin routes
router.get('/', protect, adminOnly, getAllSubscribers);
router.delete('/:id', protect, adminOnly, deleteSubscriber);

export default router;
