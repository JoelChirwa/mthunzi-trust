import mongoose from 'mongoose';

const programSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    features: [{
      type: String,
      trim: true,
    }],
    image: {
      type: String, // Path to image
      required: [true, 'Image is required'],
    },
    color: {
      type: String,
      default: 'from-teal-500 to-teal-600', // Default gradient
    },
    bgColor: {
      type: String,
      default: 'bg-teal-50', // Default background
    },
    order: {
      type: Number,
      default: 0, // For sorting
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Program = mongoose.model('Program', programSchema);

export default Program;
