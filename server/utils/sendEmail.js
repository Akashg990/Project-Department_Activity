import dotenv from "dotenv";
dotenv.config();

import dns from "dns";
import nodemailer from "nodemailer";

// Force Node.js to prefer IPv4 over IPv6
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

// Verify transporter on server startup
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ SMTP Verify Error:", error);
  } else {
    console.log("✅ SMTP Server Ready");
  }
});

// Send OTP Email
export const sendOTPEmail = async (email, otp) => {
  const info = await transporter.sendMail({
    from: `"Department Activity Tracker" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Department Activity Tracker OTP",
    html: `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2>Email Verification</h2>

        <p>Your One Time Password is:</p>

        <h1
          style="
            color:#2563eb;
            letter-spacing:4px;
            font-size:36px;
          "
        >
          ${otp}
        </h1>

        <p>This OTP is valid for <strong>5 minutes</strong>.</p>

        <p>Please do not share this OTP with anyone.</p>
      </div>
    `,
  });

  console.log("✅ OTP Email Sent:", info.messageId);

  return info;
};

// Generic Email Sender
export const sendEmail = async (
  to,
  subject,
  html
) => {

  const info = await transporter.sendMail({
    from: `"Department Activity Tracker" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });

  console.log("✅ Email Sent:", info.messageId);

  return info;
};
