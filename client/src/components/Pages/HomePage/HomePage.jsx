import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../Navbar/SideBar/Sidebar';

function HomePage({ showSideBar, searchQuery }) {
  const [data, setData] = useState([]); // Stores filtered videos to be displayed
  const [videoTypes, setVideoTypes] = useState([]); // Stores all unique video categories
  const [selectedType, setSelectedType] = useState('all'); // Currently selected video category

  useEffect(() => {
    const fetchVideosAndTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/videos');
        const allVideos = response.data.videos;

        // Extract unique video types from the response
        const uniqueTypes = ['all', ...new Set(allVideos.map(video => video.videoType))];
        setVideoTypes(uniqueTypes);

        // Filter videos based on search input
        let filtered = allVideos;
        if (searchQuery) {
          filtered = filtered.filter(video =>
            video.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        // Further filter videos by selected type if not "all"
        if (selectedType !== 'all') {
          filtered = filtered.filter(video => video.videoType === selectedType);
        }

        // Set the final list of videos to display
        setData(filtered);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };

    // Call the function whenever searchQuery or selectedType changes
    fetchVideosAndTypes();
  }, [searchQuery, selectedType]);

  // Update selected video type when a tab is clicked
  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="homepage-content">
      {/* Top bar with video category filters */}
      <div className={`top-bar ${showSideBar ? 'with_sidebar' : 'without_sidebar'}`}>
        {videoTypes.map((type, index) => (
          <div
            className={`top-icon ${selectedType === type ? 'active' : ''}`}
            key={index}
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </div>
        ))}
      </div>

      {/* Video display section */}
      <div className={`show-videos ${showSideBar ? 'with_sidebar' : 'without_sidebar'}`}>
        {data.length > 0 ? (
          data.map((item) => {
            // to see when video was created in hours, days or minutes
                const createdAt = new Date(item.createdAt);
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
            return (
              <Link to={`/video/${item._id}`} className={`video-box ${showSideBar ? 'with_sidebar' : 'without_sidebar'}`} key={item._id}>
                <div className="thumbnail-box">
                  <img src={item.thumbnail} alt="Video Thumbnail" />
                  <p className="time">07:40</p> {/* Placeholder time */}
                </div>
                <div className="video_detail_box">
                  <div className="image">
                    <img src={item.user?.profilePic} className='img' />
                  </div>
                  <div className="text">
                    <b className="title">{item.title}</b>
                    <p className="channel-name">{item.user?.channelName}</p>
                    <p className="views">{item.views || 20}k views . {timeAgo}</p> {/* Static timestamp */}
                  </div>
                </div>
              </Link>
            )
          })
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
