import React, { useState } from 'react';
import './LogIn.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const LogIn = ({ setLogin }) => {
  const navigate = useNavigate();

  const [authData, setAuthData] = useState({
    username: '',
    password: '',
  });

  const Verifydata = async () => {
    if (!authData.username || !authData.password) {
      toast.error('Please enter username and password');
      return;
    }

    try {
      // Make a login request to the backend API with the entered credentials
      const res = await axios.post('http://localhost:8000/auth/signIn', authData, { withCredentials: true });

      // Store token in cookies (used for authentication on the server)
      Cookies.set('token', res.data.token, { expires: 1, path: '/' });

      // Also store the token and user data in localStorage for client-side access
      localStorage.setItem("Token", res.data.token);
      localStorage.setItem("UserId", res.data.user._id);
      localStorage.setItem("UserProfilePic", res.data.user.profilePic);

      toast.success('Login successful!');
      setLogin(true);

      // Reload the app to update state across the application
      window.location.reload();
    } catch (err) {
      console.error(err);
      // Show the error returned by the server or a default error
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

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
              name="username"
              value={authData.username}
              type="text"
              className="auth-modal-input"
              onChange={(e) => setAuthData({ ...authData, username: e.target.value })}
              placeholder="Username or Email"
            />
          </div>

          <div className="auth-modal-input-group">
            <input
              type="password"
              value={authData.password}
              onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
              className="auth-modal-input"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="auth-modal-actions">
          <div className="auth-modal-btn" onClick={Verifydata}>
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
      <ToastContainer style={{overflow:"hidden"}}/>
    </div>
  );
};

export default LogIn;
