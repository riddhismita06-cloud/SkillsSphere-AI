import { useSelector } from "react-redux";
import Navbar from "../../shared/landing/Navbar.jsx";
import CTA from "./components/CTA";
import Features from "./components/Features";
import Hero from "./components/Hero";
import TargetUsers from "./components/TargetUsers";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <Features />
      <TargetUsers />
      <CTA />
    </div>
  );
};

export default LandingPage;
