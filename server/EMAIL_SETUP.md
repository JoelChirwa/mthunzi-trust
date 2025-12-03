# Email Configuration Guide

This guide will help you set up email notifications for the contact form.

## 📧 Email Features

- **User Confirmation Emails**: Automatic confirmation email sent to users when they submit the contact form
- **Admin Notifications**: Email alerts sent to administrators when new messages are received
- **Professional Templates**: Beautiful, responsive HTML email templates
- **Database Storage**: All messages are stored in MongoDB for tracking and management
- **Admin Dashboard**: View, filter, and manage all contact submissions

## 🔧 Setup Instructions

### Step 1: Choose Your Email Provider

The system works with any SMTP email provider. Common options:

- **Gmail** (Recommended for testing)
- **SendGrid** (Recommended for production)
- **Mailgun**
- **AWS SES**
- **Custom SMTP server**

### Step 2: Gmail Configuration (For Testing)

If you're using Gmail:

1. **Enable 2-Factor Authentication** on your Google account

   - Go to: https://myaccount.google.com/security

2. **Generate an App Password**

   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password

3. **Update your `.env` file**:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   EMAIL_FROM=Mthunzi Trust <noreply@mthunzitrust.org>
   ADMIN_EMAIL=info@mthunzitrust.org
   ```

### Step 3: SendGrid Configuration (For Production)

SendGrid is recommended for production as it's more reliable and has better deliverability.

1. **Sign up for SendGrid**

   - Visit: https://sendgrid.com
   - Free tier: 100 emails/day

2. **Create an API Key**

   - Go to Settings → API Keys
   - Create a new API key with "Mail Send" permissions

3. **Update your `.env` file**:
   ```env
   EMAIL_HOST=smtp.sendgrid.net
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=apikey
   EMAIL_PASSWORD=your-sendgrid-api-key
   EMAIL_FROM=Mthunzi Trust <noreply@mthunzitrust.org>
   ADMIN_EMAIL=info@mthunzitrust.org
   ```

### Step 4: Other SMTP Providers

For other providers, you'll need:

- SMTP Host
- SMTP Port (usually 587 or 465)
- Username
- Password/API Key

Update your `.env` file with these values.

## 📝 Environment Variables

| Variable         | Description                     | Example                       |
| ---------------- | ------------------------------- | ----------------------------- |
| `EMAIL_HOST`     | SMTP server hostname            | `smtp.gmail.com`              |
| `EMAIL_PORT`     | SMTP server port                | `587`                         |
| `EMAIL_SECURE`   | Use SSL/TLS (true for port 465) | `false`                       |
| `EMAIL_USER`     | SMTP username/email             | `your@email.com`              |
| `EMAIL_PASSWORD` | SMTP password/API key           | `your-password`               |
| `EMAIL_FROM`     | Sender name and email           | `Org Name <no-reply@org.com>` |
| `ADMIN_EMAIL`    | Admin email for notifications   | `admin@org.com`               |

## 🧪 Testing Email Configuration

1. **Start the server**:

   ```bash
   cd server
   npm run dev
   ```

2. **Check the console** for the message:

   ```
   ✓ Email server is ready to send messages
   ```

3. **Test the contact form**:
   - Navigate to the contact page
   - Fill out and submit the form
   - Check both user and admin emails

## 📬 Email Templates

The system includes two professionally designed email templates:

### 1. User Confirmation Email

- Sent to the person who filled out the form
- Confirms their message was received
- Includes message summary
- Provides contact information
- Branded with organization logo and colors

### 2. Admin Notification Email

- Sent to the admin email address
- Contains all form details
- User's contact information
- Full message content
- Timestamp

## 🔐 Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use App Passwords** instead of regular passwords for Gmail
3. **Rotate credentials** regularly
4. **Use environment-specific configs** (different for dev/prod)
5. **Monitor email sending** for unusual activity

## 🎨 Customizing Email Templates

Email templates are located in:
`server/config/emailTemplates.js`

You can customize:

- Colors and branding
- Logo and images
- Text content
- Layout and structure

## 📊 Admin Dashboard

Access the contact management dashboard at:
`/admin/contacts`

Features:

- View all messages
- Filter by status (new, read, replied, archived)
- Search messages
- Mark as read/replied/archived
- Delete messages
- View statistics

## 🐛 Troubleshooting

### "Email configuration error" on startup

**Cause**: Invalid SMTP credentials or configuration

**Solutions**:

- Verify `.env` values are correct
- Check if 2FA is enabled (Gmail)
- Ensure App Password is generated (Gmail)
- Check firewall/network settings

### Emails not being received

**Possible causes**:

1. **Spam folder**: Check recipient's spam/junk folder
2. **Invalid sender**: Ensure `EMAIL_FROM` is properly formatted
3. **Rate limiting**: You may have hit provider limits
4. **DNS issues**: For custom domains, check SPF/DKIM records

### "Connection timeout" error

**Solutions**:

- Check `EMAIL_PORT` is correct (587 for TLS, 465 for SSL)
- Verify firewall allows outbound SMTP connections
- Try a different port or secure setting

## 📞 Support

If you encounter issues:

1. Check the server logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test with a different email provider
4. Check the email provider's documentation

## 🚀 Production Deployment

Before going to production:

1. **Switch to a production email service** (SendGrid, Mailgun, etc.)
2. **Set up SPF/DKIM records** for your domain
3. **Use environment variables** on your hosting platform
4. **Test thoroughly** with real email addresses
5. **Monitor email deliverability** and bounce rates
6. **Have a backup plan** for email delivery failures

## 📚 Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail SMTP Settings](https://support.google.com/mail/answer/7126229)
- [SendGrid Documentation](https://docs.sendgrid.com/)
- [Email Testing Tools](https://mailtrap.io/)
