
import React, { useState, useEffect } from 'react';
import Sidebar from '../../Navbar/SideBar/Sidebar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

// Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MyChannelPage.css';

const MyChannelPage = ({ showSideBar }) => {
  const { id } = useParams(); // Get user ID from URL params

  // State variables
  const [videos, setVideos] = useState([]);
  const [channel, setChannel] = useState(null);
  const [activeTab, setActiveTab] = useState('Home');
  const [userpic] = useState(localStorage.getItem('UserProfilePic'));
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);

  // Fetch channel details and videos when component mounts or user ID changes
  useEffect(() => {
    const fetchChannelDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/channel/by-user/${id}`);
        setChannel(res.data);
      } catch (error) {
        console.error('Failed to fetch channel details:', error);
        toast.error('Failed to fetch channel details');
      }
    };

    const fetchChannelVideos = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/channel/${id}`);
        setVideos(res.data.videos || []);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
        toast.error('Failed to fetch videos');
      }
    };

    fetchChannelDetails();
    fetchChannelVideos();
  }, [id]);

  // Handle delete button click
  const handleDeleteClick = (videoId) => {
    setVideoToDelete(videoId);
    setShowDeleteDialog(true);
  };

  // Confirm delete: make API call and update UI
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/video/${videoToDelete}`, {
        withCredentials: true,
      });
      setVideos(videos.filter((v) => v._id !== videoToDelete));
      toast.success('Video deleted successfully');
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete video');
    } finally {
      setShowDeleteDialog(false);
      setVideoToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setVideoToDelete(null);
  };

  // Render different tab contents based on activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Videos':
        return (
          <div className="profile-videos">
            {videos.length > 0 ? (
              
              videos.map((video) => {
                // to see when video was created in hours, days or minutes
                const createdAt = new Date(video.createdAt);
                const now = new Date();
                const diffInMs = now - createdAt;
                const daysAgo = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

                let timeAgo;
                if (daysAgo > 0) {
                  timeAgo = `${daysAgo} days ago`;
                } else {
                  const hoursAgo = Math.floor(diffInMs / (1000 * 60 * 60));
                  if (hoursAgo > 0) {
                    timeAgo = `${hoursAgo} hours ago`;
                  } else {
                    const minutesAgo = Math.floor(diffInMs / (1000 * 60));
                    timeAgo = `${minutesAgo} minutes ago`;
                  }
                }

                 return(
                <div key={video._id} className="profile-video-card">
                  <Link to={`/video/${video._id}`} className="profile-video-link">
                    <div className="profile-video-thumbnail-container">
                      <img
                        src={video.thumbnail || 'https://via.placeholder.com/320x180'}
                        alt={video.title}
                        className="profile-video-thumbnail"
                      />
                      {/* Hardcoded duration placeholder */}
                      <span className="profile-video-duration">8:60</span>
                    </div>
                    <h3 className="profile-video-title">{video.title}</h3>
                    <p className="profile-video-meta">
                      20k views · {timeAgo}  {/* Hardcoded views  */}
                    </p>
                  </Link>
                  <div className="profile-video-actions">
                    <button onClick={() => handleDeleteClick(video._id)} className="delete-btn">
                      Delete
                    </button>
                    <Link to={`/edit-video/${video._id}`} className="edit-btn">
                      Edit
                    </Link>
                  </div>
                </div>
              )})
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
      default:
        // Default to featured video (first video in the list)
        const firstVideo = videos[0];
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
    

      <div className={showSideBar ? 'profile-content with-sidebar' : 'profile-content without-sidebar'}>
        {channel && (
          <>
            <div className="profile-banner">
              <img
                src={channel.channelBanner}
                alt="Channel Banner"
                className="profile-banner-img"
              />
            </div>

            <div className="profile-header">
              <div className="profile-avatar">
                <img
                  src={userpic || 'https://via.placeholder.com/120'}
                  alt="Channel Avatar"
                  className="profile-avatar-img"
                />
              </div>
              <div className="profile-info">
                <h1 className="profile-channel-name">{channel.channelName}</h1>
                <p className="profile-meta">
                  @{channel._id?.slice(0, 6)} • {videos.length} videos
                </p>
                <p className="profile-description">{channel.description}</p>
              </div>
            </div>
          </>
        )}

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

        <div className="profile-tab-content">{renderTabContent()}</div>

        {/* Delete confirmation dialog */}
        {showDeleteDialog && (
          <div className="delete-dialog">
            <div className="delete-dialog-content">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete this video? This action cannot be undone.</p>
              <div className="delete-dialog-actions">
                <button onClick={handleDeleteCancel} className="delete-dialog-cancel">
                  Cancel
                </button>
                <button onClick={handleDeleteConfirm} className="delete-dialog-confirm">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer style={{overflow:"hidden"}}/>
    </div>
  );
};

export default MyChannelPage;
