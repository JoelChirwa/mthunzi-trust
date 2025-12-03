import mongoose from 'mongoose';

const vacancySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Volunteer', 'Internship'],
    default: 'Full-time'
  },
  location: {
    type: String,
    default: 'Lilongwe, Malawi'
  },
  deadline: {
    type: Date
  },
  requirements: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Vacancy = mongoose.model('Vacancy', vacancySchema);

export default Vacancy;
