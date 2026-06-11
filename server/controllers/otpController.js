import Otp from "../models/Otp.js";
import { sendOTPEmail } from "../utils/sendEmail.js";
import User from "../models/User.js";


export const sendOtp = async (
  req,
  res
) => {

  try {

    const { email } = req.body;

    const otp =
      Math.floor(
        100000 +
        Math.random() * 900000
      ).toString();

    await Otp.deleteMany({
      email,
    });

    await Otp.create({
      email,
      otp,

      expiresAt:
        new Date(
          Date.now() +
          5 * 60 * 1000
        ),
    });

    await sendOTPEmail(
      email,
      otp
    );

    res.json({
      message:
        "OTP sent successfully",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }
};

export const verifyOtp =
  async (req, res) => {

    try {

      const {
        email,
        otp,
      } = req.body;

      const record =
        await Otp.findOne({
          email,
          otp,
        });

      if (!record) {
        return res
          .status(400)
          .json({
            message:
              "Invalid OTP",
          });
      }

      if (
        record.expiresAt <
        new Date()
      ) {
        return res
          .status(400)
          .json({
            message:
              "OTP expired",
          });
      }

      await Otp.deleteOne({
        _id: record._id,
      });

      res.json({
        verified: true,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };


  export const sendResetOtp = async (
  req,
  res
) => {

    
try{
  const { email } = req.body;
  

  const user =
    await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message:
        "No account found with this email",
    });
  }

   const otp =
      Math.floor(
        100000 +
        Math.random() * 900000
      ).toString();

    await Otp.deleteMany({
      email,
    });

    await Otp.create({
      email,
      otp,

      expiresAt:
        new Date(
          Date.now() +
          5 * 60 * 1000
        ),
    });

    await sendOTPEmail(
      email,
      otp
    );

    res.json({
      message:
        "OTP sent successfully",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    }); }
}
