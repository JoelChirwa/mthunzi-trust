import express from 'express';
import {
  createPartner,
  getPartners,
  getPartnerById,
  updatePartner,
  deletePartner,
} from '../controllers/partnerController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getPartners)
  .post(protect, createPartner);

router.route('/:id')
  .get(getPartnerById)
  .put(protect, updatePartner)
  .delete(protect, deletePartner);

export default router;
