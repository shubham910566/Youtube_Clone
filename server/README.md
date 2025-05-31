# YouTube Clone - Backend

This is the backend of a YouTube clone, built with Node.js, Express, and MongoDB as part of a MERN stack capstone project. It provides a RESTful API for user authentication, channel management, video management, and comment handling, supporting the frontend React application.

## Table of Contents

- Features
- Technologies Used
- Folder Structure
- Setup Instructions
- API Endpoints


## Features

- User Authentication:
  - Sign up and login endpoints with JWT-based authentication.
  - Secure password hashing using bcryptjs.
  - Protected routes for authenticated users (e.g., channel creation, video uploads).

- Channel Management:
  - Create and fetch channel details (name, description, banner, videos).
  - Associate channels with authenticated users.

- Video Management:
  - Upload video metadata (title, description, category, thumbnail) and store files via Cloudinary.
  - Fetch, update, and delete videos, including filtering by category and title search.

- Comment Handling:
  - Add, edit, and delete comments on videos, restricted to authenticated users.
  - Store comments with user and video associations.

- Database Integration:
  - MongoDB collections for users, channels, videos, and comments.
  - Efficient data retrieval for frontend display (e.g., video grid, channel page).

## Technologies Used

- Node.js: Runtime environment for server-side JavaScript.
- Express.js: Web framework for building RESTful APIs.
- MongoDB with Mongoose: NoSQL database and ORM for data storage and modeling.
- JWT (JSON Web Tokens): Secure authentication for protected routes.
- Bcryptjs: Password hashing for user security.
- Cloudinary: Cloud service for storing video and image files.
- Nodemon: Development tool for auto-restarting the server.
- Dotenv: Manages environment variables.

## Folder Structure

```bash
server/
├── controllers/               # API logic
│   ├── authController.js      # Authentication endpoints (signup, login)
│   ├── channelController.js   # Channel creation and retrieval
│   ├── commentController.js   # Comment management
│   └── videoController.js     # Video management (upload, fetch, update, delete)
├── db/                        # Database connection
│   └── conn.js                # MongoDB connection setup
├── Middleware/                # Custom middleware
│   └── auth.js                # JWT authentication middleware
├── models/                    # Mongoose schemas
│   ├── Channels.Model.js      # Channel schema
│   ├── Comment.Model.js       # Comment schema
│   ├── User.Model.js          # User schema
│   ├── Video.Model.js         # Video schema
├── routes/                    # API routes
│   ├── channel.Route.js       # Channel-related routes
│   ├── comments.Route.js      # Comment-related routes
│   ├── users.Route.js         # User authentication routes
│   └── video.Route.js         # Video-related routes
├── config.js                  # Configuration (e.g., PORT, JWT_SECRET)
├── package.json               # Dependencies and scripts
├── server.js                  # Main server entry point
├── .env                       # Environment variables (not committed)
└── README.md                  # Backend documentation
```

## Setup Instructions

### Prerequisites

- Node.js and npm (Node Package Manager).
- MongoDB (running locally or via MongoDB Atlas).
- Cloudinary account for media storage (signup at cloudinary.com).

### Installation Steps

```bash
cd server
npm install
```

### Configure Environment Variables

Create a `.env` file in the `server` directory with the following:

```bash
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

```

Replace placeholders with your MongoDB URI, JWT secret, and Cloudinary credentials.

### Start the Server

```bash
npm start
```

The server will run on http://localhost:8000.

## Notes

- Ensure MongoDB is running before starting the server.
- The backend must be running for the frontend to access API endpoints.
- Use a tool like Postman to test API endpoints during development.

## API Endpoints

### User Authentication

- `POST /api/users/signup`
  - Register a new user.
  - Body: `{ "username": "string", "email": "string", "password": "string" }`
  - Response: `{ "token": "jwt_token", "user": { "userId": "string", "username": "string" } }`

- `POST /api/users/login`
  - Log in an existing user.
  - Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "token": "jwt_token", "user": { "userId": "string", "username": "string" } }`

### Channel Management

- `POST /api/channels` (Protected)
  - Create a new channel.
  - Body: `{ "channelName": "string", "description": "string", "channelBanner": "string" }`
  - Response: `{ "channelId": "string", "channelName": "string" }`

- `GET /api/channels/:id`
  - Fetch channel details and videos.
  - Response: `{ "channelId": "string", "channelName": "string", "videos": [] }`

### Video Management

- `GET /api/videos`
  - Fetch all videos (supports query params for search and category).
  - Query: `?search=title&category=Entertainment`
  - Response: `[ { "videoId": "string", "title": "string", "thumbnailUrl": "string", "uploader": "string", "views": number } ]`

- `POST /api/videos` (Protected)
  - Upload a new video.
  - Body: `{ "title": "string", "description": "string", "videoType": "string", "videoUrl": "string", "thumbnailUrl": "string" }`
  - Response: `{ "videoId": "string", "title": "string" }`

- `PUT /api/videos/:id` (Protected)
  - Update a video.
  - Body: `{ "title": "string", "description": "string" }`
  - Response: `{ "videoId": "string", "title": "string" }`

- `DELETE /api/videos/:id` (Protected)
  - Delete a video.
  - Response: `{ "message": "Video deleted" }`

### Comment Management

- `POST /api/comments` (Protected)
  - Add a comment to a video.
  - Body: `{ "videoId": "string", "text": "string" }`
  - Response: `{ "commentId": "string", "text": "string" }`

- `PUT /api/comments/:id` (Protected)
  - Edit a comment.
  - Body: `{ "text": "string" }`
  - Response: `{ "commentId": "string", "text": "string" }`

- `DELETE /api/comments/:id` (Protected)
  - Delete a comment.
  - Response: `{ "message": "Comment deleted" }`

- `GET /api/comments/:videoId`
  - Fetch comments for a video.
  - Response: `[ { "commentId": "string", "text": "string", "userId": "string" } ]`

