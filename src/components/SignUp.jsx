import React from 'react';
import './SingUp.css'
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="signup-modal">
      <div className="signup-modal-container">
        <div className="signup-modal-header">
          <YouTubeIcon sx={{ fontSize: '48px' }} className="signup-modal-icon" />
          Create Account
        </div>

        <div className="signup-modal-form">
          <div className="signup-modal-input-group">
            <input
              type="text"
              className="signup-modal-input"
              placeholder="Username"
            />
          </div>

          <div className="signup-modal-input-group">
            <input
              type="email"
              className="signup-modal-input"
              placeholder="Email Address"
            />
          </div>

          <div className="signup-modal-input-group">
            <input
              type="password"
              className="signup-modal-input"
              placeholder="Password"
            />
          </div>

          <div className="signup-modal-input-group">
            <input
              type="password"
              className="signup-modal-input"
              placeholder="Confirm Password"
            />
          </div>
        </div>

        <div className="signup-modal-actions">
          <div className="signup-modal-btn" onClick={() => alert('Sign-up functionality coming soon!')}>
            Sign Up
          </div>
          <Link to={"/"} className="signup-modal-btn" onClick={() => setLoginModal()}>
            Close
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;