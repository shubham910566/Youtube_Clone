// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.Model.js';
import { JWT_SECRET } from '../config.js';

const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Verify the token using your secret key
    const decodedPayload = jwt.verify(token, JWT_SECRET);

    const existingUser = await User.findById(decodedPayload.userId).select('-password');

    if (!existingUser) {
      return res.status(401).json({ error: 'Authentication failed. User not found.' });
    }

    // Attach user info to request object
    req.user = existingUser;
    next();

  } catch (err) {
    console.error('Authentication Middleware Error:', err.message);
    res.status(401).json({ error: 'Unauthorized. Token is invalid or expired.' });
  }
};

export default auth;
