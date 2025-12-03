import Contact from '../models/Contact.js';
import transporter from '../config/email.js';
import { adminNotificationEmail, userConfirmationEmail } from '../config/emailTemplates.js';

// Submit contact form
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Get IP address
    const ipAddress = req.ip || req.connection.remoteAddress;

    // Create contact record
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      ipAddress,
    });

    // Send email notifications
    try {
      // Send notification to admin
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form Submission: ${subject}`,
        html: adminNotificationEmail({ name, email, phone, subject, message }),
      });

      // Send confirmation to user
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Thank you for contacting Mthunzi Trust',
        html: userConfirmationEmail({ name, email, phone, subject, message }),
      });

      console.log('✓ Contact form emails sent successfully');
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the request if email fails, but log it
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
      },
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while submitting your message. Please try again later.',
      error: error.message,
    });
  }
};

// Get all contacts (Admin only)
export const getAllContacts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      search,
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    // Build query
    const query = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;
    const sortOrder = order === 'asc' ? 1 : -1;

    const contacts = await Contact.find(query)
      .sort({ [sortBy]: sortOrder })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: error.message,
    });
  }
};

// Get single contact (Admin only)
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    // Mark as read if it's new
    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact',
      error: error.message,
    });
  }
};

// Update contact status (Admin only)
export const updateContactStatus = async (req, res) => {
  try {
    const { status, replied } = req.body;
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    if (status) contact.status = status;
    if (replied !== undefined) {
      contact.replied = replied;
      if (replied) contact.repliedAt = new Date();
    }

    await contact.save();

    res.status(200).json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact,
    });
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status',
      error: error.message,
    });
  }
};

// Delete contact (Admin only)
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
      error: error.message,
    });
  }
};

// Get contact statistics (Admin only)
export const getContactStats = async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const readContacts = await Contact.countDocuments({ status: 'read' });
    const repliedContacts = await Contact.countDocuments({ status: 'replied' });
    const archivedContacts = await Contact.countDocuments({ status: 'archived' });

    // Get recent contacts
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject status createdAt');

    res.status(200).json({
      success: true,
      data: {
        total: totalContacts,
        new: newContacts,
        read: readContacts,
        replied: repliedContacts,
        archived: archivedContacts,
        recent: recentContacts,
      },
    });
  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact statistics',
      error: error.message,
    });
  }
};
