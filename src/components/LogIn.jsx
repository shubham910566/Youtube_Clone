import React from 'react';
import './LogIn.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from 'react-router-dom';

const LogIn = ({setLogin}) => {
    const navigate = useNavigate();
  return (
    <div className="auth-modal">
      <div className="auth-modal-container">
        <div className="auth-modal-header">
          <YouTubeIcon sx={{ fontSize: '48px' }} className="auth-modal-icon" />
          Sign In
        </div>

        <div className="auth-modal-form">
          <div className="auth-modal-input-group">
            <input
              type="text"
              className="auth-modal-input"
              placeholder="Username or Email"
            />
          </div>

          <div className="auth-modal-input-group">
            <input
              type="password"
              className="auth-modal-input"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="auth-modal-actions">
          <div className="auth-modal-btn" onClick={() => alert('Login functionality coming soon!')}>
            Sign In
          </div>
          <Link to="/signup" className="auth-modal-btn">
            Create Account
          </Link>
          <div className="auth-modal-btn" onClick={() => setLogin(false)}>
            Close
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;