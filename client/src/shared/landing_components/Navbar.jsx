import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <span className="text-gradient">SkillsSphere</span>-AI
        </Link>
        <div className="nav-actions">
          <Button variant="ghost" size="sm" to="/login">Login</Button>
          <Button variant="primary" size="sm" to="/register">Get Started</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
