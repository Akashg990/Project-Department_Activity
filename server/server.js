import dotenv from "dotenv";

dotenv.config();




import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reportArchiveRoutes from "./routes/reportArchiveRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/activities", activityRoutes);
app.use("/api/users", userRoutes);
app.use(
  "/api/report-archives",
  reportArchiveRoutes
);
app.use(
  "/api/achievements",
  achievementRoutes
);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});