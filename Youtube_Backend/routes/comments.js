import express from 'express';
import { addComment, getCommentById, editComment, deleteComment } from '../controllers/comment.js';
import auth from '../Middileware/auth.js'

const router = express.Router();

router.post('/comment', auth, addComment);
router.get('/comments/:videoId', getCommentById);
router.put('/comment/:commentId', auth, editComment);
router.delete('/comment/:commentId', auth, deleteComment);

export default router;