import express from 'express';
import {
  createVacancy,
  getVacancies,
  getVacancyById,
  updateVacancy,
  deleteVacancy,
} from '../controllers/vacancyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getVacancies)
  .post(protect, createVacancy);

router.route('/:id')
  .get(getVacancyById)
  .put(protect, updateVacancy)
  .delete(protect, deleteVacancy);

export default router;
