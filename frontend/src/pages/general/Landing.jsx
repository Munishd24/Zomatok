import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/landing.css';

const Landing = () => {
  return (
    <div style={{position:'relative', minHeight:'100vh', overflow:'hidden'}}>
      <svg className="svg-accent-bg" width="1200" height="700" viewBox="0 0 1200 700" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="920" cy="70" rx="280" ry="130" fill="#24c9ee" fillOpacity="0.13"/>
        <ellipse cx="190" cy="600" rx="370" ry="100" fill="#fef08a" fillOpacity="0.10"/>
        <ellipse cx="280" cy="110" rx="120" ry="45" fill="#34d399" fillOpacity="0.09"/>
        <ellipse cx="1100" cy="540" rx="220" ry="60" fill="#60a5fa" fillOpacity="0.06"/>
      </svg>
      <main className="landing-main">
        <img src="https://undraw.co/api/illustrations/91c84025-1b08-44c8-9a83-e8f380a5b315" alt="Delicious food reels" className="hero-illustration"/>
        <section className="landing-hero">
          <h1 className="landing-title">Welcome to FoodView</h1>
          <p className="landing-desc">
            Discover and share delicious foods, watch partner reel videos,<br/>and join our growing food community!
          </p>
          <div className="landing-cta-group">
            <Link className="landing-cta" to="/user/register">Join as User</Link>
            <span className="landing-cta-note">or</span>
            <Link className="landing-cta landing-cta-secondary" to="/food-partner/register">Become a Food Partner</Link>
          </div>
          <div className="landing-demo-group">
            <span className="landing-demo-text">Just exploring?</span>
            <Link to="/home" className="landing-demo-link">Continue as guest</Link>
          </div>
        </section>
        <section className="landing-feature-section">
          <h2 className="landing-feature-title">Why FoodView?</h2>
          <ul className="landing-feature-list">
            <li><span role="img" aria-label="food">🍜</span> Watch and share short food videos like reels</li>
            <li><span role="img" aria-label="like">❤️</span> Like and save your favorites</li>
            <li><span role="img" aria-label="chef">👨‍🍳</span> Become a food partner: upload your own dishes and reels</li>
            <li><span role="img" aria-label="community">🤝</span> Join a friendly food community</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Landing;
