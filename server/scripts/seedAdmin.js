import mongoose from 'mongoose';
import User from '../models/User.js';
import { ENV } from '../config/env.js';
import { connectDB } from '../config/db.js';

const seedAdmin = async () => {
  try {
    // Connect to database
    await connectDB();

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'mthunzitrust.mw@gmail.com' });

    if (adminExists) {
      console.log('⚠️  Admin user already exists!');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'mthunzitrust.mw@gmail.com',
      password: 'trust1', // Change this in production!
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: mthunzitrust.mw@gmail.com');
    console.log('🔑 Password: trust1');
    console.log('⚠️  Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
