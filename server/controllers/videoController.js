import express from "express";
import Video from "../models/Video.Model.js";

/**
 * Creates and saves a new video entry to the database.
 */
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

    return res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during video upload.",
    });
  }
}

/**
 * Retrieves and returns all videos from the database.
 */
export async function fetchAllVideos(req, res) {
  try {
    const videos = await Video.find().populate(
      "user",
      "channelName profilePic userName createdAt"
    );

    res.status(200).json({
      success: true,
      videos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch video list.",
      error,
    });
  }
}

/**
 * Fetches a single video using its unique ID.
 */
export async function fetchVideoById(req, res) {
  try {
    const { id } = req.params;

    const video = await Video.findById(id).populate(
      "user",
      "channelName profilePic userName createdAt"
    );

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Requested video not found.",
      });
    }

    res.status(200).json({
      success: true,
      video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not retrieve video data.",
    });
  }
}

/**
 * Retrieves all videos uploaded by a particular user.
 */
export async function fetchVideosByUser(req, res) {
  try {
    const { userId } = req.params;

    const userVideos = await Video.find({ user: userId }).populate(
      "user",
      "channelName profilePic userName createdAt about"
    );

    res.status(200).json({
      success: true,
      videos: userVideos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load videos for this user.",
    });
  }
}

/**
 * Deletes a video based on the provided ID.
 */
export async function deleteVideo(req, res) {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "No video found with the given ID.",
      });
    }

    await video.deleteOne();

    res.status(200).json({
      success: true,
      message: "Video removed successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting the video.",
      error,
    });
  }
}

/**
 * Updates an existing video's metadata.
 */
export async function editVideo(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found.",
      });
    }

    if (video.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to edit this video.",
      });
    }

    const updatedVideo = await Video.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Video details updated.",
      video: updatedVideo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update failed.",
      error,
    });
  }
}

/**
 * Increases the like count for a video.
 */
export async function likeVideo(req, res) {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found.",
      });
    }

    video.like += 1;
    await video.save();

    res.status(200).json({
      success: true,
      message: "Video liked.",
      video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not like the video.",
      error,
    });
  }
}

/**
 * Increases the dislike count for a video.
 */
export async function dislikeVideo(req, res) {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found.",
      });
    }

    video.dislike += 1;
    await video.save();

    res.status(200).json({
      success: true,
      message: "Video disliked.",
      video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not dislike the video.",
      error,
    });
  }
}
