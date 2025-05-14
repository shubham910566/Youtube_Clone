import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import LogIn from './Login';
import "./NavBar.css";
import { Link, useNavigate } from 'react-router-dom';

function NavBar({toggleSideBar }) {
  const [imgUrl, setImgUrl] = useState('https://cdn.vectorstock.com/i/preview-1x/62/38/avatar-13-vector-42526238.jpg');
  const [details, setDetails] = useState(false);
  const [Login, setLogin] = useState(false)
  function LoginChecker(value) {
    if (value == "login") {
      setLogin(true)
      setDetails(false)
    }
    else {
      const navigate = useNavigate()
      navigate('/')
    }
  }
  

  return (
    <div className='navbar'>
      <div className="left">
        <MenuIcon sx={{ color: "black" }} className='hover:bg-gray-100 menu-icon' onClick={()=>toggleSideBar ()} />
        <YouTubeIcon sx={{ color: "red" }} />
        <Link to={'/'} className='font'>YouTube</Link>
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
            <p onClick={()=>LoginChecker("login")}>Login</p>
            <p onClick={()=>LoginChecker("logout")}>Logout</p>
            <Link to={ "/signup"}><p>Register</p></Link>
          </div>
        )}
      </div>
      {Login && <LogIn setLogin={setLogin } />}
    </div>  
  );
}

export default NavBar;
