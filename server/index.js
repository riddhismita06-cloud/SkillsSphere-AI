import express from "express";
import resumeRoutes from "./src/modules/resumes/routes.js";

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/api/resume", resumeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});