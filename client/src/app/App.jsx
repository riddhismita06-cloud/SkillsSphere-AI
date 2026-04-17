import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../modules/landing/LandingPage";
import ResumeAnalyzerPage from "../modules/resume-analyzer/pages/ResumeAnalyzerPage";
import ComponentDemo from "../modules/auth/components/ComponentDemo";
import Login from "../modules/auth/login";
import Register from "../modules/auth/Register";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<ComponentDemo />} />
        <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
