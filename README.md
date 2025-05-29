# YouTube Clone

This is a full-stack web application designed to replicate core functionalities of YouTube, such as video uploading, playback, commenting, liking, and channel management. Built with modern web technologies, it allows users to create accounts, manage channels, and interact with video content in a responsive and user-friendly interface.

## Table of Contents

- Features
- Technologies Used
- Project Structure
- Setup Instructions
- Usage
- License

## Features

- **User Authentication**: Secure signup, login, and logout functionality.
- **Channel Management**: Create and manage personal channels with customizable banners and descriptions.
- **Video Uploading**: Upload videos via file (up to 40MB) or by embedding YouTube URLs, with thumbnail support.
- **Video Playback**: Watch videos with a built-in player or embedded YouTube iframes, including comments, likes, and dislikes.
- **User Profiles**: View profiles and channel pages with video listings.
- **Search Functionality**: Search videos by title across the platform.
- **Comment System**: Add, edit, and delete comments on videos (authenticated users only).
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

### Frontend
- React
- React Router
- Material-UI
- React Toastify
- Axios
- CSS

### Backend
- Express.js
- MongoDB with Mongoose
- Cloudinary
- JWT (JSON Web Tokens)
- Bcryptjs

### Development Tools
- Node.js
- Nodemon
- Git

## Project Structure

```
Youtube_Clone/
├── client/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   │   ├── NavBar/
│   │   │   │   │   ├── NavBar.js
│   │   │   │   │   └── NavBar.css
│   │   │   │   └── SideBar/
│   │   │   │       ├── Sidebar.js
│   │   │   │       └── Sidebar.css
│   │   ├── Pages/
│   │   │   ├── CreateChannel/
│   │   │   │   └── CreateChannel.js
│   │   │   ├── Edit Video/
│   │   │   │   ├── EditVideo.js
│   │   │   │   └── VideoUpload.css
│   │   │   ├── Home/
│   │   │   │   ├── Home.js
│   │   │   │   └── HomePage.css
│   │   │   ├── LogIn/
│   │   │   │   ├── LogIn.js
│   │   │   │   └── LogIn.css
│   │   │   ├── My Channel/
│   │   │   │   ├── MyChannelPage.js
│   │   │   │   └── MyChannelPage.css
│   │   │   ├── Profile/
│   │   │   │   └── ProfilePage.js
│   │   │   ├── SignUp/
│   │   │   │   ├── SignUp.js
│   │   │   │   └── SingUp.css
│   │   │   ├── UploadVideoPage/
│   │   │   │   ├── VideoUpload.js
│   │   │   │   └── VideoUpload.css
│   │   │   └── VideoPlayer/
│   │   │       ├── VideoPage.js
│   │   │       └── VideoPage.css
│   │   ├── App.js
│   │   ├── app.css
│   │   └── index.js
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── channelController.js
│   │   ├── commentController.js
│   │   └── videoController.js
│   ├── db/
│   │   └── conn.js
│   ├── Middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Channels.Model.js
│   │   ├── Comment.Model.js
│   │   ├── User.Model.js
│   │   └── Video.Model.js
│   ├── routes/
│   │   ├── channel.Route.js
│   │   ├── comments.Route.js
│   │   ├── users.Route.js
│   │   └── video.Route.js
│   ├── config.js
│   ├── package.json
│   └── server.js
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js and npm
- MongoDB
- Cloudinary account

### Installation Steps

#### Clone the Repository
```bash
git clone https://github.com/shubham910566/Youtube_Clone.git
cd Youtube_Clone
```

#### Backend Setup
```bash
cd server
npm install
```

Create a `.env` file with:
```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:
```bash
npm start
```

#### Frontend Setup
```bash
cd client
npm install
npm run dev
```

## Usage

- **Signup/Login**: Register or log in.
- **Create Channel**: From profile dropdown.
- **Upload Videos**: Via navbar “Create” button.
- **Watch Videos**: Click thumbnails on homepage.
- **Manage Channel**: Via “My Channel” link.
- **Search**: Search bar in navbar.

## License

This project is licensed under the MIT License.