import express from 'express';
import { addComment, getCommentById, editComment, deleteComment } from '../controllers/commentController.js';
import auth from '../Middleware/auth.js'

const router = express.Router();

function commentRouter(app) {
    app.post('/comment', auth, addComment);
    app.get('/comments/:videoId', getCommentById);
    app.put('/comment/:commentId', auth, editComment);
    app.delete('/comment/:commentId', auth, deleteComment);

}



export default commentRouter;