import React from 'react';
import Button from '../../../../shared/landing_components/Button';
import '../css/CTA.css';

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-container">
          <div className="cta-glow"></div>
          <h2 className="cta-title">Ready to transform your journey?</h2>
          <p className="cta-subtitle">
            Join thousands of students, tutors, and recruiters already active on SkillsSphere-AI.
          </p>
          <div className="cta-actions">
            <Button variant="primary" size="lg" to="/register">Create Free Account</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
