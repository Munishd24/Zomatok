import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/auth-shared.css';
import axios from 'axios';

const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      const response = await axios.post("http://localhost:3000/api/auth/food-partner/login", {
        email,
        password
      }, { withCredentials: true });

      console.log('Partner login successful:', response.data);
      
      // Navigate to create food page
      navigate("/create-food");
    } catch (err) {
      console.error('Partner login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="partner-login-title">
        <header>
          <h1 id="partner-login-title" className="auth-title">Partner Login</h1>
          <p className="auth-subtitle">Sign in to start uploading food videos.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="business@example.com" autoComplete="email" required disabled={loading} />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" required disabled={loading} />
          </div>
          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="auth-alt-action">
          New partner? <Link to="/food-partner/register">Create account</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
