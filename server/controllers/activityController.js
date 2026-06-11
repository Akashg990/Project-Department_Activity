import Activity from "../models/Activity.js";
import cloudinary from "../config/cloudinary.js";


console.log("MODEL NAME:", Activity.modelName);

console.log(
  "IMAGE PATH:",
  Activity.schema.path("images").instance
);

console.log(
  Activity.schema.path("images")
);


// CREATE ACTIVITY
export const createActivity = async (req, res) => {
  console.log(req.files);
  console.log(req.body);
   try {

    const {
      title,
      club,
      activityType,
      objective,
      outcome,
      description,
      startDate,
      endDate,
      venue,
      academicYear,
      semester,
      facultyCoordinator,
      studentCoordinator,
      participants,
      googleDriveLink,
      newsReportLink,
    } = req.body;

    // Resource Persons

    let resourcePersons = [];

    if (req.body.resourcePersons) {
      resourcePersons = JSON.parse(
        req.body.resourcePersons
      );
    }

    // Upload Images

    let uploadedImages = [];

    if (req.files && req.files.length > 0) {

      for (const file of req.files) {

        const base64 =
          file.buffer.toString("base64");

        const dataURI =
          `data:${file.mimetype};base64,${base64}`;

        const uploaded =
          await cloudinary.uploader.upload(
            dataURI,
            {
              folder:
                "department_activities",
            }
          );

       uploadedImages.push({

  public_id: uploaded.public_id,

  url: uploaded.secure_url,

});
      }

    }

    if (uploadedImages.length > 4) {

      return res.status(400).json({
        message:
          "Maximum 4 images allowed",
      });

    }

    const activity =
      await Activity.create({

        title,

        club,

        activityType,

        objective,

        outcome,

        description,

        startDate,

        endDate,

        venue,

        academicYear,

        semester,

        facultyCoordinator,

        studentCoordinator,

        participants,

        googleDriveLink,

        newsReportLink,

        resourcePersons,

        images: uploadedImages,

        createdBy: req.user.id,

      });

    res.status(201).json(activity);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message,

    });
  }
};

// GET ALL ACTIVITIES
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(activities);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE ACTIVITY
export const getSingleActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate(
      "createdBy",
      "name email",
    );

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    res.status(200).json(activity);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE ACTIVITY
// UPDATE ACTIVITY
export const updateActivity = async (req, res) => {
  try {

    const activity = await Activity.findById(
      req.params.id
    );

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    const {
      title,
      club,
      activityType,
      objective,
      outcome,
      description,
      startDate,
      endDate,
      venue,
      academicYear,
      semester,
      facultyCoordinator,
      studentCoordinator,
      participants,
      googleDriveLink,
        newsReportLink,
    } = req.body;

    // Resource Persons

 let resourcePersons = [];

if (req.body.resourcePersons) {

  if (typeof req.body.resourcePersons === "string") {

    try {

      resourcePersons = JSON.parse(req.body.resourcePersons);

    } catch (err) {

      console.log("JSON Parse Error:", err);

      resourcePersons = [];

    }

  } else if (Array.isArray(req.body.resourcePersons)) {

    resourcePersons = req.body.resourcePersons.map((person) => ({
      name: person.name || "",
      designation: person.designation || "",
    }));

  } else if (typeof req.body.resourcePersons === "object") {

    resourcePersons = [
      {
        name: req.body.resourcePersons.name || "",
        designation:
          req.body.resourcePersons.designation || "",
      },
    ];

  }

}

resourcePersons = resourcePersons.filter(
  (person) =>
    person &&
    person.name &&
    person.name.trim() !== ""
);

    // Existing Images

    let existingImages = [];

if (req.body.existingImages) {

  existingImages =
    typeof req.body.existingImages === "string"
      ? JSON.parse(req.body.existingImages)
      : req.body.existingImages;

}

    // Upload New Images

    // Upload New Images

let uploadedImages = [];

if (req.files && req.files.length > 0) {

  for (const file of req.files) {

    const base64 = file.buffer.toString("base64");

    const dataURI = `data:${file.mimetype};base64,${base64}`;

    const uploaded = await cloudinary.uploader.upload(
      dataURI,
      {
        folder: "department_activities",
      }
    );

    uploadedImages.push({

      public_id: uploaded.public_id,

      url: uploaded.secure_url,

    });

  }

}


let deletedImages = [];

if (req.body.deletedImages) {

  deletedImages =
    typeof req.body.deletedImages === "string"
      ? JSON.parse(req.body.deletedImages)
      : req.body.deletedImages;

}

    const finalImages = [
      ...existingImages,
      ...uploadedImages,
    ];

    if (finalImages.length > 4) {

      return res.status(400).json({
        message:
          "Maximum 4 images allowed",
      });

    }

    activity.title = title;
    activity.club = club;
    activity.activityType = activityType;
    activity.objective = objective;
    activity.outcome = outcome;
    activity.description = description;
    activity.startDate = startDate;
    activity.endDate = endDate;
    activity.venue = venue;
    activity.academicYear = academicYear;
    activity.semester = semester;
    activity.facultyCoordinator =
      facultyCoordinator;
    activity.studentCoordinator =
      studentCoordinator;
    activity.participants = participants;
    activity.googleDriveLink =
      googleDriveLink;
      activity.newsReportLink= newsReportLink,
    activity.resourcePersons =
      resourcePersons;
    activity.images = finalImages;

    await activity.save();

    res.status(200).json(activity);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// DELETE ACTIVITY
// DELETE ACTIVITY
export const deleteActivity = async (req, res) => {

  try {

    const activity =
      await Activity.findById(req.params.id);

    if (!activity) {

      return res.status(404).json({
        message: "Activity not found",
      });

    }

    // Delete Images From Cloudinary

    if (
  activity.images &&
  activity.images.length > 0
) {

  for (const image of activity.images) {

    try {

      await cloudinary.uploader.destroy(
        image.public_id
      );

    } catch (error) {

      console.log(
        error.message
      );

    }

  }

}

    await activity.deleteOne();

    res.status(200).json({

      message:
        "Activity deleted successfully",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message,

    });

  }

};

export const getDashboardStats =
  async (req, res) => {

    try {

      const { year } = req.query;

      let query = {};

      if (year) {

        query.academicYear = year;

      }

      const activities =
        await Activity.find(query);

      const totalActivities =
        activities.length;

      const totalParticipants =
        activities.reduce(

          (sum, activity) =>
            sum +
            Number(
              activity.participants || 0
            ),

          0

        );

      const totalClubs =
        new Set(

          activities.map(
            (activity) =>
              activity.club
          )

        ).size;

      const totalActivityTypes =
        new Set(

          activities.map(
            (activity) =>
              activity.activityType
          )

        ).size;

      const upcomingActivities =
        activities.filter(
          (activity) =>
            activity.status ===
            "Upcoming"
        ).length;

      const ongoingActivities =
        activities.filter(
          (activity) =>
            activity.status ===
            "Ongoing"
        ).length;

      const completedActivities =
        activities.filter(
          (activity) =>
            activity.status ===
            "Completed"
        ).length;

      const recentActivities =
        await Activity.find(query)
          .sort({
            createdAt: -1,
          })
          .limit(5);

      res.status(200).json({

        totalActivities,

        totalParticipants,

        totalClubs,

        totalActivityTypes,

        upcomingActivities,

        ongoingActivities,

        completedActivities,

        recentActivities,

        activities,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message: error.message,

      });

    }

  };


export const deleteActivityImage =
  async (req, res) => {

    try {

      const {
        activityId,
      } = req.params;

      const {
        publicId,
      } = req.body;

      const activity =
        await Activity.findById(
          activityId
        );

      if (!activity) {

        return res.status(404).json({

          message:
            "Activity not found",

        });

      }

      await cloudinary.uploader.destroy(
        publicId
      );

      activity.images =
        activity.images.filter(

          (image) =>

            image.public_id !==
            publicId

        );

      await activity.save();

      res.status(200).json({

        message:
          "Image deleted successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          error.message,

      });

    }

  };