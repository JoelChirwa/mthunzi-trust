import express from 'express';
import {
  createBlog,
  getBlogs,
  getBlogBySlug,
  getBlogById,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getBlogs)
  .post(protect, createBlog);

router.route('/id/:id')
  .get(getBlogById);

router.route('/:slug')
  .get(getBlogBySlug);

router.route('/:id')
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

export default router;
