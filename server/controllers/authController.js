import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });
};

//Register User

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      status:
        role === "faculty" || role === "admin"
          ? "pending"
          : "approved",
    });

    // Faculty/Admin Approval Required
    if (
      user.role === "faculty" ||
      user.role === "admin"
    ) {
      return res.status(201).json({
        message:
          "Registration successful. Please wait for admin approval.",
      });
    }

    // Student Registration
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

//Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Faculty Approval Check
    if (
      (user.role === "faculty" || user.role === "admin") &&
      user.status === "pending"
    ) {
      return res.status(403).json({
        message: "Your account is awaiting admin approval.",
      });
    }

    // Successful Login
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const resetPassword = async (
  req,
  res
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    user.password =
      hashedPassword;

    await user.save();

    res.status(200).json({
      message:
        "Password reset successful",
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};



