import ReportArchive from "../models/ReportArchive.js";
import Activity from "../models/Activity.js";

// Create Report Archive
export const createReportArchive = async (req, res) => {
  try {
    const {
      academicYear,
      excelLink,
      remarks,
    } = req.body;

    const existingReport = await ReportArchive.findOne({
      academicYear,
    });

    if (existingReport) {
      return res.status(400).json({
        message:
          "Report for this academic year already exists.",
      });
    }

    // Calculate automatically

    const activities = await Activity.find({
      academicYear,
    });

    const totalActivities = activities.length;

    const totalParticipants = activities.reduce(
      (sum, activity) =>
        sum + Number(activity.participants || 0),
      0
    );

    const report =
      await ReportArchive.create({
        academicYear,
        excelLink,
        remarks,
        generatedBy: req.user?._id || null,
        totalActivities,
        totalParticipants,
      });

    res.status(201).json(report);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to create report archive",
    });

  }
};

// Get All Reports
export const getAllReportArchives = async (
  req,
  res
) => {
  try {
    const reports =
      await ReportArchive.find()
        .populate("generatedBy", "name email")
        .sort({
          academicYear: -1,
        });

    res.json(reports);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch reports.",
    });
  }
};

// Update Report
export const updateReportArchive = async (req, res) => {
  try {

    const {
      academicYear,
      excelLink,
      remarks,
    } = req.body;

    const activities = await Activity.find({
      academicYear,
    });

    const totalActivities = activities.length;

    const totalParticipants = activities.reduce(
      (sum, activity) =>
        sum + Number(activity.participants || 0),
      0
    );

    const report =
      await ReportArchive.findByIdAndUpdate(

        req.params.id,

        {
          academicYear,
          excelLink,
          remarks,
          totalActivities,
          totalParticipants,
        },

        {
          new: true,
        }

      );

    if (!report) {

      return res.status(404).json({

        message: "Report not found",

      });

    }

    res.json(report);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Failed to update report",

    });

  }
};

// Delete Report
export const deleteReportArchive = async (
  req,
  res
) => {
  try {
    const report =
      await ReportArchive.findByIdAndDelete(
        req.params.id
      );

    if (!report) {
      return res.status(404).json({
        message: "Report not found.",
      });
    }

    res.json({
      message: "Report deleted successfully.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to delete report.",
    });
  }
};