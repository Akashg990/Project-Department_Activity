import mongoose from "mongoose";

const reportArchiveSchema = new mongoose.Schema(
  {
    academicYear: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    excelLink: {
      type: String,
      required: true,
      trim: true,
    },

    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    generatedAt: {
      type: Date,
      default: Date.now,
    },

    totalActivities: {
      type: Number,
      default: 0,
    },

    totalParticipants: {
      type: Number,
      default: 0,
    },

    remarks: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Available", "Archived"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "ReportArchive",
  reportArchiveSchema
);