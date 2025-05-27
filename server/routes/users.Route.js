// routes/user.js
import express from 'express';
import {
  signUp,
  signIn,
  logout
} from '../controllers/authController.js';

import  auth from '../Middleware/auth.js'

function userRouter(app) {
  app.post('/auth/signUp', signUp);

// @route   POST /auth/signIn
app.post('/auth/signIn', signIn);

// @route   POST /auth/logout
app.post('/auth/logout', logout);

// @route   GET /auth/me
// @desc    Get current user (protected)
app.get('/me', auth, (req, res) => {
  res.status(200).json({
    message: 'Authenticated user',
    user: req.user
  });
});
  
}



export default userRouter;
