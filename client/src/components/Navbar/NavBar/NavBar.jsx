import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogIn from '../../Pages/LogIn/LogIn';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NavBar({ toggleSideBar, onSearch }) {
  const [imgUrl, setImgUrl] = useState('https://cdn.vectorstock.com/i/preview-1x/62/38/avatar-13-vector-42526238.jpg');
  const [details, setDetails] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userChannelId, setUserChannelId] = useState(localStorage.getItem("UserChannelId") || null);
  const navigate = useNavigate();

  // Initialize state based on localStorage and fetch channel ID
  useEffect(() => {
    const userId = localStorage.getItem("UserId");
    const profileImage = localStorage.getItem("UserProfilePic");

    setUserLoggedIn(!!userId);
    if (profileImage) setImgUrl(profileImage);

    if (userId) {
      axios.get(`http://localhost:8000/channel/by-user/${userId}`)
        .then(response => {
          if (response.data) {
            localStorage.setItem("UserChannelId", response.data._id);
            setUserChannelId(response.data._id);
          }
        })
        .catch(err => console.error("Channel fetch failed:", err));
    }
  }, []);

  // Handle login and logout actions
  const handleLoginLogout = (action) => {
    if (action === "login") {
      setLoginOpen(true);
      setDetails(false);
    } else {
      localStorage.clear();
      setUserLoggedIn(false);
      setDetails(false);
      setTimeout(() => {        
        setImgUrl('https://cdn.vectorstock.com/i/preview-1x/62/38/avatar-13-vector-42526238.jpg');
        navigate('/');
        window.location.reload();
      }, 1000);
    }
  };

  // Search trigger
  const handleSearchClick = () => {
    onSearch(searchTerm.trim() || '');
  };
 
  // Navigate to user's channel page
  const goToMyChannel = () => {
    const userId = localStorage.getItem("UserId");
    const channelId = localStorage.getItem("UserChannelId");

    if (channelId && userId) {
      setDetails(false);
      navigate(`/mychannel/${userId}`);
    }
  };
  
  return (
    <div className='navbar'>
      <div className="left">
        <MenuIcon className='hover:bg-gray-100 menu-icon' onClick={toggleSideBar} />
        <YouTubeIcon sx={{ color: "red" }} className='youtube-icon' />
        <Link to={'/'} className='font'>YouTube</Link>
      </div>

      <div className="mid">
        <div className="search-bar">
          <input
            type="text"
            placeholder='Search'
            className='search-box'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="search-icon" onClick={handleSearchClick}>
            <SearchIcon sx={{ color: 'black', fontSize: "20px" }} className='search-button' />
          </div>
        </div>
        <div className="mic-icon">
          <MicIcon sx={{ color: 'black', fontSize: '20px' }} />
        </div>
      </div>

      <div className="right">
        {userLoggedIn && (
  <button
    className="create-button"
    onClick={() => {
      if (!userChannelId) {
        toast.error('Please create a channel first');
      } else {
        window.location.href = "/upload-video"; // Redirect manually
      }
    }}
  >
    <AddIcon sx={{ color: 'black', fontSize: '20px' }} />
    <p className="text">Create</p>
  </button>
)}


        <div className="bell">
          <NotificationsIcon sx={{ color: 'black', fontSize: '25px' }} />
        </div>

        {!userLoggedIn && (
          <div className="sign-in-container" onClick={() => handleLoginLogout("login")}>
            <AccountCircleIcon sx={{ color: '#065fd4', fontSize: '24px' }} />
            <span className="sign-in-text">Sign In</span>
          </div>
        )}

        {userLoggedIn && (
          <div className="profile" onClick={() => setDetails(!details)}>
            <img src={imgUrl} alt="profile" className='h-2' />
          </div>
        )}

        {details && (
          <div className="details-dropdown">
            {!userLoggedIn && <p onClick={() => handleLoginLogout("login")}>Login</p>}
            {userLoggedIn && (
              <>
                <p onClick={() => handleLoginLogout("logout")}>Logout</p>
                {localStorage.getItem("UserChannelId") ? (
                  <p onClick={goToMyChannel}>My Channel</p>
                ) : (
                  <p onClick={() => navigate("/create-channel")}>Create Channel</p>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {loginOpen && <LogIn setLogin={setLoginOpen} />}
      <ToastContainer/>
    </div>
  );
}

export default NavBar;
