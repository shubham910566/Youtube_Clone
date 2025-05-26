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
} from '../controllers/video.js';
import auth from '../Middileware/auth.js'

const router = express.Router();

// Upload a new video (Protected)
router.post('/video', auth, createVideo);

// Get all videos (Public)
router.get('/videos', fetchAllVideos);

// Get video by ID (Public)
router.get('/video/:id', fetchVideoById);

// Get all videos by a specific user (Public)
router.get('/channel/:userId', fetchVideosByUser);

router.delete("/video/:id",auth, deleteVideo);
router.put("/:id",auth, editVideo)
router.put('/video/:id', auth, editVideo); // Fixed route path
// Like video (Protected)
router.post('/video/:id/like', auth, likeVideo); 
// Dislike video (Protected)
router.post('/video/:id/dislike', auth, dislikeVideo); 
export default router;
