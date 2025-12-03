import express from 'express';
import multer from 'multer';
import path from 'path';
import { createApplication, getApplications, getApplicationById, deleteApplication } from '../controllers/applicationController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const prefix = file.fieldname === 'cv' ? 'cv' : file.fieldname === 'coverLetter' ? 'cl' : 'cert';
    cb(null, `${prefix}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb) {
  let filetypes;
  
  if (file.fieldname === 'certificates') {
    filetypes = /pdf|doc|docx|jpg|jpeg|png/;
  } else {
    // CV and Cover Letter (pdf/doc/docx only)
    filetypes = /pdf|doc|docx/;
  }

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    if (file.fieldname === 'certificates') {
      cb('Error: Certificates must be PDF, DOC, or Images');
    } else {
      cb(`Error: ${file.fieldname === 'cv' ? 'CV' : 'Cover Letter'} must be PDF or DOC`);
    }
  }
}

const upload = multer({ 
  storage, 
  fileFilter: function (req, file, cb) { 
    checkFileType(file, cb); 
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Public submit
router.post('/', upload.fields([
  { name: 'coverLetter', maxCount: 1 },
  { name: 'cv', maxCount: 1 },
  { name: 'certificates', maxCount: 10 }
]), createApplication);

// Admin routes
router.get('/', protect, adminOnly, getApplications);
router.get('/:id', protect, adminOnly, getApplicationById);
router.delete('/:id', protect, adminOnly, deleteApplication);

export default router;
