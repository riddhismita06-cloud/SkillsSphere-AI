import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/database/db.js";
import resumeRoutes from "./src/modules/resumes/routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

await connectDB();

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api/resume", resumeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});