import comment from '../models/Comment.Model.js';

/**
 * Create and store a new comment for a specific video
 */
export const addComment = async (req, res) => {
  try {
    const { video, message } = req.body;

    const userComment = new comment({
      user: req.user._id,
      video,
      message,
    });

    await userComment.save();

    return res.status(201).json({
      message: 'Comment added successfully',
    });
  } catch (err) {
    console.error('Add Comment Error:', err);
    return res.status(500).json({
      error: 'Server encountered an issue while adding the comment.',
    });
  }
};

/**
 * Fetch all comments related to a specific video
 */
export const getCommentById = async (req, res) => {
  try {
    const { videoId } = req.params;

    const videoComments = await comment.find({ video: videoId }).populate(
      'user',
      'channelName profilePic userName createdAt'
    );

    return res.status(200).json({
      message: 'Success',
      comments: videoComments,
    });
  } catch (err) {
    console.error('Get Comment Error:', err);
    return res.status(500).json({
      error: 'Failed to retrieve comments from server.',
    });
  }
};

/**
 * Update the content of an existing comment
 */
export const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { message } = req.body;

    const targetComment = await comment.findById(commentId);

    if (!targetComment) {
      return res.status(404).json({
        error: 'Comment not found',
      });
    }

    if (targetComment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: 'Not authorized to edit this comment',
      });
    }

    targetComment.message = message;
    await targetComment.save();

    return res.status(200).json({
      message: 'Comment updated successfully',
    });
  } catch (err) {
    console.error('Edit Comment Error:', err);
    return res.status(500).json({
      error: 'Unable to update comment due to server error.',
    });
  }
};

/**
 * Remove a comment by its ID
 */
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const commentToDelete = await comment.findById(commentId);

    if (!commentToDelete) {
      return res.status(404).json({
        error: 'Comment not found',
      });
    }

    if (commentToDelete.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: 'Not authorized to delete this comment',
      });
    }

    await commentToDelete.deleteOne();

    return res.status(200).json({
      message: 'Comment deleted successfully',
    });
  } catch (err) {
    console.error('Delete Comment Error:', err);
    return res.status(500).json({
      error: 'Server error while deleting comment',
    });
  }
};
