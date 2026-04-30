import React from "react";
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../modules/landing/LandingPage';
import JobMatcherPage from "../modules/job-matcher/pages/JobMatcherPage";

function App() {
  return (
    
      <div className="min-h-screen bg-[#020617] text-white">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<div className="flex-center" style={{ height: '100vh', fontSize: '2rem'}}>Login Route Spacer</div>} />
        <Route path="/register" element={<div className="flex-center" style={{ height: '100vh', fontSize: '2rem'}}>Register Route Spacer</div>} />
        <Route path="/job-matcher" element={<JobMatcherPage />} />
      </Routes>
    </div>
  );
}

export default App ;
