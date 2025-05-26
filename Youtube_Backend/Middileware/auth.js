// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'No token. Authorization denied.' });
    }

    const decoded = jwt.verify(token, 'Its_My_Secret_Key');
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default auth;
