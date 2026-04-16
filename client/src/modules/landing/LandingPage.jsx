import React from 'react';
import Navbar from '../../shared/landing_components/Navbar.jsx';
import Hero from './components/jsx/Hero';
import Features from './components/jsx/Features';
import TargetUsers from './components/jsx/TargetUsers';
import CTA from './components/jsx/CTA';

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
