import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import Sidebar from '../../Navbar/SideBar/Sidebar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = ({ showSideBar }) => {
  const { id } = useParams(); // extract channel ID from URL
  const [videos, setVideos] = useState([]); // store channel's video list
  const [activeTab, setActiveTab] = useState('Home'); // Control which tab is active

  // fetch channel data when component mounts or ID changes
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/channel/${id}`);
        setVideos(response.data.videos || []);
        setUser(response.data.user || null); 
      } catch (error) {
        console.error('Error fetching channel videos:', error);
      }
    };

    fetchChannel();
  }, [id]);

  

  // Extract first video to display as a "featured" item
  const firstVideo = videos[0];

  // Derive user info from first video's user field 
  const user = firstVideo?.user;

  // Render tab-specific content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Videos':
        return (
          <div className="profile-videos">
            {videos.length > 0 ? (
              videos.map((video) => (
                <div key={video._id} className="profile-video-card">
                  <Link to={`/video/${video._id}`} className="profile-video-link">
                    <div className="profile-video-thumbnail-container">
                      <img
                        src={video.thumbnail || 'https://via.placeholder.com/320x180'}
                        alt={video.title}
                        className="profile-video-thumbnail"
                      />
                      {/* Placeholder duration – ideally replace with real video length as i used self written length */}
                      <span className="profile-video-duration">8:60</span>
                    </div>
                    <h3 className="profile-video-title">{video.title}</h3>
                    <p className="profile-video-meta">
                      Published on {new Date(video.createdAt).toLocaleDateString()}
                    </p>
                  </Link>
                </div>
              ))
            ) : (
              <p className="profile-no-videos">No videos available</p>
            )}
          </div>
        );

      case 'Shorts':
        return <div className="profile-tab-content">No Shorts available</div>;

      case 'Live':
        return <div className="profile-tab-content">No Live streams available</div>;

      case 'Playlist':
        return <div className="profile-tab-content">No Playlists available</div>;

      // Default "Home" tab shows featured video
      default:
        return (
          <div className="profile-featured">
            {firstVideo ? (
              <div className="profile-featured-video">
                <img
                  src={firstVideo.thumbnail || 'https://via.placeholder.com/560x315'}
                  alt="Featured Video"
                  className="profile-featured-img"
                />
                <div className="profile-featured-details">
                  <h2 className="profile-featured-title">{firstVideo.title}</h2>
                  <p className="profile-featured-meta">
                    Published on {new Date(firstVideo.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ) : (
              <p>No featured video available</p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="profile-container">
      {/* Conditional rendering of sidebar */}
      {showSideBar && <Sidebar />}

      <div className={showSideBar ? 'profile-content with-sidebar' : 'profile-content without-sidebar'}>
        {/* Header section with channel info */}
        <div className="profile-header">
          <div className="profile-avatar">
            <img
              src={user?.profilePic || 'https://via.placeholder.com/120'}
              alt="Channel Avatar"
              className="profile-avatar-img"
            />
          </div>

          <div className="profile-info">
            <h1 className="profile-channel-name">{user?.channelName || 'Unknown Channel'}</h1>
            <p className="profile-meta">
              @{user?.userName || 'channel'} • {videos.length} videos
            </p>
            <p className="profile-description">{user?.about || 'No description available'}</p>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="profile-tabs">
          {['Home', 'Videos', 'Shorts', 'Live', 'Playlist'].map((tab) => (
            <button
              key={tab}
              className={`profile-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Render content based on active tab */}
        <div className="profile-tab-content">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
