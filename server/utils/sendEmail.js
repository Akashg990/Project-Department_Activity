
import dotenv from "dotenv";

dotenv.config();
import nodemailer from "nodemailer";



const transporter =
  nodemailer.createTransport({
    service: "gmail",

    auth: {
      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,
    },
      connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
  });

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Verify Error:", error);
  } else {
    console.log("SMTP Server Ready");
  }
});

export const sendOTPEmail =
  async (email, otp) => {

    await transporter.sendMail({
      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "Department Activity Tracker OTP",

      html: `
        <h2>Email Verification</h2>

        <p>Your OTP is:</p>

        <h1>${otp}</h1>

        <p>Valid for 5 minutes.</p>
      `,
    });

  };



export const sendEmail = async (
  to,
  subject,
  html
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};
