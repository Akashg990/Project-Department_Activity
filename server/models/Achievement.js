import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Student Achievement",
        "Faculty Achievement",
        "Department Achievement",
        "Certification",
        "Competition",
        "Placement",
        "Research",
        "Other",
      ],
      default: "Other",
    },

    academicYear: {
      type: String,
      required: true,
    },

    semester: {
      type: String,
      enum: [
        "I",
        "II",
       
      ],
      default: "All",
    },

    googleDriveLink: {
      type: String,
      required: true,
      trim: true,
    },

    remarks: {
      type: String,
      default: "",
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Achievement",
  achievementSchema
);