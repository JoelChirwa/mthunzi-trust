import Subscriber from '../models/Subscriber.js';
import transporter from '../config/email.js';
import { subscriptionWelcomeEmail } from '../config/emailTemplates.js';
import crypto from 'crypto';

// Subscribe to newsletter
export const subscribe = async (req, res) => {
  try {
    const { email, name, jobPostings = true, blogUpdates = true } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      if (existing.isActive) {
        return res.status(400).json({ success: false, message: 'Email is already subscribed' });
      } else {
        // Reactivate subscription
        existing.isActive = true;
        existing.preferences.jobPostings = jobPostings;
        existing.preferences.blogUpdates = blogUpdates;
        if (name) existing.name = name;
        await existing.save();

        return res.json({ success: true, message: 'Subscription reactivated successfully' });
      }
    }

    // Generate unsubscribe token
    const unsubscribeToken = crypto.randomBytes(32).toString('hex');

    // Create new subscriber
    const subscriber = await Subscriber.create({
      email,
      name,
      preferences: {
        jobPostings,
        blogUpdates,
      },
      unsubscribeToken,
    });

    // Send welcome email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Welcome to Mthunzi Trust Updates',
        html: subscriptionWelcomeEmail({ name, email, unsubscribeToken }),
      });

      console.log(`✓ Welcome email sent to ${email}`);
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
      // Still return success since subscription was saved
    }

    res.status(201).json({ 
      success: true, 
      message: 'Successfully subscribed! Check your email for confirmation.' 
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Unsubscribe from newsletter
export const unsubscribe = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ success: false, message: 'Unsubscribe token is required' });
    }

    const subscriber = await Subscriber.findOne({ unsubscribeToken: token });
    if (!subscriber) {
      return res.status(404).json({ success: false, message: 'Subscriber not found' });
    }

    subscriber.isActive = false;
    await subscriber.save();

    res.json({ success: true, message: 'Successfully unsubscribed from all updates' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all subscribers (Admin only)
export const getAllSubscribers = async (req, res) => {
  try {
    const { active } = req.query;
    const filter = {};
    
    if (active !== undefined) {
      filter.isActive = active === 'true';
    }

    const subscribers = await Subscriber.find(filter).sort({ createdAt: -1 });
    
    res.json({ 
      success: true, 
      count: subscribers.length,
      subscribers 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete subscriber (Admin only)
export const deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    
    if (!subscriber) {
      return res.status(404).json({ success: false, message: 'Subscriber not found' });
    }

    await subscriber.deleteOne();
    res.json({ success: true, message: 'Subscriber deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
