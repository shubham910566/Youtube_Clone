// routes/user.js
import express from 'express';
import {
  signUp,
  signIn,
  logout
} from '../controllers/authController.js';

import  auth from '../Middileware/auth.js'

const router = express.Router();

// @route   POST /auth/signUp
router.post('/signUp', signUp);

// @route   POST /auth/signIn
router.post('/signIn', signIn);

// @route   POST /auth/logout
router.post('/logout', logout);

// @route   GET /auth/me
// @desc    Get current user (protected)
router.get('/me', auth, (req, res) => {
  res.status(200).json({
    message: 'Authenticated user',
    user: req.user
  });
});

export default router;
