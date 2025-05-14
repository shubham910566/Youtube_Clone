import React from 'react';
import './ProfilePage.css';
import Sidebar from './Sidebar';
import { CiSearch } from "react-icons/ci";



const ProfilePage = ({ showSideBar }) => {
  return (
    <div className="profile-container">
      {showSideBar && <Sidebar/>}
      <div className={showSideBar ? 'profile-content with-sidebar' : 'profile-content without-sidebar'}>
        <div className="profile-banner">
          <img
            src="http://images6.fanpop.com/image/photos/37400000/Jon-Snow-Season-4-jon-snow-37478520-4912-7360.jpg"
            alt="Channel Banner"
            className="profile-banner-img"
          />
        </div>

        <div className="profile-header">
          <div className="profile-avatar">
            <img
              src="http://images6.fanpop.com/image/photos/37400000/Jon-Snow-Season-4-jon-snow-37478520-4912-7360.jpg"
              alt="Channel Avatar"
              className="profile-avatar-img"
            />
          </div>
          <div className="profile-info">
            <h1 className="profile-channel-name">Creative Studio</h1>
            <p className="profile-meta">@CreativeStudio • 250K subscribers • 120 videos</p>
            <p className="profile-description">
              Welcome to Creative Studio. We share inspiring tutorials art projects.
            </p>
            <div className="profile-links">
              <a href="https://instagram.com/creativestudio" className="profile-link">instagram.com/creativestudio</a>
              <span className="profile-link-divider">•</span>
              <a href="#" className="profile-link">More Links</a>
            </div>
            <div className="profile-actions">
              <button className="profile-subscribe-btn">Subscribe</button>
              <button className="profile-join-btn">Join</button>
            </div>
          </div>
        </div>

        <div className="profile-tabs">
          <button className="profile-tab active">Home</button>
          <button className="profile-tab">Videos</button>
          <button className="profile-tab">Shorts</button>
          <button className="profile-tab">Live</button>
          <button className="profile-tab">Playlist</button>
          <button className="profile-tab"><CiSearch /></button>
        </div>

        <div className="profile-featured">
          <div className="profile-featured-video">
            <img
              src="http://images6.fanpop.com/image/photos/37400000/Jon-Snow-Season-4-jon-snow-37478520-4912-7360.jpg"
              alt="Featured Video"
              className="profile-featured-img"
            />
            <div className="profile-featured-details">
              <h2 className="profile-featured-title">Art Project: DIY Canvas Painting Tutorial</h2>
              <p className="profile-featured-meta">Published on May 12, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;