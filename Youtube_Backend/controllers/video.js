import express from "express";
import Video from "../models/video.js";

// Upload a new video
export async function createVideo(req, res) {
  try {
    const { title, description, videoLink, videoType, thumbnail } = req.body;

    const newVideo = new Video({
      user: req.user._id,
      title,
      description,
      videoLink,
      videoType,
      thumbnail,
    });

    await newVideo.save();

    res.status(201).json({ success: true, message: "Video uploaded successfully", video: newVideo });
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong while uploading the video." });
  }
}

// Get all videos
export async function fetchAllVideos(req, res) {
  try {
    const allVideos = await Video.find().populate('user', 'channelName profilePic userName createdAt');
    res.status(200).json({ success: true, videos: allVideos });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to retrieve videos" ,err});
  }
}

// Get video by ID
export async function fetchVideoById(req, res) {
  try {
    const videoId = req.params.id;
    const singleVideo = await Video.findById(videoId).populate('user', 'channelName profilePic userName createdAt');

    if (!singleVideo) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    res.status(200).json({ success: true, video: singleVideo });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error retrieving video details" });
  }
}

// Get all videos by a specific user
export async function fetchVideosByUser(req, res) {
  try {
    const userId = req.params.userId;

    const userVideos = await Video.find({ user: userId }).populate(
      'user',
      'channelName profilePic userName createdAt about'
    );

    res.status(200).json({ success: true, videos: userVideos });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to get videos for this user" });
  }
}
export async function deleteVideo(req, res) {
  try {
    const videoId = req.params.id;

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    await video.deleteOne();

    res.status(200).json({ success: true, message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete video", err });
  }
}


// ... (other existing controller functions unchanged)

export async function editVideo(req, res) {
  try {
    const videoId = req.params.id;
    const updates = req.body;
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    if (video.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to edit this video' });
    }
    const updatedVideo = await Video.findByIdAndUpdate(videoId, updates, { new: true });
    res.status(200).json({ success: true, message: 'Video updated successfully', video: updatedVideo });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update video', err });
  }
}

export async function likeVideo(req, res) {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    video.like += 1;
    await video.save();
    res.status(200).json({ success: true, message: 'Video liked', video });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to like video', err });
  }
}

export async function dislikeVideo(req, res) {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    video.dislike += 1;
    await video.save();
    res.status(200).json({ success: true, message: 'Video disliked', video });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to dislike video', err });
  }
}
