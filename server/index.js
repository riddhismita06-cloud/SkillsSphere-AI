import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./src/database/db.js";
import authRoutes from "./src/modules/auth/routes.js";
import resumeRoutes from "./src/modules/resumes/routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/uploads", express.static(path.resolve("src", "uploads")));

await connectDB();

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});