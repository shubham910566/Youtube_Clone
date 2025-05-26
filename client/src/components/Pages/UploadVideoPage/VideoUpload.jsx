import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './VideoUpload.css';

function VideoUpload() {
  // Retrieve the logged-in user ID from local storage
  const userId = localStorage.getItem('UserId');

  // Define state for storing video metadata
  const [videoData, setVideoData] = useState({
    user: userId,
    title: '',
    description: '',
    videoType: '',
    videoLink: '',
    thumbnail: '',
  });

  const [isLoading, setIsLoading] = useState(false); // To manage loading UI state
  const [error, setError] = useState(null); // To track any upload-related errors
  const navigate = useNavigate(); // For programmatic navigation

  // Submit final video data (metadata) to the backend
  const handleUploadVideo = async () => {
    // validate required fields
    if (!videoData.videoLink) return toast.error('Please upload a video');
    if (!videoData.title) return toast.error('Title is required');

    try {
      // send video metadata to backend API
      const res = await axios.post('http://localhost:8000/api/video', videoData, {
        withCredentials: true,
      });
      toast.success('Video added successfully');
      navigate('/'); // Redirect to homepage after successful upload
    } catch (err) {
      console.error('Error uploading video metadata:', err);
      toast.error('Failed to upload video metadata');
    }
  };

  // Handles actual video file upload to Cloudinary
  const uploadVideo = async (e) => {
    const video = e.target.files[0];
    if (!video) return toast.error('Please select a video file');

    // Limit file size to 40MB
    const maxSize = 40 * 1024 * 1024; // 40 MB in bytes
    if (video.size > maxSize) {
      toast.error('File size exceeds 40 MB. Please upload a video less than 40 MB.');
      setError('File size exceeds 40 MB');
      e.target.value = ''; // Reset file input to allow re-upload
      return;
    }

    // Prepare FormData for Cloudinary upload
    const data = new FormData();
    data.append('file', video);
    data.append('upload_preset', 'youtube-clone');

    try {
      setIsLoading(true); // Show loading spinner
      setError(null);     // Clear any previous error
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dldpmvy2l/video/upload',
        data
      );
      const videoUrl = response.data.url;

      // Save uploaded video URL to state
      setVideoData((prev) => ({ ...prev, videoLink: videoUrl }));
      toast.success('Video uploaded to Cloudinary');
    } catch (err) {
      setError('Video upload failed');
      toast.error('Video upload failed');
      console.error('Error uploading video:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handles thumbnail image upload to Cloudinary
  const uploadImage = async (e) => {
    const image = e.target.files[0];
    if (!image) return toast.error('Please select a thumbnail');

    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'youtube-clone');

    try {
      setIsLoading(true);
      setError(null); // Clear any previous error
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dldpmvy2l/image/upload',
        data
      );
      const imageUrl = response.data.url;

      // Save uploaded image URL as the video thumbnail
      setVideoData((prev) => ({ ...prev, thumbnail: imageUrl }));
      toast.success('Thumbnail uploaded successfully');
    } catch (err) {
      setError('Thumbnail upload failed');
      toast.error('Thumbnail upload failed');
      console.error('Error uploading thumbnail:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-heading">Upload New Video</h2>

      {/* Video title input */}
      <input
        type="text"
        className="upload-input"
        placeholder="Title"
        value={videoData.title}
        onChange={(e) =>
          setVideoData((prev) => ({ ...prev, title: e.target.value }))
        }
      />

      {/* Video description input */}
      <textarea
        className="upload-textarea"
        placeholder="Description"
        value={videoData.description}
        onChange={(e) =>
          setVideoData((prev) => ({ ...prev, description: e.target.value }))
        }
      />

      {/* Video category/type input */}
      <textarea
        className="upload-textarea"
        placeholder="Category"
        value={videoData.videoType}
        onChange={(e) =>
          setVideoData((prev) => ({ ...prev, videoType: e.target.value }))
        }
      />

      {/* Video file upload input */}
      <label className="upload-label">Upload Video:</label>
      <input
        type="file"
        accept="video/*"
        className="upload-file"
        onChange={uploadVideo}
      />

      {/* Thumbnail image upload input */}
      <label className="upload-label">Upload Thumbnail:</label>
      <input
        type="file"
        accept="image/*"
        className="upload-file"
        onChange={uploadImage}
      />

      {/* Show thumbnail preview if available */}
      {videoData.thumbnail && (
        <img
          src={videoData.thumbnail}
          alt="Thumbnail"
          className="thumbnail-preview"
        />
      )}

      {/* Upload and Cancel buttons */}
      <div className="button-group">
        <button
          onClick={handleUploadVideo}
          className="upload-button"
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
        <button onClick={() => navigate('/')} className="cancel-button">
          Cancel
        </button>
      </div>

      {/* Show error message if any */}
      {error && <p className="error-text">{error}</p>}

      {/* Notification container */}
      <ToastContainer />
    </div>
  );
}

export default VideoUpload;
