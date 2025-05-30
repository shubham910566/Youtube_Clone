import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";


import "./VideoPage.css";

const VideoPage = () => { 
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [editModeId, setEditModeId] = useState(null);
  const [editText, setEditText] = useState("");
  const [suggestionVideos, setSuggestionVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);
  const userId = localStorage.getItem("UserId");

  // Check if the video is a YouTube URL
  const isYouTubeUrl = (url) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  // Extract YouTube embed URL
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    )?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  // Fetch video data by ID
  const fetchVideo = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/video/${id}`);
      console.log("Fetched video:", res.data.video);
      setVideo(res.data.video);
    } catch (err) {
      console.error("Video fetch error:", err);
      toast.error("Unable to load video");
    }
  };

  // Load comments for the current video
  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/comments/${id}`);
      console.log("Fetched comments:", res.data.comments);
      setComments(res.data.comments || []);
    } catch (err) {
      console.error("Comments fetch error:", err);
      toast.error("Unable to load comments");
    }
  };

  // Fetch all videos for suggestions
  const fetchAllVideos = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/videos`);
      console.log("Fetched suggested videos:", res.data.videos);
      setSuggestionVideos(res.data.videos || []);
    } catch (err) {
      console.error("Suggested videos fetch error:", err);
      toast.error("Unable to load suggested videos");
    }
  };

  // Submit new comment
  const submitComment = async () => {
    if (!userId) return toast.error("Login required to comment");
    if (!commentInput.trim()) return toast.error("Comment cannot be empty");

    try {
      await axios.post(
        "http://localhost:8000/comment",
        { user: userId, video: id, message: commentInput },
        { withCredentials: true }
      );
      toast.success("Comment added");
      setCommentInput("");
      fetchComments();
    } catch (err) {
      toast.error("Error adding comment");
    }
  };

  // Like handler
const handleLike = async () => {
    if (!userId) return toast.error("Please log in to like");
    if (isLiking || !video) return;

    setIsLiking(true);
    try {

      const isLiked = video.likes.includes(userId);
      const updatedLikes = isLiked
        ? video.likes.filter((id) => id !== userId)
        : [...video.likes, userId];
      const updatedDislikes = video.dislike.filter((id) => id !== userId);

      setVideo((prev) => ({
        ...prev,
        likes: updatedLikes,
        dislike: updatedDislikes,
      }));
      console.log("Optimistic like update:", { likes: updatedLikes, dislike: updatedDislikes });

      const res = await axios.post(
        `http://localhost:8000/api/video/${video._id}/like`,
        {},
        { withCredentials: true }
      );

      console.log("Like response:", res.data);

      if (res.data.success && res.data.video) {
        setVideo(res.data.video);
        console.log("Server like update:", res.data.video);
      } else {
        setVideo((prev) => ({
          ...prev,
          likes: video.likes || [],
          dislike: video.dislike || []
        }));
        toast.error(res.data.message || "Like failed.");
      }
    } catch (err) {
      setVideo((prev) => ({
        ...prev,
        likes: video.likes,
        dislike: video.dislike,
      }));
      console.error("Like error:", err.response?.data || err.message);
      toast.error("Failed to like video.");
    } finally {
      setIsLiking(false);
    }
  };

  // Dislike handler
  const handleDislike = async () => {
    if (!userId) return toast.error("Please log in to dislike");
    if (isDisliking || !video) return;

    setIsDisliking(true);
    try {

      const isDisliked = video.dislike.includes(userId);
      const updatedDislikes = isDisliked
        ? video.dislike.filter((id) => id !== userId)
        : [...video.dislike, userId];
      const updatedLikes = video.likes.filter((id) => id !== userId);

      setVideo((prev) => ({
        ...prev,
        likes: updatedLikes,
        dislike: updatedDislikes,
      }));
      console.log("Optimistic dislike update:", { likes: updatedLikes, dislike: updatedDislikes });

      const res = await axios.post(
        `http://localhost:8000/api/video/${video._id}/dislike`,
        {},
        { withCredentials: true }
      );

      console.log("Dislike response:", res.data);

      if (res.data.success && res.data.video) {
        setVideo(res.data.video);
        console.log("Server dislike update:", res.data.video);
      } else {
        setVideo((prev) => ({
          ...prev,
          likes: video.likes,
          dislike: video.dislike,
        }));
        toast.error(res.data.message || "Dislike failed.");
      }
    } catch (err) {
      setVideo((prev) => ({
        ...prev,
        likes: video.likes,
        dislike: video.dislike,
      }));
      console.error("Dislike error:", err.response?.data || err.message);
      toast.error("Failed to dislike video.");
    } finally {
      setIsDisliking(false);
    }
  };

  // Activate edit mode
  const startEditComment = (commentId, currentMessage) => {
    setEditModeId(commentId);
    setEditText(currentMessage);
  };

  // Save edited comment
  const saveEditedComment = async (commentId) => {
    if (!editText.trim()) return toast.error("Comment cannot be empty");

    try {
      await axios.put(
        `http://localhost:8000/comment/${commentId}`,
        { message: editText },
        { withCredentials: true }
      );
      toast.success("Comment updated");
      setEditModeId(null);
      setEditText("");
      fetchComments();
    } catch (err) {
      toast.error("Failed to update comment");
    }
  };

  // Delete comment
  const deleteComment = async (commentId) => {
    if (!userId) return toast.error("You must be logged in to delete");

    try {
      await axios.delete(`http://localhost:8000/comment/${commentId}`, {
        withCredentials: true,
      });
      toast.success("Comment deleted");
      fetchComments();
    } catch (err) {
      toast.error("Failed to delete comment");
    }
  };

  // Load video, comments, and suggested videos when id changes
  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    setVideo(null);
    setComments([]);
    setSuggestionVideos([]);
    setIsLoading(true);

    Promise.all([fetchVideo(), fetchComments(), fetchAllVideos()])
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <div>Loading video...</div>;
  if (!video) return <div>Failed to load video</div>;

  return (
      <div className="video-page">
      <div className="video-main">
        <div className="video-player">
          {isYouTubeUrl(video.videoLink) ? (
            <iframe
              width="100%"
              height="420"
              src={getYouTubeEmbedUrl(video.videoLink)}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <video width="100%" controls autoPlay className="video-player-element">
              <source src={video.videoLink} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <div className="video-details">
          <h1 className="video-title">{video.title}</h1>
          <div className="video-profile">
            <div className="video-profile-left">
              <Link to={`/profile/${video.user?._id}`} className="video-profile-avatar">
                <img
                  src={video.user?.profilePic || "https://via.placeholder.com/40"}
                  alt="Avatar"
                  className="video-profile-image"
                />
              </Link>
              <Link to={`/profile/${video.user?._id}`} className="video-profile-info">
                <span className="video-channel-name">{video.user?.channelName || "Unknown"}</span>
                <span className="video-upload-date">1M subscribers</span>
              </Link>
              <button className="video-subscribe-btn">Subscribe</button>
            </div>

            <div className="video-actions">
              <div
                className="video-action-like"
                onClick={handleLike}
                style={{ pointerEvents: isLiking ? "none" : "auto", opacity: isLiking ? 0.5 : 1 }}
              >
                <ThumbUpOffAltIcon style={{ color: video?.likes.includes?.(userId) ? "#065fd4" : "#030303" }}/>
                <span>{video.likes?.length || 0}</span>
              </div>
              <div className="video-action-divider"></div>
              <div
                className="video-action-dislike"
                onClick={handleDislike}
                style={{ pointerEvents: isDisliking ? "none" : "auto", opacity: isDisliking ? 0.5 : 1 }}
              >
                <ThumbDownOffAltIcon style={{ color: video?.dislike.includes?.(userId) ? "#065fd4" : "#030303" }} />
                <span>{video.dislike?.length || 0}</span>
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
            <span>
              <b>20K views {new Date(video.createdAt).toDateString().split(" ").slice(1).join(" ")}</b>
            </span>
            <span>{video.videoType}</span>
          </div>

          <p className="video-description">{video.description}</p>
        </div>

        <div className="video-comments">
          <h2 className="video-comments-title">{comments.length} Comments</h2>
          <div className="video-comment-input">
            <img
              src={localStorage.getItem("UserProfilePic") || "https://via.placeholder.com/40"}
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
                <button onClick={() => setCommentInput("")} className="video-comment-cancel">
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
                  src={comment.user?.profilePic || "https://via.placeholder.com/40"}
                  alt="Comment Avatar"
                  className="video-comment-avatar"
                />
                <div className="video-comment-content">
                  <div className="video-comment-header">
                    <span className="video-comment-channel">{comment.user?.channelName || "Unknown"}</span>
                    <span className="video-comment-date">{new Date(comment.createdAt).toDateString()}</span>
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

      <div className="video-suggestions"> 
        {suggestionVideos.length === 0 ? (
          <div>No suggested videos available</div>
        ) : (
          suggestionVideos
            .filter((v) => v._id !== id)
            .map((video) => (
              <Link to={`/video/${video._id}`} className="video-suggestion" key={video._id}>
                <div className="video-suggestion-thumbnail">
                  <img
                    src={video.thumbnail || "https://via.placeholder.com/150"}
                    alt="Suggested Video"
                    className="video-suggestion-img"
                  />
                </div>
                <div className="video-suggestion-info">
                  <h3 className="video-suggestion-title">{video.title || "Untitled"}</h3>
                  <span className="video-suggestion-channel">{video.user?.channelName || "Unknown"}</span>
                  <span className="video-suggestion-meta">200K views • 5 days ago</span>
                </div>
              </Link>
            ))
        )}
      </div>

      <ToastContainer style={{overflow:"hidden"}}/>
    </div>
  );
};

export default VideoPage;