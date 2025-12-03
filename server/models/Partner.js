import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  logo: {
    type: String,
    default: ''
  },
  description: {
    type: String
  },
  website: {
    type: String,
    trim: true
  },
  partnershipType: {
    type: String,
    enum: ['Strategic', 'Financial', 'Technical', 'Community', 'Other'],
    default: 'Other'
  },
  startDate: {
    type: Date
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Partner = mongoose.model('Partner', partnerSchema);

export default Partner;
