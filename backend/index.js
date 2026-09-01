const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve React frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

const resend = new Resend(process.env.RESEND_API_KEY);

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Notification email to you
    const { error: notifyError } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `Portfolio Contact: Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #1e293b;">Message:</h3>
            <p style="line-height: 1.6; color: #475569;">${message}</p>
          </div>
        </div>
      `
    });

    if (notifyError) {
      console.error('Error sending notification email:', notifyError);
      return res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
    }

    // Confirmation email to the visitor — only works for real visitors once
    // you've verified your own domain in Resend. Until then this will
    // silently fail for anyone but your own Resend account email, so we
    // don't let it block the success response.
    const { error: confirmError } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Thanks for reaching out!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Thanks for contacting me, ${name}!</h2>
          <p style="line-height: 1.6; color: #475569;">
            I've received your message and will get back to you as soon as possible.
          </p>
          <p style="line-height: 1.6; color: #475569;">
            Best regards,<br>
            Andrew Park
          </p>
        </div>
      `
    });

    if (confirmError) {
      console.warn('Confirmation email not sent (expected until domain is verified):', confirmError);
    }

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Fallback: serve React frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});