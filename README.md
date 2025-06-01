# YouTube Clone

This is a full-stack web application designed to replicate core functionalities of YouTube, such as video uploading, playback, commenting, liking, and channel management. Built with modern web technologies, it allows users to create accounts, manage channels, and interact with video content in a responsive and user-friendly interface.

---

## Table of Contents

- Features  
- Technologies Used  
- Project Structure  
- Setup Instructions  
- Usage  
- License  

---

## Features

- **User Authentication:** Secure signup, login, and logout functionality.  
- **Channel Management:** Create and manage personal channels with customizable banners and descriptions.  
- **Video Uploading:** Upload videos via file (up to 40MB) or by embedding YouTube URLs, with thumbnail support.  
- **Video Playback:** Watch videos with a built-in player or embedded YouTube iframes, including comments, likes, and dislikes.  
- **User Profiles:** View profiles and channel pages with video listings.  
- **Search Functionality:** Search videos by title across the platform.  
- **Filter by Category:** Filter videos by categories (e.g., Entertainment, Education) on the homepage for tailored browsing.  
- **Comment System:** Add, edit, and delete comments on videos (authenticated users only).  
- **Responsive Design:** Optimized for both desktop and mobile devices.  

---

## Technologies Used

### Frontend

- **React**  
- **React Router**  
- **Material-UI**  
- **React Toastify**  
- **Axios**  
- **CSS**  

### Backend

- **Express.js**  
- **MongoDB with Mongoose**  
- **Cloudinary**  
- **JWT (JSON Web Tokens)**  
- **Bcryptjs**  

### Development Tools

- **Node.js**  
- **Nodemon**  
- **Git**  

---

## Project Structure

## Project Structure

```bash
Youtube_Clone/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   └── Sidebar/
│   │   ├── pages/
│   │   │   ├── CreateChannel/
│   │   │   ├── EditVideo/
│   │   │   ├── Home/
│   │   │   ├── Login/
│   │   │   ├── MyChannel/
│   │   │   ├── Profile/
│   │   │   ├── Signup/
│   │   │   ├── UploadVideoPage/
│   │   │   └── VideoPlayer/
│   │   ├── App.js
│   │   ├── app.css
│   │   └── index.js
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config.js
│   ├── package.json
│   └── server.js
├── .gitignore
└── README.md
```

---

## Setup Instructions

### Prerequisites

Ensure the following are installed:

- Node.js and npm  
- MongoDB (local or Atlas)  
- Cloudinary account  

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/shubham910566/Youtube_Clone.git
   cd Youtube_Clone
   ```

2. **Backend Setup:**
   ```bash
   cd server
   npm install
   ```

   Create a \`.env\` file in the \`server\` directory:
   ```bash
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
    ```
   Start the backend:
   ```bash
   npm start
   ```

   The backend will run at [http://localhost:8000](http://localhost:8000).

3. **Frontend Setup:**
   ```bash
   cd ../client
   npm install
   npm run dev

   

   The frontend will run at [http://localhost:5173](http://localhost:5173).

---

## Usage

- **Signup/Login:** Sign up with a channel name and profile picture.  
- **Create a Channel:** Go to “Create Channel” under your profile.  
- **Upload Videos:** Use the “Create” button to upload a video file or YouTube URL.  
- **Watch Videos:** Browse the homepage, click videos to play, comment, and like.  
- **Manage Channel:** See your videos under “My Channel” and edit/delete as needed.  
- **Search Videos:** Use the search bar for titles.  
- **Filter Videos:** Filter by category on the homepage.  

### Notes

- Video files are stored in Cloudinary; YouTube URLs are embedded.
- Only authenticated users can upload/comment/interact.
- Comment/video editing is limited to the owner.

---

## License

This project is licensed under the **MIT License**. See the \`LICENSE\` file for full details.
