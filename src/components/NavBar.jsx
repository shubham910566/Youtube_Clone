import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';


import "./NavBar.css";

function NavBar({toggeleSideBar}) {
  const [imgUrl, setImgUrl] = useState('https://cdn.vectorstock.com/i/preview-1x/62/38/avatar-13-vector-42526238.jpg');
  const [details, setDetails] = useState(false);
  

  return (
    <div className='navbar'>
      <div className="left">
        <MenuIcon sx={{ color: "black" }} className='hover:bg-gray-100 menu-icon' onClick={toggeleSideBar} />
        <YouTubeIcon sx={{ color: "red" }} />
        <p className='font'>YouTube</p>
      </div>

      <div className="mid">
        <div className="search-bar">
          <input type="text" placeholder='Search' className='search-box' />
          <div className="search-icon">
            <SearchIcon sx={{ color: 'black', fontSize: "20px" }} />
          </div>
        </div>
        <div className="mic-icon">
          <MicIcon sx={{ color: 'black', fontSize: '20px' }} />
        </div>
      </div>

      <div className="right">
        <div className="create-button">
          <AddIcon sx={{ color: 'black', fontSize: '20px' }} />
          <p className='text'>Create</p>
        </div>
        <div className="bell">
          <NotificationsIcon sx={{ color: 'black', fontSize: '25px' }} />
        </div>
        <div className="profile" onClick={() => setDetails(!details)}>
          <img src={imgUrl} alt="profile" className='h-2' />
        </div>

        {details && (
          <div className="details-dropdown">
            <p>Login</p>
            <p>Logout</p>
            <p>Register</p>
          </div>
        )}
      </div>
    </div>  
  );
}

export default NavBar;
