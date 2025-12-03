import express from 'express';
import { 
  getPrograms, 
  getAllProgramsAdmin, 
  getProgram, 
  createProgram, 
  updateProgram, 
  deleteProgram 
} from '../controllers/programController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer config for image upload
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `program-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp|avif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Public routes
router.get('/', getPrograms);
router.get('/:id', getProgram);

// Admin routes
router.get('/admin/all', protect, adminOnly, getAllProgramsAdmin);
router.post('/', protect, adminOnly, upload.single('image'), createProgram);
router.put('/:id', protect, adminOnly, upload.single('image'), updateProgram);
router.delete('/:id', protect, adminOnly, deleteProgram);

export default router;
