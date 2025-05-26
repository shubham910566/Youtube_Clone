import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Sidebar from '../../Navbar/SideBar/Sidebar';

import './VideoPage.css';

const VideoPage = ({ showSideBar }) => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [editModeId, setEditModeId] = useState(null);
  const [editText, setEditText] = useState('');
  const [suggestionVideos, setSuggestionVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const userId = localStorage.getItem('UserId');

  // Fetch video data by ID
  const fetchVideo = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/video/${id}`);
      console.log('Fetched video:', res.data.video); // Debug
      setVideo(res.data.video);
    } catch (err) {
      console.error('Video fetch error:', err);
      toast.error('Unable to load video');
    }
  };

  // Load comments for the current video
  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/comments/${id}`);
      console.log('Fetched comments:', res.data.comments); // Debug
      setComments(res.data.comments || []);
    } catch (err) {
      console.error('Comments fetch error:', err);
      toast.error('Unable to load comments');
    }
  };

  // Fetch all videos for suggestions
  const fetchAllVideos = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/videos`);
      console.log('Fetched suggested videos:', res.data.videos); // Debug
      setSuggestionVideos(res.data.videos || []);
    } catch (err) {
      console.error('Suggested videos fetch error:', err);
      toast.error('Unable to load suggested videos');
    }
  };

  // Submit new comment
  const submitComment = async () => {
    if (!userId) return toast.error('Login required to comment');
    if (!commentInput.trim()) return toast.error('Comment cannot be empty');

    try {
      await axios.post(
        'http://localhost:8000/comment',
        { user: userId, video: id, message: commentInput },
        { withCredentials: true }
      );
      toast.success('Comment added');
      setCommentInput('');
      fetchComments();
    } catch (err) {
      toast.error('Error adding comment');
    }
  };

  // Like handler
  const handleLike = async () => {
    if (!userId) return toast.error('Please log in to like');
    try {
      const res = await axios.post(
        `http://localhost:8000/api/video/${id}/like`,
        {},
        { withCredentials: true }
      );
      setVideo({ ...video, like: res.data.video.like, dislike: res.data.video.dislike });
    } catch (err) {
      toast.error('Failed to update like');
    }
  };

  // Dislike handler
  const handleDislike = async () => {
    if (!userId) return toast.error('Please log in to dislike');
    try {
      const res = await axios.post(
        `http://localhost:8000/api/video/${id}/dislike`,
        {},
        { withCredentials: true }
      );
      setVideo({ ...video, like: res.data.video.like, dislike: res.data.video.dislike });
    } catch (err) {
      toast.error('Failed to update dislike');
    }
  };

  // Activate edit mode
  const startEditComment = (commentId, currentMessage) => {
    setEditModeId(commentId);
    setEditText(currentMessage);
  };

  // Save edited comment
  const saveEditedComment = async (commentId) => {
    if (!editText.trim()) return toast.error('Comment cannot be empty');

    try {
      await axios.put(
        `http://localhost:8000/comment/${commentId}`,
        { message: editText },
        { withCredentials: true }
      );
      toast.success('Comment updated');
      setEditModeId(null);
      setEditText('');
      fetchComments();
    } catch (err) {
      toast.error('Failed to update comment');
    }
  };

  // Delete comment
  const deleteComment = async (commentId) => {
    if (!userId) return toast.error('You must be logged in to delete');

    try {
      await axios.delete(`http://localhost:8000/comment/${commentId}`, {
        withCredentials: true
      });
      toast.success('Comment deleted');
      fetchComments();
    } catch (err) {
      toast.error('Failed to delete comment');
    }
  };

  // Load video, comments, and suggested videos when id changes
  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    // Reset states to avoid stale data
    setVideo(null);
    setComments([]);
    setSuggestionVideos([]);
    setIsLoading(true);

    // Fetch all data
    Promise.all([fetchVideo(), fetchComments(), fetchAllVideos()])
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <div>Loading video...</div>;
  if (!video) return <div>Failed to load video</div>;

  return (
  
    <div className={`video-page ${showSideBar ? 'sidebar-active' : ''}`}>
       
      <div className="video-main">
        <div className="video-player">
          <video width="100%" controls autoPlay className="video-player-element">
            <source src={video.videoLink} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="video-details">
          <h1 className="video-title">{video.title}</h1>
          <div className="video-profile">
            <div className="video-profile-left">
              <Link to={`/profile/${video.user?._id}`} className="video-profile-avatar">
                <img
                  src={video.user?.profilePic || 'https://via.placeholder.com/40'}
                  alt="Avatar"
                  className="video-profile-image"
                />
              </Link>
              <Link to={`/profile/${video.user?._id}`} className="video-profile-info">
                <span className="video-channel-name">{video.user?.channelName || 'Unknown'}</span>
                <span className="video-upload-date">1M subscribers</span>
              </Link>
              <button className="video-subscribe-btn">Subscribe</button>
            </div>

            <div className="video-actions">
              <div className="video-action-like" onClick={handleLike}>
                <ThumbUpOffAltIcon />
                <span>{video.like || 0}</span>
              </div>
              <div className="video-action-divider"></div>
              <div className="video-action-dislike" onClick={handleDislike}>
                <ThumbDownOffAltIcon />
                <span>{video.dislike || 0}</span>
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
            <span><b>20K views {new Date(video.createdAt).toDateString().split(' ').slice(1).join(' ')}</b></span>
            <span>{video.videoType}</span>
          </div>

          <p className="video-description">{video.description}</p>
        </div>

        <div className="video-comments">
          <h2 className="video-comments-title">{comments.length} Comments</h2>
          <div className="video-comment-input">
            <img
              src={localStorage.getItem('UserProfilePic') || 'https://via.placeholder.com/40'}
              alt="User Avatar"
              className="video-comment-avatar"
            />
            <div className="video-comment-form">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add a comment"
                className="video-comment-input-field"
              />
              <div className="video-comment-actions">
                <button onClick={() => setCommentInput('')} className="video-comment-cancel">
                  Cancel
                </button>
                <button onClick={submitComment} className="video-comment-submit">
                  Comment
                </button>
              </div>
            </div>
          </div>

          <div className="video-comment-list">
            {comments.map((comment) => (
              <div className="video-comment" key={comment._id}>
                <img
                  src={comment.user?.profilePic || 'https://via.placeholder.com/40'}
                  alt="Comment Avatar"
                  className="video-comment-avatar"
                />
                <div className="video-comment-content">
                  <div className="video-comment-header">
                    <span className="video-comment-channel">{comment.user?.channelName || 'Unknown'}</span>
                    <span className="video-comment-date">
                      {new Date(comment.createdAt).toDateString()}
                    </span>
                  </div>
                  {editModeId === comment._id ? (
                    <div className="video-comment-edit">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="video-comment-input-field"
                      />
                      <div className="video-comment-actions">
                        <button onClick={() => setEditModeId(null)} className="video-comment-cancel">
                          Cancel
                        </button>
                        <button
                          onClick={() => saveEditedComment(comment._id)}
                          className="video-comment-submit"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="video-comment-text">{comment.message}</p>
                      {comment.user?._id === userId && (
                        <div className="video-comment-actions">
                          <button
                            className="video-comment-edit-btn"
                            onClick={() => startEditComment(comment._id, comment.message)}
                          >
                            Edit
                          </button>
                          <button
                            className="video-comment-delete-btn"
                            onClick={() => deleteComment(comment._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested videos sidebar */}
      <div className={`video-suggestions ${showSideBar ? 'with-sidebar' : 'without-sidebar'}`}>
        {suggestionVideos.length === 0 ? (
          <div>No suggested videos available</div>
        ) : (
          suggestionVideos
            .filter((v) => v._id !== id)
            .map((video) => (
              <Link to={`/video/${video._id}`} className="video-suggestion" key={video._id}>
                <div className="video-suggestion-thumbnail">
                  <img
                    src={video.thumbnail || 'https://via.placeholder.com/150'}
                    alt="Suggested Video"
                    className="video-suggestion-img"
                  />
                </div>
                <div className="video-suggestion-info">
                  <h3 className="video-suggestion-title">{video.title || 'Untitled'}</h3>
                  <span className="video-suggestion-channel">{video.user?.channelName || 'Unknown'}</span>
                  <span className="video-suggestion-meta">200K views • 5 days ago</span>
                </div>
              </Link>
            ))
        )}
        </div>

        <ToastContainer />
        
    </div>
  );
};

export default VideoPage;