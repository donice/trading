import nodemailer from 'nodemailer';

// Create transporter with proper configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  // Add these for better reliability
  pool: true,
  maxConnections: 1,
  rateDelta: 20000, // 20 seconds gap between emails
  rateLimit: 5 // max 5 emails per rateDelta
});

export async function sendPasswordResetEmail(email: string, token: string) {
  // Verify transporter is ready
  await transporter.verify((error) => {
    if (error) {
      console.error('Transporter verification failed:', error);
      throw new Error('Mail service unavailable');
    }
  });

  const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

  const mailOptions = {
    from: `"XM Assets" <${process.env.GMAIL_USER}>`, // Ensure proper formatting
    to: email,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Password Reset</h2>
        <p>You requested a password reset for your XM Assets account.</p>
        <p>Click the link below to reset your password (valid for 1 hour):</p>
        <p>
          <a href="${resetLink}"
             style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 4px;">
            Reset Password
          </a>
        </p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="font-size: 12px; color: #6b7280;">
          © ${new Date().getFullYear()} XM Assets. All rights reserved.
        </p>
      </div>
    `,
    // Add text version for better deliverability
    text: `Password Reset Link: ${resetLink}`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`, info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}