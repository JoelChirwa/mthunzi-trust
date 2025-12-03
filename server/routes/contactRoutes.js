import express from 'express';
import {
  submitContactForm,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getContactStats,
} from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public route - Submit contact form
router.post('/submit', submitContactForm);

// Admin routes - Protected
router.get('/', protect, adminOnly, getAllContacts);
router.get('/stats', protect, adminOnly, getContactStats);
router.get('/:id', protect, adminOnly, getContactById);
router.put('/:id/status', protect, adminOnly, updateContactStatus);
router.delete('/:id', protect, adminOnly, deleteContact);

export default router;
