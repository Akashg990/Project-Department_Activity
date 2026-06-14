import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (email, otp) => {

  await resend.emails.send({

    from:
      "DeptTrack <onboarding@resend.dev>",

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

  await resend.emails.send({

    from:
      "DeptTrack <onboarding@resend.dev>",

    to,

    subject,

    html,

  });

};
