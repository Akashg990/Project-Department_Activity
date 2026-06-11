import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

export const getUsers = async (req, res) => {
  try {

   const users = await User.find({
  role: { $in: ["admin", "faculty"] },
})
  .select("-password")
  .sort({ createdAt: -1 });

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const approveFaculty = async (
  req,
  res
) => {
  try {

    const user =
      await User.findById(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.status = "approved";

    await user.save();

    res.status(200).json({
      message:
        "Faculty approved successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const deleteFaculty =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {

        return res.status(404).json({
          message:
            "User not found",
        });

      }

      if (
        user.role === "admin"
      ) {

        return res.status(400).json({
          message:
            "Admins cannot be deleted",
        });

      }

      await user.deleteOne();

      res.status(200).json({
        message:
          "Faculty removed successfully",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };


  

export const testEmail = async (
  req,
  res
) => {
  try {

    await sendEmail(
      "akashgond6036@gmail.com",
      "Email Test",
      `
        <h2>Department Activity Tracker</h2>
        <p>Email service is working successfully.</p>
      `
    );

    res.status(200).json({
      message: "Email sent successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};