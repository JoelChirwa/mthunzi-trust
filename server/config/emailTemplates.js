// Admin notification email template
export const adminNotificationEmail = (contactData) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #0d9488 0%, #2563eb 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 30px;
        }
        .field {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e5e7eb;
        }
        .field:last-child {
          border-bottom: none;
        }
        .field-label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 5px;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .field-value {
          color: #1f2937;
          font-size: 16px;
          margin-top: 5px;
        }
        .message-box {
          background-color: #f9fafb;
          padding: 15px;
          border-left: 4px solid #0d9488;
          border-radius: 4px;
          margin-top: 10px;
        }
        .footer {
          background-color: #f9fafb;
          padding: 20px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }
        .timestamp {
          color: #6b7280;
          font-size: 14px;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 New Contact Form Submission</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="field-label">Name</div>
            <div class="field-value">${contactData.name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email</div>
            <div class="field-value">
              <a href="mailto:${contactData.email}" style="color: #0d9488; text-decoration: none;">
                ${contactData.email}
              </a>
            </div>
          </div>
          
          ${
            contactData.phone
              ? `
          <div class="field">
            <div class="field-label">Phone</div>
            <div class="field-value">${contactData.phone}</div>
          </div>
          `
              : ''
          }
          
          <div class="field">
            <div class="field-label">Subject</div>
            <div class="field-value">${contactData.subject}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Message</div>
            <div class="message-box">
              ${contactData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div class="timestamp">
            Received: ${new Date().toLocaleString('en-US', { 
              dateStyle: 'full', 
              timeStyle: 'long' 
            })}
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from the Mthunzi Trust contact form.</p>
          <p>&copy; ${new Date().getFullYear()} Mthunzi Trust. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// User confirmation email template
export const userConfirmationEmail = (contactData) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting Us</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #0d9488 0%, #2563eb 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0 0 10px 0;
          font-size: 28px;
          font-weight: 600;
        }
        .header p {
          margin: 0;
          opacity: 0.9;
          font-size: 16px;
        }
        .content {
          padding: 40px 30px;
        }
        .greeting {
          font-size: 18px;
          color: #1f2937;
          margin-bottom: 20px;
        }
        .message {
          color: #4b5563;
          line-height: 1.8;
          margin-bottom: 25px;
        }
        .summary-box {
          background-color: #f0fdfa;
          border: 1px solid #5eead4;
          border-radius: 8px;
          padding: 20px;
          margin: 25px 0;
        }
        .summary-title {
          font-weight: 600;
          color: #0f766e;
          margin-bottom: 15px;
          font-size: 16px;
        }
        .summary-item {
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #ccfbf1;
        }
        .summary-item:last-child {
          border-bottom: none;
        }
        .summary-label {
          font-weight: 600;
          color: #0f766e;
          font-size: 14px;
        }
        .summary-value {
          color: #134e4a;
          margin-top: 3px;
        }
        .cta {
          text-align: center;
          margin: 30px 0;
        }
        .button {
          display: inline-block;
          padding: 14px 30px;
          background: linear-gradient(135deg, #0d9488 0%, #2563eb 100%);
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .contact-info {
          background-color: #f9fafb;
          padding: 20px;
          border-radius: 6px;
          margin-top: 25px;
        }
        .contact-info h3 {
          margin-top: 0;
          color: #1f2937;
          font-size: 16px;
        }
        .contact-info p {
          margin: 8px 0;
          color: #4b5563;
          font-size: 14px;
        }
        .footer {
          background-color: #f9fafb;
          padding: 25px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }
        .footer p {
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✨ Thank You for Reaching Out!</h1>
          <p>We've received your message</p>
        </div>
        <div class="content">
          <div class="greeting">
            Dear ${contactData.name},
          </div>
          
          <div class="message">
            <p>Thank you for contacting Mthunzi Trust! We truly appreciate you taking the time to reach out to us.</p>
            
            <p>We have successfully received your message and our team will review it carefully. We typically respond within 24-48 hours during business days.</p>
          </div>
          
          <div class="summary-box">
            <div class="summary-title">📋 Your Message Summary</div>
            
            <div class="summary-item">
              <div class="summary-label">Subject:</div>
              <div class="summary-value">${contactData.subject}</div>
            </div>
            
            <div class="summary-item">
              <div class="summary-label">Your Message:</div>
              <div class="summary-value">${contactData.message.substring(0, 200)}${contactData.message.length > 200 ? '...' : ''}</div>
            </div>
            
            <div class="summary-item">
              <div class="summary-label">Submitted on:</div>
              <div class="summary-value">${new Date().toLocaleString('en-US', { 
                dateStyle: 'full', 
                timeStyle: 'short' 
              })}</div>
            </div>
          </div>
          
          <div class="message">
            <p>In the meantime, feel free to explore our website to learn more about our programs and initiatives making a difference in communities across Malawi.</p>
          </div>
          
          <div class="cta">
            <a href="https://www.mthunzitrust.org" class="button">Visit Our Website</a>
          </div>
          
          <div class="contact-info">
            <h3>Need immediate assistance?</h3>
            <p><strong>Email:</strong> info@mthunzitrust.org</p>
            <p><strong>Phone:</strong> +265 XXX XXX XXX</p>
            <p><strong>Office Hours:</strong> Monday - Friday: 8:00 AM - 5:00 PM</p>
          </div>
        </div>
        <div class="footer">
          <p><strong>Mthunzi Trust</strong></p>
          <p>Mulanje District, Southern Region, Malawi</p>
          <p>&copy; ${new Date().getFullYear()} Mthunzi Trust. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

//============================================
// APPLICATION EMAIL TEMPLATES
//============================================

// Admin notification for new job application
export const adminApplicationNotification = (applicationData) => {
  const { name, email, phone, vacancy, dob, location } = applicationData;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Job Application Received</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 30px;
        }
        .field {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e5e7eb;
        }
        .field:last-child {
          border-bottom: none;
        }
        .field-label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 5px;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .field-value {
          color: #1f2937;
          font-size: 16px;
          margin-top: 5px;
        }
        .files-box {
          background-color: #f0f9ff;
          padding: 15px;
          border-left: 4px solid #3b82f6;
          border-radius: 4px;
          margin-top: 10px;
        }
        .footer {
          background-color: #f9fafb;
          padding: 20px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }
        .timestamp {
          color: #6b7280;
          font-size: 14px;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💼 New Job Application Received</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="field-label">Vacancy</div>
            <div class="field-value">${vacancy?.title || 'N/A'} - ${vacancy?.location || ''}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Applicant Name</div>
            <div class="field-value">${name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email</div>
            <div class="field-value">
              <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">
                ${email}
              </a>
            </div>
          </div>
          
          <div class="field">
            <div class="field-label">Phone</div>
            <div class="field-value">${phone}</div>
          </div>
          
          ${dob ? `
          <div class="field">
            <div class="field-label">Date of Birth</div>
            <div class="field-value">${new Date(dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
          ` : ''}
          
          ${location ? `
          <div class="field">
            <div class="field-label">Location</div>
            <div class="field-value">${location}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="field-label">Attached Documents</div>
            <div class="files-box">
              ✅ CV<br>
              ✅ Cover Letter<br>
              ✅ Certificate(s)
            </div>
          </div>
          
          <div class="timestamp">
            Received: ${new Date().toLocaleString('en-US', { 
              dateStyle: 'full', 
              timeStyle: 'long' 
            })}
          </div>
        </div>
        <div class="footer">
          <p>This application was submitted through the Mthunzi Trust careers portal.</p>
          <p>&copy; ${new Date().getFullYear()} Mthunzi Trust. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Applicant confirmation email
export const applicantConfirmationEmail = (applicationData) => {
  const { name, vacancy } = applicationData;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Received</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0 0 10px 0;
          font-size: 28px;
          font-weight: 600;
        }
        .header p {
          margin: 0;
          opacity: 0.9;
          font-size: 16px;
        }
        .content {
          padding: 40px 30px;
        }
        .greeting {
          font-size: 18px;
          color: #1f2937;
          margin-bottom: 20px;
        }
        .message {
          color: #4b5563;
          line-height: 1.8;
          margin-bottom: 25px;
        }
        .highlight-box {
          background-color: #ede9fe;
          border: 1px solid #a78bfa;
          border-radius: 8px;
          padding: 20px;
          margin: 25px 0;
          text-align: center;
        }
        .highlight-box h3 {
          color: #6d28d9;
          margin: 0 0 10px 0;
        }
        .highlight-box p {
          color: #5b21b6;
          margin: 5px 0;
          font-weight: 500;
        }
        .footer {
          background-color: #f9fafb;
          padding: 25px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }
        .footer p {
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Application Received!</h1>
          <p>Thank you for applying</p>
        </div>
        <div class="content">
          <div class="greeting">
            Dear ${name},
          </div>
          
          <div class="message">
            <p>Thank you for your interest in joining the Mthunzi Trust team! We are delighted to confirm that we have successfully received your application.</p>
          </div>
          
          <div class="highlight-box">
            <h3>Position Applied For</h3>
            <p>${vacancy?.title || 'Position'}</p>
            <p style="font-size: 14px; font-weight: normal;">${vacancy?.location || ''}</p>
          </div>
          
          <div class="message">
            <p><strong>What happens next?</strong></p>
            <p>Our recruitment team will carefully review your application along with all other submissions. If your qualifications match our requirements, we will contact you within 2-3 weeks to discuss the next steps.</p>
            
            <p>Please note that due to the high volume of applications we receive, we may only be able to contact shortlisted candidates.</p>
            
            <p>We appreciate your patience and interest in contributing to our mission of transforming communities across Malawi.</p>
            
            <p style="margin-top: 25px;">Best regards,<br>
            <strong>The Mthunzi Trust Team</strong></p>
          </div>
        </div>
        <div class="footer">
          <p><strong>Mthunzi Trust</strong></p>
          <p>Lilongwe & Blantyre, Malawi</p>
          <p>&copy; ${new Date().getFullYear()} Mthunzi Trust. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

//============================================
// SUBSCRIPTION EMAIL TEMPLATES
//============================================

// Welcome email for new subscribers
export const subscriptionWelcomeEmail = (subscriberData) => {
  const { name, email, unsubscribeToken } = subscriberData;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Mthunzi Trust Updates</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #0d9488 0%, #2563eb 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0 0 10px 0;
          font-size: 28px;
          font-weight: 600;
        }
        .content {
          padding: 40px 30px;
        }
        .greeting {
          font-size: 18px;
          color: #1f2937;
          margin-bottom: 20px;
        }
        .message {
          color: #4b5563;
          line-height: 1.8;
          margin-bottom: 25px;
        }
        .features {
          background-color: #f0fdfa;
          border-left: 4px solid #0d9488;
          padding: 20px;
          margin: 25px 0;
          border-radius: 4px;
        }
        .features h3 {
          margin-top: 0;
          color: #0f766e;
        }
        .features ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        .features li {
          margin: 8px 0;
          color: #134e4a;
        }
        .footer {
          background-color: #f9fafb;
          padding: 25px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }
        .footer a {
          color: #0d9488;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to Our Community!</h1>
        </div>
        <div class="content">
          <div class="greeting">
            ${name ? `Dear ${name},` : 'Hello,'}
          </div>
          
          <div class="message">
            <p>Thank you for subscribing to Mthunzi Trust updates! We're excited to have you join our community of changemakers.</p>
            
            <p>You'll now receive notifications about:</p>
          </div>
          
          <div class="features">
            <h3>What to Expect:</h3>
            <ul>
              <li>🆕 <strong>New Job Postings</strong> - Be the first to know when we have career opportunities</li>
              <li>📰 <strong>Blog Updates</strong> - Stay informed about our programs, impact stories, and community initiatives</li>
              <li>🌍 <strong>Important Announcements</strong> - Get updates about events and important news</li>
            </ul>
          </div>
          
          <div class="message">
            <p>We respect your inbox and will only send you meaningful updates. You can manage your preferences or unsubscribe at any time.</p>
            
            <p>Thank you for supporting our mission to transform communities across Malawi!</p>
            
            <p style="margin-top: 25px;">Best regards,<br>
            <strong>The Mthunzi Trust Team</strong></p>
          </div>
        </div>
        <div class="footer">
          <p><strong>Mthunzi Trust</strong></p>
          <p>Lilongwe & Blantyre, Malawi</p>
          <p><a href="https://www.mthunzitrust.org/unsubscribe?token=${unsubscribeToken}">Unsubscribe</a></p>
          <p>&copy; ${new Date().getFullYear()} Mthunzi Trust. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Email notification for new blog post
export const newBlogNotificationEmail = (blogData, unsubscribeToken) => {
  const { title, excerpt, slug, author, coverImage } = blogData;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Blog Post - ${title}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #0d9488 0%, #2563eb 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 30px;
        }
        .blog-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .blog-title {
          font-size: 24px;
          font-weight: bold;
          color: #1f2937;
          margin: 20px 0 15px 0;
        }
        .blog-excerpt {
          color: #4b5563;
          line-height: 1.8;
          margin-bottom: 25px;
        }
        .cta-button {
          display: inline-block;
          padding: 14px 30px;
          background: linear-gradient(135deg, #0d9488 0%, #2563eb 100%);
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          margin: 20px 0;
        }
        .footer {
          background-color: #f9fafb;
          padding: 25px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }
        .footer a {
          color: #0d9488;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📰 New Blog Post from Mthunzi Trust</h1>
        </div>
        <div class="content">
          ${coverImage ? `<img src="${coverImage}" alt="${title}" class="blog-image" />` : ''}
          
          <div class="blog-title">${title}</div>
          
          <div class="blog-excerpt">
            ${excerpt || 'Read our latest update!'}
          </div>
          
          ${author ? `<p style="color: #6b7280; font-size: 14px;">By ${author}</p>` : ''}
          
          <a href="https://www.mthunzitrust.org/blogs/${slug}" class="cta-button">Read Full Article</a>
        </div>
        <div class="footer">
          <p><strong>Mthunzi Trust</strong></p>
          <p><a href="https://www.mthunzitrust.org/unsubscribe?token=${unsubscribeToken}">Unsubscribe</a> | <a href="https://www.mthunzitrust.org">Visit Website</a></p>
          <p>&copy; ${new Date().getFullYear()} Mthunzi Trust. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Email notification for new job posting
export const newJobNotificationEmail = (jobData, unsubscribeToken) => {
  const { title, location, type, deadline, description } = jobData;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Job Opening - ${title}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 30px;
        }
        .job-title {
          font-size: 26px;
          font-weight: bold;
          color: #1f2937;
          margin: 20px 0 15px 0;
        }
        .job-details {
          background-color: #f0f9ff;
          border-left: 4px solid #3b82f6;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .job-details p {
          margin: 8px 0;
          color: #1e40af;
        }
        .job-description {
          color: #4b5563;
          line-height: 1.8;
          margin-bottom: 25px;
        }
        .cta-button {
          display: inline-block;
          padding: 14px 30px;
          background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          margin: 20px 0;
        }
        .footer {
          background-color: #f9fafb;
          padding: 25px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }
        .footer a {
          color: #0d9488;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💼 New Career Opportunity!</h1>
        </div>
        <div class="content">
          <div class="job-title">${title}</div>
          
          <div class="job-details">
            ${location ? `<p>📍 <strong>Location:</strong> ${location}</p>` : ''}
            ${type ? `<p>💼 <strong>Type:</strong> ${type}</p>` : ''}
            ${deadline ? `<p>⏰ <strong>Deadline:</strong> ${new Date(deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>` : ''}
          </div>
          
          <div class="job-description">
            ${description ? description.substring(0, 300) + '...' : 'A new career opportunity is now available at Mthunzi Trust.'}
          </div>
          
          <a href="https://www.mthunzitrust.org/vacancies" class="cta-button">View & Apply Now</a>
          
          <p style="color: #6b7280; margin-top: 30px; font-size: 14px;">
            Don't miss this opportunity to join our team and make a difference in communities across Malawi!
          </p>
        </div>
        <div class="footer">
          <p><strong>Mthunzi Trust</strong></p>
          <p><a href="https://www.mthunzitrust.org/unsubscribe?token=${unsubscribeToken}">Unsubscribe</a> | <a href="https://www.mthunzitrust.org">Visit Website</a></p>
          <p>&copy; ${new Date().getFullYear()} Mthunzi Trust. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
