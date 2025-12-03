import express from 'express';
import {
  createTeamMember,
  getTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
} from '../controllers/teamController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getTeamMembers)
  .post(protect, createTeamMember);

router.route('/:id')
  .get(getTeamMemberById)
  .put(protect, updateTeamMember)
  .delete(protect, deleteTeamMember);

export default router;
