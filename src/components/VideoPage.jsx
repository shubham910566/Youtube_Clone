import React from 'react';
import './VideoPage.css';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

const VideoPage = ({ showSideBar }) => {
  return (
    <div className="video-page">
      <div className="video-main">
        <div className="video-player">
          <video width="100%" controls autoPlay className="video-player-element">
            <source src="https://www.youtube.com/embed/sample-video" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="video-details">
          <h1 className="video-title">
            hello Everyone this is the first video page 
          </h1>
          <div className="video-profile">
            <div className="video-profile-left">
              <Link to="/profile/2" className="video-profile-avatar">
                <img
                  className="video-profile-image"
                  src="https://via.placeholder.com/40"
                  alt="Channel Avatar"
                />
              </Link>
              <Link to ={'/profile/232'} className="video-profile-info">
                <span className="video-channel-name">Shubham Dhasmana</span>
                <span className="video-upload-date">2027-07-09</span>
              </Link>
              <button className="video-subscribe-btn">Subscribe</button>
            </div>
            <div className="video-actions">
              <div className="video-action-like">
                <ThumbUpOffAltIcon />
                <span className="video-like-count">32</span>
              </div>
              <div className="video-action-divider"></div>
              <div className="video-action-dislike">
                <ThumbDownOffAltIcon />
              </div>
              <div className="video-action-divider"></div>
              <div className="video-action-share">
                <ShareIcon />
              </div>
              <div className="video-action-divider"></div>
              <div className="video-action-more">
                <MoreVertIcon />
              </div>
            </div>
          </div>
          <div className="video-meta">
            <span>2024-09-30</span>
            <span>Know Your Company</span>
          </div>
        </div>

        <div className="video-comments">
          <h2 className="video-comments-title">2 Comments</h2>
          <div className="video-comment-input">
            <img
              className="video-comment-avatar"
              src="https://via.placeholder.com/40"
              alt="User Avatar"
            />
            <div className="video-comment-form">
              <input
                type="text"
                className="video-comment-input-field"
                placeholder="Add a comment"
              />
              <div className="video-comment-actions">
                <button className="video-comment-cancel">Cancel</button>
                <button className="video-comment-submit">Comment</button>
              </div>
            </div>
          </div>
          <div className="video-comment-list">
            {Array(3).fill().map((_, index) => (
              <div className="video-comment" key={index}>
                <img
                  className="video-comment-avatar"
                  src="https://via.placeholder.com/40"
                  alt="User Avatar"
                />
                <div className="video-comment-content">
                  <div className="video-comment-header">
                    <span className="video-comment-channel">UserName</span>
                    <span className="video-comment-date">2024-09-08</span>
                  </div>
                  <p className="video-comment-text">Hello, this is good!</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`video-suggestions ${showSideBar ? 'with-sidebar' : 'without-sidebar'}`}>
        {Array(3).fill().map((_, index) => (
          <div className="video-suggestion" key={index}>
            <div className="video-suggestion-thumbnail">
              <img
                src="https://via.placeholder.com/168x94"
                alt="Suggested Video"
                className="video-suggestion-img"
              />
            </div>
            <div className="video-suggestion-info">
              <h3 className="video-suggestion-title">
                Hello Everyone I am developing my Youtbe clone
              </h3>
              <span className="video-suggestion-channel">Cricket 320</span>
              <span className="video-suggestion-meta">136K views • 1 day ago</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPage;