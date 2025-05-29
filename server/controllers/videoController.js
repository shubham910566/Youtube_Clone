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
 * Toggles like for a video.
 */
export async function likeVideo(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const video = await Video.findById(id).populate(
      "user",
      "channelName profilePic userName createdAt"
    );
    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found." });
    }

    const isLiked = video.likes.includes(userId);

    if (isLiked) {
      // unlike: Remove user from likes
      video.likes = video.likes.filter((uid) => uid.toString() !== userId.toString());
    } else {
      // like: Add user to likes, remove from dislikes
      video.likes.push(userId);
      video.dislike = video.dislike.filter((uid) => uid.toString() !== userId.toString());
    }

    await video.save();

    res.status(200).json({
      success: true,
      message: isLiked ? "Video unliked." : "Video liked.",
      video, // Return full video object
    });
  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({ success: false, message: "Could not like the video.", error });
  }
}

/**
 * Toggles dislike for a video.
 */
export async function dislikeVideo(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const video = await Video.findById(id).populate(
      "user",
      "channelName profilePic userName createdAt"
    );
    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found." });
    }

    const isDisliked = video.dislike.includes(userId);

    if (isDisliked) {
      // undislike: Remove user from dislikes
      video.dislike = video.dislike.filter((uid) => uid.toString() !== userId.toString());
    } else {
      // Dislike: Add user to dislikes, remove from likes
      video.dislike.push(userId);
      video.likes = video.likes.filter((uid) => uid.toString() !== userId.toString());
    }

    await video.save();

    res.status(200).json({
      success: true,
      message: isDisliked ? "Video undisliked." : "Video disliked.",
      video, // Return full video object
    });
  } catch (error) {
    console.error("Dislike error:", error);
    res.status(500).json({ success: false, message: "Could not dislike the video.", error });
  }
}


