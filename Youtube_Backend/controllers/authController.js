import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const cookieOptions = {
  httpOnly: true,
  secure: false, // Set to true in production
  sameSite: 'Lax'
};

// SIGN UP
export const signUp = async (req, res) => {
  try {
    const { username, email, password, profilePic, channelName, about } = req.body;

    const existingUser = await User.findOne({
      $or: [{ userName: username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName: username,
      email,
      password: hashedPassword,
      profilePic,
      channelName: channelName || "Untitled Channel",
      about: about || "No description yet"
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      success: true,
      data: newUser
    });

  } catch (error) {
    console.error("SignUp Error:", error);
    res.status(500).json({ error: error.message || 'Server error during sign up' });
  }
};

// SIGN IN
export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      $or: [{ userName: username }, { email: username }]
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid username or email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, 'Its_My_Secret_Key');

    res.cookie('token', token, cookieOptions);
    res.json({
      message: 'Logged in successfully',
      success: true,
      token,
      user
    });

  } catch (error) {
    console.error("SignIn Error:", error);
    res.status(500).json({ error: error.message || 'Server error during sign in' });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  res.clearCookie('token', cookieOptions).json({ message: 'Logged out successfully' });
};
