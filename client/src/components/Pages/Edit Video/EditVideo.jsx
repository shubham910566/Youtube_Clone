import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../UploadVideoPage/VideoUpload.css'; // Reuse styles

function EditVideo() {
  const { id } = useParams(); // Get video ID from URL
  const navigate = useNavigate();
  const userId = localStorage.getItem('UserId');

  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    videoType: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch video details on component mount
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/video/${id}`, {
          withCredentials: true,
        });
        const { title, description, videoType } = res.data.video;
        setVideoData({ title, description, videoType });
      } catch (err) {
        setError('Failed to fetch video data');
        toast.error('Failed to fetch video data');
        console.error(err);
      }
    };
    fetchVideo();
  }, [id]);

  // Handle input changes
  const handleChange = (e, field) => {
    setVideoData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Submit updated video
  const handleUpdateVideo = async () => {
    if (!userId) {
      toast.error('You must be logged in to edit videos');
      return;
    }
    if (!videoData.title || !videoData.videoType) {
      toast.error('Title and category are required');
      return;
    }

    try {
      setIsLoading(true);
      await axios.put(
        `http://localhost:8000/api/video/${id}`,
        videoData,
        { withCredentials: true }
      );
      toast.success('Video updated successfully');
      navigate(`/mychannel/${userId}`);
    } catch (err) {
      setError('Failed to update video');
      toast.error(err.response?.data?.error || 'Failed to update video');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-heading">Edit Video</h2>

      <input
        type="text"
        className="upload-input"
        placeholder="Title"
        value={videoData.title}
        onChange={(e) => handleChange(e, 'title')}
      />

      <textarea
        className="upload-textarea"
        placeholder="Description"
        value={videoData.description}
        onChange={(e) => handleChange(e, 'description')}
      />

      <textarea
        className="upload-textarea"
        placeholder="Category"
        value={videoData.videoType}
        onChange={(e) => handleChange(e, 'videoType')}
      />

      <div className="button-group">
        <button
          onClick={handleUpdateVideo}
          className="upload-button"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update'}
        </button>
        <button
          onClick={() => navigate(`/mychannel/${userId}`)}
          className="cancel-button"
        >
          Cancel
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}
      <ToastContainer />
    </div>
  );
}

export default EditVideo;
