import React from 'react';
import Card from '../../../../shared/landing_components/Card';
import { Video, FileText, FileSearch, Mic, LineChart } from 'lucide-react';
import '../css/Features.css';

const Features = () => {
  const featuresList = [
    {
      icon: <Video className="feature-icon text-primary" size={32} />,
      title: "Live Interactive Classrooms",
      description: "Real-time learning sessions with video, chat, and seamless collaboration tools tailored for immediate feedback."
    },
    {
      icon: <FileText className="feature-icon" style={{ color: '#A855F7' }} size={32} />,
      title: "AI Resume Analyzer",
      description: "Get instant resume scoring with actionable, AI-driven improvement suggestions to stand out to recruiters."
    },
    {
      icon: <FileSearch className="feature-icon text-primary" size={32} />,
      title: "Resume vs JD Matcher",
      description: "ML-assisted comparison between candidate professional profile and specific role requirements."
    },
    {
      icon: <Mic className="feature-icon" style={{ color: '#F59E0B' }} size={32} />,
      title: "AI Mock Interview System",
      description: "Realistic interview practice with structured, real-time feedback for continuous improvement."
    },
    {
      icon: <LineChart className="feature-icon" style={{ color: '#10B981' }} size={32} />,
      title: "Skill Tracking Dashboard",
      description: "Actionable performance insights designed to help both students and tutors track long-term growth and success."
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Core <span className="text-gradient">Features</span></h2>
          <p className="section-subtitle">
            Harness the power of Artificial Intelligence to elevate learning, prep for interviews, and land the perfect role.
          </p>
        </div>

        <div className="features-grid">
          {featuresList.map((feature, index) => (
            <Card key={index} className="feature-card" hoverEffect={true}>
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
