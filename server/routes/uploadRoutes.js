import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mthunzi-trust', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 2000, height: 2000, crop: 'limit' }], // Max dimensions
  },
});

const upload = multer({ storage });

// Upload endpoint
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({
      message: 'No file uploaded',
    });
  }

  // Cloudinary automatically uploads and returns the URL
  const imageUrl = req.file.path; // This is the Cloudinary URL
  console.log(`✓ Image uploaded to Cloudinary: ${imageUrl}`);

  res.send({
    message: 'Image uploaded successfully',
    image: imageUrl,
  });
});

export default router;
