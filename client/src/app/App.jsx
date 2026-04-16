import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from '../modules/landing/LandingPage';

const App = () => (
  <BrowserRouter>
    <Routes>
       <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<div className="flex-center" style={{ height: '100vh', fontSize: '2rem'}}>Login Route Spacer</div>} />
        <Route path="/register" element={<div className="flex-center" style={{ height: '100vh', fontSize: '2rem'}}>Register Route Spacer</div>} />
    </Routes>
  </BrowserRouter>
);

export default App;
