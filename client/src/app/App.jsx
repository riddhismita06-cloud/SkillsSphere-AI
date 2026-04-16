import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComponentDemo from "../modules/auth/components/ComponentDemo";
import Home from "./Home";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/demo" element={<ComponentDemo />} />
    </Routes>
  </BrowserRouter>
);

export default App;
