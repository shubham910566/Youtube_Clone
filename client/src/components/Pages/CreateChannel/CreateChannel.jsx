import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreateChannel.css';

function CreateChannel() {
  const [channelName, setChannelName] = useState('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState(null);
  const [bannerUrl, setBannerUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handles uploading of the banner image to Cloudinary
  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error('Please select a banner image');

    const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
    if (file.size > maxSize) {
      toast.error('Banner size exceeds 5 MB. Please upload an image less than 5 MB.');
      e.target.value = ''; // Reset file input if validation fails
      return;
    }

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'Youtube_capstone'); // Cloudinary preset

    try {
      setIsLoading(true); // Show loading state during upload
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dclowgl6x/image/upload',
        data
      );
      // Save the banner URL and file
      setBannerUrl(response.data.url);
      setBanner(file);
      toast.success('Banner uploaded successfully');
    } catch (err) {
      console.error('Banner upload failed:', err);
      toast.error('Failed to upload banner');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Handles creating the channel with form inputs and uploaded banner
  const handleCreate = async () => {
    const userId = localStorage.getItem('UserId');
    if (!channelName) return toast.error('Channel name is required');
    if (!userId) return toast.error('You must be logged in to create a channel');

    try {
      const response = await axios.post('https://youtube-clone-backend-y63i.onrender.com/channel', {
        channelName,
        description,
        owner: userId,
        channelBanner: bannerUrl || 'https://example.com/default-banner.jpg', // Fallback banner if none uploaded
      });

      toast.success('Channel created successfully!');
      localStorage.setItem('UserChannelId', response.data._id); // Store channel ID locally
      window.location.href = `/mychannel/${userId}`; // Redirect to the user's channel
    } catch (err) {
      console.error('Channel creation failed:', err);
      toast.error('Failed to create channel');
    }
  };

  return (
    <div className="create-channel-page">
      <h2>Create Your Channel</h2>
      <input
        placeholder="Channel Name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        className="create-channel-input"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="create-channel-textarea"
      />
      <label className="create-channel-label">Upload Channel Banner:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleBannerUpload}
        className="create-channel-file"
        disabled={isLoading}
      />
      {bannerUrl && (
        <img
          src={bannerUrl}
          alt="Banner Preview"
          className="create-channel-banner-preview"
        />
      )}
      <div className="create-channel-buttons">
        <button
          onClick={handleCreate}
          className="create-channel-button"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Channel'}
        </button>
      </div>
      <ToastContainer style={{overflow:"hidden"}}/>
    </div>
  );
}

export default CreateChannel;
