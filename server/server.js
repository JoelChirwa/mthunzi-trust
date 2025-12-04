import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import fs from 'fs';

// Import routes
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import programRoutes from './routes/programRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';
import vacancyRoutes from './routes/vacancyRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
const uploadsDir = path.join(__dirname, 'uploads');

// Debug logging for uploads directory
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log(`✓ Created uploads directory at: ${uploadsDir}`);
} else {
  console.log(`✓ Uploads directory exists at: ${uploadsDir}`);
  try {
    const files = fs.readdirSync(uploadsDir);
    console.log(`✓ Found ${files.length} files in uploads directory`);
  } catch (err) {
    console.error('❌ Error reading uploads directory:', err);
  }
}

// Serve uploads with logging
app.use('/uploads', (req, res, next) => {
  console.log(`📤 Request for upload: ${req.url}`);
  next();
}, express.static(uploadsDir));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/vacancies', vacancyRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/upload', uploadRoutes);

// make the app ready for deployment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  connectDB();
});