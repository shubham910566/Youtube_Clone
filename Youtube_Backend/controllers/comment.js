import comment from '../models/comment.js';

export const addComment = async (req, res) => {
  try {
    const { video, message } = req.body;
    const newComment = new comment({ user: req.user._id, video, message });
    await newComment.save();
    res.status(201).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const { videoId } = req.params;
    const comments = await comment.find({ video: videoId }).populate(
      'user',
      'channelName profilePic userName createdAt'
    );
    res.status(200).json({ message: 'Success', comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { message } = req.body;
    const existingComment = await comment.findById(commentId);
    if (!existingComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    if (existingComment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to edit this comment' });
    }
    existingComment.message = message;
    await existingComment.save();
    res.status(200).json({ message: 'Comment updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const existingComment = await comment.findById(commentId);
    if (!existingComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    if (existingComment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this comment' });
    }
    await existingComment.deleteOne();
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};