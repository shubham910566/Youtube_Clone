import express from 'express';
import {
  createVideo,
  fetchAllVideos,
  fetchVideoById,
  fetchVideosByUser,
  deleteVideo,
  editVideo,
  likeVideo,
  dislikeVideo
} from '../controllers/videoController.js';
import auth from '../Middleware/auth.js'

function videoRoutes(app) {
  
// Upload a new video (Protected)
app.post('/api/video', auth, createVideo);

// Get all videos (Public)
app.get('/api/videos', fetchAllVideos);

// Get video by ID (Public)
app.get('/api/video/:id', fetchVideoById);

// Get all videos by a specific user (Public)
app.get('/api/channel/:userId', fetchVideosByUser);

app.delete("/api/video/:id",auth, deleteVideo);
app.put("/api/:id",auth, editVideo)
app.put('/api/video/:id', auth, editVideo); // Fixed route path
// Like video (Protected)
app.post('/api/video/:id/like', auth, likeVideo); 
// Dislike video (Protected)
app.post('/api/video/:id/dislike', auth, dislikeVideo);
  
}
 

export default videoRoutes;
