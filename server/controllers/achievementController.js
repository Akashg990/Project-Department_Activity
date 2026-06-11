import Achievement from "../models/Achievement.js";

// Create Achievement
export const createAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.create({
      ...req.body,
      createdBy: req.user?._id || null,
    });

    res.status(201).json(achievement);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to create achievement",
    });
  }
};

// Get All Achievements
export const getAchievements = async (req, res) => {
  try {
    const {
      academicYear,
      semester,
      category,
      search,
    } = req.query;

    let filter = {};

    if (academicYear && academicYear !== "All") {
      filter.academicYear = academicYear;
    }

    if (semester && semester !== "All") {
      filter.semester = semester;
    }

    if (category && category !== "All") {
      filter.category = category;
    }

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    const achievements = await Achievement.find(filter)
      .populate("createdBy", "name")
      .sort({
        createdAt: -1,
      });

    res.json(achievements);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch achievements",
    });
  }
};

// Get Single Achievement
export const getAchievementById = async (req, res) => {
  try {
    const achievement =
      await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({
        message: "Achievement not found",
      });
    }

    res.json(achievement);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch achievement",
    });
  }
};

// Update Achievement
export const updateAchievement = async (req, res) => {
  try {
    const achievement =
      await Achievement.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!achievement) {
      return res.status(404).json({
        message: "Achievement not found",
      });
    }

    res.json(achievement);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update achievement",
    });
  }
};

// Delete Achievement
export const deleteAchievement = async (req, res) => {
  try {
    const achievement =
      await Achievement.findByIdAndDelete(
        req.params.id
      );

    if (!achievement) {
      return res.status(404).json({
        message: "Achievement not found",
      });
    }

    res.json({
      message: "Achievement deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to delete achievement",
    });
  }
};