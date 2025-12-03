import Program from '../models/Program.js';
import fs from 'fs';
import path from 'path';

// Get all active programs (Public)
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, programs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all programs (Admin)
export const getAllProgramsAdmin = async (req, res) => {
  try {
    const programs = await Program.find({}).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, programs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single program
export const getProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    res.json({ success: true, program });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create program (Admin)
export const createProgram = async (req, res) => {
  try {
    const { title, description, features, color, bgColor, order, isActive } = req.body;
    
    let imagePath = '';
    if (req.file) {
      imagePath = `/${req.file.path.replace(/\\/g, '/')}`;
    } else {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    // Parse features if it's sent as a JSON string (from FormData)
    let parsedFeatures = [];
    if (typeof features === 'string') {
      try {
        parsedFeatures = JSON.parse(features);
      } catch (e) {
        // If not JSON, assume comma-separated or single string
        parsedFeatures = features.split(',').map(f => f.trim());
      }
    } else if (Array.isArray(features)) {
      parsedFeatures = features;
    }

    const program = await Program.create({
      title,
      description,
      features: parsedFeatures,
      image: imagePath,
      color,
      bgColor,
      order: order || 0,
      isActive: isActive === 'true' || isActive === true,
    });

    res.status(201).json({ success: true, program });
  } catch (error) {
    // Delete uploaded file if error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update program (Admin)
export const updateProgram = async (req, res) => {
  try {
    const { title, description, features, color, bgColor, order, isActive } = req.body;
    
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    if (title) program.title = title;
    if (description) program.description = description;
    if (color) program.color = color;
    if (bgColor) program.bgColor = bgColor;
    if (order !== undefined) program.order = order;
    if (isActive !== undefined) program.isActive = isActive === 'true' || isActive === true;

    if (features) {
      let parsedFeatures = [];
      if (typeof features === 'string') {
        try {
          parsedFeatures = JSON.parse(features);
        } catch (e) {
          parsedFeatures = features.split(',').map(f => f.trim());
        }
      } else if (Array.isArray(features)) {
        parsedFeatures = features;
      }
      program.features = parsedFeatures;
    }

    if (req.file) {
      // Delete old image
      if (program.image) {
        const oldPath = path.join(path.resolve(), program.image);
        if (fs.existsSync(oldPath)) {
          fs.unlink(oldPath, (err) => {
            if (err) console.error('Error deleting old image:', err);
          });
        }
      }
      program.image = `/${req.file.path.replace(/\\/g, '/')}`;
    }

    await program.save();
    res.json({ success: true, program });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete program (Admin)
export const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }

    // Delete image
    if (program.image) {
      const imagePath = path.join(path.resolve(), program.image);
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) console.error('Error deleting image:', err);
        });
      }
    }

    await program.deleteOne();
    res.json({ success: true, message: 'Program deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
