import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./VideoUpload.css";

function VideoUpload() {
  const userId = localStorage.getItem("UserId");
  const navigate = useNavigate();

  const [videoData, setVideoData] = useState({
    user: userId,
    title: "",
    description: "",
    videoType: "",
    videoLink: "",
    thumbnail: "",
  });
  const [uploadMethod, setUploadMethod] = useState("file"); // 'file' or 'youtube'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Validate YouTube URL and extract video ID
  const validateYouTubeUrl = (url) => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (!match) return null;
    return match[1]; // Video ID
  };

  // Handle YouTube URL input and set thumbnail
  const handleYouTubeUrl = (e) => {
    const url = e.target.value;
    setVideoData((prev) => ({ ...prev, videoLink: url }));

    const videoId = validateYouTubeUrl(url);
    if (videoId) {
      // Set YouTube thumbnail
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      setVideoData((prev) => ({ ...prev, thumbnail: thumbnailUrl }));
      setError(null);
      toast.success("Valid YouTube URL detected");
    } else if (url) {
      setError("Invalid YouTube URL");
      toast.error("Please enter a valid YouTube URL");
      setVideoData((prev) => ({ ...prev, thumbnail: "" }));
    } else {
      setError(null);
      setVideoData((prev) => ({ ...prev, thumbnail: "" }));
    }
  };

  // Submit video metadata to backend
  const handleUploadVideo = async () => {
    if (!videoData.videoLink) return toast.error("Please provide a video file or YouTube URL");
    if (!videoData.title) return toast.error("Title is required");
    if (!videoData.thumbnail && uploadMethod === "file")
      return toast.error("Thumbnail is required for file uploads");

    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:8000/api/video", videoData, {
        withCredentials: true,
      });
      toast.success("Video added successfully");
      navigate("/");
    } catch (err) {
      console.error("Error uploading video metadata:", err);
      toast.error("Failed to upload video metadata");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle video file upload to Cloudinary
  const uploadVideo = async (e) => {
    const video = e.target.files[0];
    if (!video) return toast.error("Please select a video file");

    const maxSize = 40 * 1024 * 1024; // 40 MB
    if (video.size > maxSize) {
      toast.error("File size exceeds 40 MB. Please upload a video less than 40 MB.");
      setError("File size exceeds 40 MB");
      e.target.value = "";
      return;
    }

    const data = new FormData();
    data.append("file", video);
    data.append("upload_preset", "Youtube_capstone");

    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dclowgl6x/video/upload",
        data
      );
      const videoUrl = response.data.url;
      setVideoData((prev) => ({ ...prev, videoLink: videoUrl }));
      toast.success("Video uploaded to Cloudinary");
    } catch (err) {
      setError("Video upload failed");
      toast.error("Video upload failed");
      console.error("Error uploading video:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle thumbnail image upload to Cloudinary
  const uploadImage = async (e) => {
    const image = e.target.files[0];
    if (!image) return toast.error("Please select a thumbnail");

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Youtube_capstone");

    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dclowgl6x/image/upload",
        data
      );
      const imageUrl = response.data.url;
      setVideoData((prev) => ({ ...prev, thumbnail: imageUrl }));
      toast.success("Thumbnail uploaded successfully");
    } catch (err) {
      setError("Thumbnail upload failed");
      toast.error("Thumbnail upload failed");
      console.error("Error uploading thumbnail:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-heading">Upload New Video</h2>

      {/* Upload method selection */}
      <div className="upload-method">
        <label>
          <input
            type="radio"
            value="file"
            checked={uploadMethod === "file"}
            onChange={() => {
              setUploadMethod("file");
              setVideoData((prev) => ({ ...prev, videoLink: "", thumbnail: "" }));
              setError(null);
            }}
          />
          Upload Video File
        </label>
        <label style={{ marginLeft: "20px" }}>
          <input
            type="radio"
            value="youtube"
            checked={uploadMethod === "youtube"}
            onChange={() => {
              setUploadMethod("youtube");
              setVideoData((prev) => ({ ...prev, videoLink: "", thumbnail: "" }));
              setError(null);
            }}
          />
          Use YouTube URL
        </label>
      </div>

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
        className="upload-input"
        placeholder="Category e.g., Entertainment, Education"
        value={videoData.videoType}
        onChange={(e) =>
          setVideoData((prev) => ({ ...prev, videoType: e.target.value }))
        }
      />

      {/* Conditional input based on upload method */}
      {uploadMethod === "file" ? (
        <>
          <label className="upload-label">Upload Video:</label>
          <input
            type="file"
            accept="video/*"
            className="upload-file"
            onChange={uploadVideo}
            disabled={isLoading}
          />
          <label className="upload-label">Upload Thumbnail:</label>
          <input
            type="file"
            accept="image/*"
            className="upload-file"
            onChange={uploadImage}
            disabled={isLoading}
          />
        </>
      ) : (
        <>
          <label className="upload-label">YouTube URL:</label>
          <input
            type="text"
            className="upload-input"
            placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=videoId)"
            value={videoData.videoLink}
            onChange={handleYouTubeUrl}
            disabled={isLoading}
          />
        </>
      )}

      {/* Show thumbnail preview if available */}
      {videoData.thumbnail && (
        <div>
          <label className="upload-label">Thumbnail Preview:</label>
          <img
            src={videoData.thumbnail}
            alt="Thumbnail"
            className="thumbnail-preview"
          />
        </div>
      )}

      {/* Upload and Cancel buttons */}
      <div className="button-group">
        <button
          onClick={handleUploadVideo}
          className="upload-button"
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
        <button
          onClick={() => navigate("/")}
          className="cancel-button"
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>

      {/* Show error message if any */}
      {error && <p className="error-text">{error}</p>}

      <ToastContainer />
    </div>
  );
}

export default VideoUpload;