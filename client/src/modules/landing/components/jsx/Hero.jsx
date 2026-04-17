import React from 'react';
import Button from '../../../../shared/landing_components/Button';
import '../css/Hero.css';

const Hero = () => {
  return (
    <section className="hero-section flex-center animate-slide-up">
      <div className="container hero-container">
        <div className="hero-content">

          <h1 className="hero-title">
            <span className="text-gradient">Learn.</span> Evaluate. <br /> Get Hired.
          </h1>
          <p className="hero-subtitle">
            An end-to-end AI-powered learning and hiring ecosystem. Master new skills, prove your expertise, and connect with top recruiters all in one unified platform.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Button variant="primary" size="lg" to="/register">Get Started</Button>
            <Button variant="secondary" size="lg" to="/login">Login</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
