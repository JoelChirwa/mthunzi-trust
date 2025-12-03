import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    name: {
      type: String,
      trim: true,
    },
    preferences: {
      jobPostings: {
        type: Boolean,
        default: true,
      },
      blogUpdates: {
        type: Boolean,
        default: true,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    unsubscribeToken: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
subscriberSchema.index({ isActive: 1 });

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

export default Subscriber;
