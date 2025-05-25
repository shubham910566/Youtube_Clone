import React from 'react';
import './Sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { GoVideo } from "react-icons/go";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Link } from 'react-router-dom';

function Sidebar() {
  const subscriptions = [
    { name: "Aaj Tak", img: "https://www.bizasialive.com/wp-content/uploads/2021/01/aajtak001.jpg" },
    { name: "NDTV", img: "https://logowik.com/content/uploads/images/ndtv9182.logowik.com.webp" },
    { name: "BBC News", img: "https://download.logo.wine/logo/BBC_News/BBC_News-Logo.wine.png" },
    { name: "Tech Burner", img: "https://tse3.mm.bing.net/th?id=OIP.aD2evi54ahP1J63aJ_vKSQHaHa&pid=Api&P=0&h=180" },
    { name: "MrBeast", img: "https://up.yimg.com/ib/th?id=OIP.F547algTHyaU4ftbzU25OgHaEo&pid=Api&rs=1&c=1&qlt=95&w=169&h=106" }
  ];

  return (
    <div className="sidebar-main bg-white h-screen w-64 p-4 shadow-md overflow-visible">
      {/* Navigation Section */}
      <div className="sidebar-top">
        <Link to='/' className="field">
          <HomeIcon className="icon" />
          <span>Home</span>
        </Link>  
        <div className="field">
          <PlayArrowIcon className="icon" />
          <span>Shorts</span>
        </div>
        <div className="field">
          <SubscriptionsIcon className="icon" />
          <span>Subscriptions</span>
        </div>
      </div>

      {/* Library Section */}
      <div className="my-collection mt-6 border-t pt-4">
        <div className="field">
          <KeyboardArrowRightOutlinedIcon className="icon" />
          <span>You</span>
        </div>
        <div className="field">
          <HistoryIcon className="icon" />
          <span>History</span>
        </div>
        <div className="field">
          <PlaylistPlayIcon className="icon" />
          <span>Playlists</span>
        </div>
        <div className="field">
          <GoVideo className="icon" />
          <span>Your Videos</span>
        </div>
        <div className="field">
          <WatchLaterOutlinedIcon className="icon" />
          <span>Watch Later</span>
        </div>
        <div className="field">
          <ThumbUpAltOutlinedIcon className="icon" />
          <span>Liked Videos</span>
        </div>
      </div>

      {/* Subscriptions Section */}
      <div className="subscriptions mt-6 border-t pt-4">
        <h2 className="section-title">Subscriptions</h2>
        {subscriptions.map((channel, index) => (
          <div className="field" key={index}>
            <img src={channel.img} alt={channel.name} className="channel-img" />
            <span className="ml-3 ">{channel.name}</span>
            <NotificationsNoneOutlinedIcon className="ml-auto text-gray-400" style={{ fontSize: 18 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
