import path from 'path';
import fs from 'fs';
import Application from '../models/Application.js';
import Vacancy from '../models/Vacancy.js';
import transporter from '../config/email.js';
import { adminApplicationNotification, applicantConfirmationEmail } from '../config/emailTemplates.js';

// Create application (multipart/form-data)
export const createApplication = async (req, res) => {
  try {
    const { vacancy, name, email, phone, dob, location } = req.body;

    if (!vacancy || !name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Check vacancy exists
    const vac = await Vacancy.findById(vacancy);
    if (!vac) {
      return res.status(404).json({ success: false, message: 'Vacancy not found' });
    }

    // Prevent duplicate application per vacancy per email
    const existing = await Application.findOne({ vacancy, email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'You have already applied for this vacancy' });
    }

    // Handle files
    const files = req.files || {};
    
    const cvPath = files.cv ? `/${files.cv[0].path.replace(/\\/g, '/')}` : null;
    const coverLetterPath = files.coverLetter ? `/${files.coverLetter[0].path.replace(/\\/g, '/')}` : null;
    
    const certificatePaths = files.certificates 
      ? files.certificates.map(file => `/${file.path.replace(/\\/g, '/')}`)
      : [];

    if (!cvPath) {
      return res.status(400).json({ success: false, message: 'CV is required' });
    }
    
    if (!coverLetterPath) {
      return res.status(400).json({ success: false, message: 'Cover Letter is required' });
    }
    
    if (certificatePaths.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one certificate is required' });
    }

    const application = await Application.create({
      vacancy,
      name,
      email,
      phone,
      dob: dob ? new Date(dob) : undefined,
      location,
      coverLetter: coverLetterPath,
      cv: cvPath,
      certificates: certificatePaths,
    });

    // Send email notifications
    try {
      const applicationData = {
        name,
        email,
        phone,
        dob,
        location,
        vacancy: vac, // Include vacancy details
      };

      // Send admin notification
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: `New Application: ${vac.title}`,
        html: adminApplicationNotification(applicationData),
      });

      // Send applicant confirmation
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Application Received - Mthunzi Trust',
        html: applicantConfirmationEmail(applicationData),
      });

      console.log(`✓ Application emails sent for ${name}`);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Still return success since application was saved
    }

    res.status(201).json({ success: true, application });
  } catch (error) {
    // Duplicate key (unique index)
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Duplicate application' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getApplications = async (req, res) => {
  try {
    const { vacancy } = req.query;
    const filter = {};
    if (vacancy) filter.vacancy = vacancy;

    const applications = await Application.find(filter).populate('vacancy', 'title');
    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('vacancy', 'title');
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });

    // Helper to delete file
    const deleteFile = (relativePath) => {
      if (!relativePath) return;
      const filePath = path.join(process.cwd(), relativePath.replace(/^\//, '').trim());
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (err) {
        console.error(`Failed to delete file: ${filePath}`, err);
      }
    };

    // Delete all associated files
    deleteFile(application.cv);
    deleteFile(application.coverLetter);
    if (application.certificates && application.certificates.length > 0) {
      application.certificates.forEach(cert => deleteFile(cert));
    }

    await application.deleteOne();
    res.json({ success: true, message: 'Application removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
