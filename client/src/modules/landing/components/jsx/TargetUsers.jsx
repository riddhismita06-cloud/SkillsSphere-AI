import React from 'react';
import Card from '../../../../shared/landing_components/Card';
import { Users, BookOpen, Briefcase } from 'lucide-react';
import '../css/TargetUsers.css';

const TargetUsers = () => {
  const users = [
    {
      icon: <BookOpen className="text-primary" size={40} />,
      role: "Students",
      description: "Accelerate your learning curve, practice intelligently, and become undeniably job-ready.",
      accent: 'primary'
    },
    {
      icon: <Users className="text-primary" style={{ color: '#10B981' }} size={40} />,
      role: "Tutors",
      description: "Host rich, interactive live classes and provide personalized mentorship to fuel student growth.",
      accent: 'secondary'
    },
    {
      icon: <Briefcase className="text-primary" style={{ color: '#F59E0B' }} size={40} />,
      role: "Recruiters",
      description: "Source top-tier talent quickly using AI-backed skill profiling and detailed analytics.",
      accent: 'yellow'
    }
  ];

  return (
    <section className="target-users-section">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2 className="section-title">Built For The <span className="text-gradient">Ecosystem</span></h2>
          <p className="section-subtitle">
            A cohesive platform supporting every stage of the talent lifecycle.
          </p>
        </div>
        
        <div className="users-grid">
          {users.map((user, index) => (
            <Card key={index} className={`user-card border-${user.accent}`} hoverEffect={true}>
              <div className="user-icon-container">
                {user.icon}
              </div>
              <h3 className="user-role">{user.role}</h3>
              <p className="user-desc">{user.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetUsers;
