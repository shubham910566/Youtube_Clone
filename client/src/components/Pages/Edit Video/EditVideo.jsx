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
    videoLink: '',
    thumbnail: '', 
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null); // State for thumbnail file

  // Fetch video details on component mount
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/video/${id}`, {
          withCredentials: true,
        });
        const { title, description, videoType,  thumbnail } = res.data.video;
        setVideoData({ title, description, videoType, thumbnail });
      } catch (err) {
        setError('Failed to fetch video data');
        toast.error('Failed to fetch video data');
        console.error(err);
      }
    };
    fetchVideo();
  }, [id]);

  // Handle input changes for text fields
  const handleChange = (e, field) => {
    setVideoData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Handle thumbnail file selection
  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  // Upload thumbnail to Cloudinary
  const uploadThumbnail = async () => {
    if (!thumbnailFile) return videoData.thumbnail; // Return existing thumbnail if no new file

    const data = new FormData();
    data.append('file', thumbnailFile);
    data.append('upload_preset', 'Youtube_capstone'); // Ensure this matches your Cloudinary preset

    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dclowgl6x/image/upload',
        data
      );
      return response.data.url; // Return the uploaded thumbnail URL
    } catch (err) {
      setError('Thumbnail upload failed');
      toast.error('Thumbnail upload failed');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
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
      let updatedVideoData = { ...videoData };

      // Upload thumbnail if a new file is selected
      if (thumbnailFile) {
        const thumbnailUrl = await uploadThumbnail();
        updatedVideoData = { ...updatedVideoData, thumbnail: thumbnailUrl };
      }

      await axios.put(
        `http://localhost:8000/api/video/${id}`,
        updatedVideoData,
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

      <input
        type="text"
        className="upload-input"
        placeholder="Video Link"
        value={videoData.videoLink}
        onChange={(e) => handleChange(e, 'videoLink')}
      />

      <input
        type="file"
        className="upload-input"
        accept="image/*"
        onChange={handleThumbnailChange}
      />

      {videoData.thumbnail && (
        <div className="thumbnail-preview">
          <p>Current Thumbnail:</p>
          <img
            src={videoData.thumbnail}
            alt="Thumbnail Preview"
            style={{ maxWidth: '200px', marginTop: '10px' }}
          />
        </div>
      )}

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