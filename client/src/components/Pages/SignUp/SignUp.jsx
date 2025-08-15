import React, { useState } from 'react';
import './SingUp.css'; 
import axios from 'axios';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const navigate = useNavigate(); // Navigation hook

  const defaultImage =
    'https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain';

  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    channelName: '',
    password: '',
    confirmPassword: '',
    about: '',
    profilePic: defaultImage, // Default profile picture
  });

  // State for UI feedback
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Handle input changes generically
  const handleChange = (e, name) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  // Upload image to Cloudinary
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'Youtube_capstone');

    try {
      setIsLoading(true); // Indicate upload in progress
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dclowgl6x/image/upload',
        data
      );
      const imageUrl = response.data.url;
      setFormData({ ...formData, profilePic: imageUrl }); // Update image URL
    } catch (err) {
      setError('Image upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Basic email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle signup form submission
  async function handleSignup(e) {
    e.preventDefault();

    // Required field validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Email format check
    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true); // Start loader
    try {
      // Submit signup data to backend
      const res = await axios.post('https://youtube-clone-backend-y63i.onrender.com/auth/signUp', formData);
      toast.success(res.data.message);
      setSuccessMsg(res.data.message);
      navigate('/'); 
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Signup failed';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="signup-modal">
      <div className="signup-modal-container">
        {/* Header with logo */}
        <div className="signup-modal-header">
          <YouTubeIcon sx={{ fontSize: '48px' }} className="signup-modal-icon" />
          Create Account
        </div>

        {/* Signup form */}
        <div className="signup-modal-form">
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleChange(e, 'username')}
            className="signup-modal-input"
            placeholder="Username"
          />

          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange(e, 'email')}
            className="signup-modal-input"
            placeholder="Email"
          />

          <input
            type="text"
            value={formData.channelName}
            onChange={(e) => handleChange(e, 'channelName')}
            className="signup-modal-input"
            placeholder="Name"
          />

          <textarea
            value={formData.about}
            onChange={(e) => handleChange(e, 'about')}
            className="signup-modal-input"
            placeholder="About You"
          />

          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleChange(e, 'password')}
            className="signup-modal-input"
            placeholder="Password"
          />

          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange(e, 'confirmPassword')}
            className="signup-modal-input"
            placeholder="Confirm Password"
          />

          {/* Profile image upload */}
          <div className="image-upload">
            <label htmlFor="file-input" className="signup-modal-btn">
              Upload Profile Picture
            </label>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={uploadImage}
              className="upload-button"
            />
            <div className="signup-image-preview">
              <img
                src={formData.profilePic}
                alt="Profile Preview"
                className="signup-preview-img"
              />
            </div>
          </div>

          {/* Display loading, error or success messages */}
          {isLoading && <p style={{ color: 'blue' }}>Processing...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
        </div>

        {/* Action buttons */}
        <div className="signup-modal-actions">
          <div className="signup-modal-btn" onClick={handleSignup}>
            Sign Up
          </div>
          <Link to="/" className="signup-modal-btn">
            Close
          </Link>
        </div>
      </div>

      {/* Toast container for notifications */}
      <ToastContainer style={{overflow:"hidden"}}/>
    </div>
  );
};

export default SignUp;
