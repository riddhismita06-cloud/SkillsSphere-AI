import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../modules/landing/LandingPage";
import ResumeAnalyzerPage from "../modules/resume-analyzer/pages/ResumeAnalyzerPage";
import ComponentDemo from "../modules/auth/components/ComponentDemo";
import Login from "../modules/auth/Login";
import Register from "../modules/auth/Register";
import ResetPassword from "../modules/auth/ResetPassword";
import VerifyEmail from "../modules/auth/VerifyEmail";
import ProfilePage from "../modules/profile/ProfilePage";
import ProtectedRoute from "../shared/components/ProtectedRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {import.meta.env.DEV && <Route path="/demo" element={<ComponentDemo />} />}
        <Route 
          path="/resume-analyzer" 
          element={
            <ProtectedRoute>
              <ResumeAnalyzerPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
