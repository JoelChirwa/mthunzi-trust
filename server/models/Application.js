import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  vacancy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vacancy',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  location: {
    type: String,
  },
  coverLetter: {
    type: String, // Path to file
    required: true,
  },
  cv: {
    type: String, // Path to file
    required: true,
  },
  certificates: {
    type: [String], // Array of paths
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one certificate is required'
    }
  },
}, {
  timestamps: true,
});

// Ensures one application per vacancy per email
applicationSchema.index({ vacancy: 1, email: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application;
