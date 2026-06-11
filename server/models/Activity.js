import mongoose from "mongoose";

const resourcePersonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  },
);

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    club: {
      type: String,
      required: true,
      trim: true,
    },

    activityType: {
      type: String,
      required: true,
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    academicYear: {
      type: String,
      required: true,
    },

    semester: {
      type: String,
      enum: ["I", "II"],
      default: "All",
    },

    facultyCoordinator: {
      type: String,
      default: "",
    },

    studentCoordinator: {
      type: String,
      default: "",
    },

    resourcePersons: [resourcePersonSchema],

    participants: {
      type: Number,
      default: 0,
    },

    googleDriveLink: {
      type: String,
      default: "",
    },

    newsReportLink: {
      type: String,
      default: "",
    },

    images: [
      {
        public_id: {
          type: String,
        },

        url: {
          type: String,
        },
      },
    ],

    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      default: "Upcoming",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

activitySchema.pre("save", function () {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const start = new Date(this.startDate);

  const end = new Date(this.endDate);

  start.setHours(0, 0, 0, 0);

  end.setHours(23, 59, 59, 999);

  if (today < start) {
    this.status = "Upcoming";
  } else if (today >= start && today <= end) {
    this.status = "Ongoing";
  } else {
    this.status = "Completed";
  }
});

export default mongoose.model("Activity", activitySchema);
