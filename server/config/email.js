import nodemailer from 'nodemailer';

const emailConfig = {
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  // Add timeout settings
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,   // 10 seconds
  socketTimeout: 10000,     // 10 seconds
  debug: true,              // Enable debug output
  logger: true              // Log information to console
};

// Log configuration (hide password)
console.log('Email Configuration:', {
  ...emailConfig,
  auth: {
    ...emailConfig.auth,
    pass: '****'
  }
});

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport(emailConfig);

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('✓ Email server is ready to send messages');
  }
});

export default transporter;
