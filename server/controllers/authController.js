// Import dependencies and configurations
import User from '../models/User.Model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

// Cookie configuration for storing the JWT token
const cookieOptions = {
  httpOnly: true,          // Makes cookie inaccessible to client-side JavaScript
  secure: false,           // Should be true in production (HTTPS)
  sameSite: 'Lax'          // Helps prevent CSRF attacks
};

// ==========================
// SIGN UP CONTROLLER
// ==========================
export const signUp = async (req, res) => {
  try {
    const { username, email, password, profilePic, channelName, about } = req.body;

    // Check if user with the same username or email already exists
    const existingUser = await User.findOne({
      $or: [{ userName: username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Hash the password using bcrypt before saving to DB
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      userName: username,
      email,
      password: hashedPassword,
      profilePic,
      channelName: channelName || "Untitled Channel", // Default channel name if none provided
      about: about || "No description yet"             // Default about section
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with success message and the created user data
    res.status(201).json({
      message: 'User registered successfully',
      success: true,
      data: newUser
    });

  } catch (error) {
    // Log and return server error
    console.error("SignUp Error:", error);
    res.status(500).json({ error: error.message || 'Server error during sign up' });
  }
};

// ==========================
// SIGN IN CONTROLLER
// ==========================
export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Allow login using either username or email
    const user = await User.findOne({
      $or: [{ userName: username }, { email: username }]
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid username or email' });
    }

    // Compare provided password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate JWT token with user's ID
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    // Set token in HTTP-only cookie
    res.cookie('token', token, cookieOptions);

    // Send success response along with token and user data
    res.json({
      message: 'Logged in successfully',
      success: true,
      token,
      user
    });

  } catch (error) {
    // Log and return server error
    console.error("SignIn Error:", error);
    res.status(500).json({ error: error.message || 'Server error during sign in' });
  }
};

// ==========================
// LOGOUT CONTROLLER
// ==========================
export const logout = async (req, res) => {
  // Clear the token cookie to log the user out
  res.clearCookie('token', cookieOptions).json({ message: 'Logged out successfully' });
};
