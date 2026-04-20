import nodemailer from "nodemailer";

/**
 * Sends an email using either console or SMTP based on environment configuration.
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content
 * @param {string} html - HTML content (optional)
 */
export const sendEmail = async (to, subject, text, html) => {
  const mode = process.env.EMAIL_SERVICE_MODE || "console";

  if (mode === "console") {
    console.log("=========================================");
    console.log(`[EMAIL SERVICE] Mode: CONSOLE`);
    console.log(`[EMAIL SERVICE] To: ${to}`);
    console.log(`[EMAIL SERVICE] Subject: ${subject}`);
    console.log(`[EMAIL SERVICE] Content: ${text}`);
    console.log("=========================================");
    return;
  }

  // SMTP Mode
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("[EMAIL SERVICE] SMTP Error: EMAIL_USER or EMAIL_PASS missing. Falling back to console.");
    console.log(`[FALLBACK] To: ${to} | Subject: ${subject} | Content: ${text}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.mailtrap.io",
    port: process.env.EMAIL_PORT || 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM || "SkillsSphere AI <no-reply@skillssphere.ai>",
    to,
    subject,
    text,
    html: html || text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[EMAIL SERVICE] SMTP: Email sent to ${to}`);
  } catch (error) {
    console.error(`[EMAIL SERVICE] SMTP Error: ${error.message}`);
    // Graceful failure as requested
  }
};

/**
 * Specialized function for sending OTPs
 */
export const sendOTP = async (email, otp, type) => {
  const subject = type === "verification" ? "Verify your account" : "Reset your password";
  const text = `Your OTP code is: ${otp}. It expires in 5 minutes.`;
  const html = `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
      <h2 style="color: #4CAF50;">SkillsSphere AI</h2>
      <p>Hello,</p>
      <p>${subject}:</p>
      <div style="background: #f9f9f9; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px;">
        ${otp}
      </div>
      <p>This code expires in 5 minutes.</p>
    </div>
  `;
  
  await sendEmail(email, subject, text, html);
};
