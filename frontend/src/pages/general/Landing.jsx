import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="landing-content">
          <h1 className="landing-title">Zomatok</h1>
          <p className="landing-subtitle">
            Share and discover amazing food videos
          </p>
          
          <div className="landing-actions">
            <Link to="/user/login" className="landing-btn landing-btn-primary">
              Log In
            </Link>
            <Link to="/user/register" className="landing-btn landing-btn-secondary">
              Sign Up
            </Link>
          </div>

          <div className="landing-divider">
            <span>OR</span>
          </div>

          <Link to="/food-partner/login" className="landing-link">
            Food Partner Login
          </Link>

          <div className="landing-guest">
            <Link to="/home" className="landing-guest-link">
              Continue as Guest →
            </Link>
          </div>
        </div>

        <div className="landing-features">
          <div className="feature-item">
            <div className="feature-icon">📹</div>
            <div className="feature-text">Watch food reels</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">❤️</div>
            <div className="feature-text">Like & save favorites</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🍽️</div>
            <div className="feature-text">Share your dishes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
