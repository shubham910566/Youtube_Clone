# YouTube Clone - Frontend

This is the frontend of a YouTube clone, built with React as part of a MERN stack capstone project. It provides a responsive, user-friendly interface for browsing videos, managing channels, and interacting with content, mimicking core YouTube functionalities like video playback, commenting, and filtering.

## Table of Contents
- Features
- Technologies Used
- Folder Structure
- Setup Instructions
- Usage

---

## Features

### Homepage UI:
- YouTube-style header with search and profile.
- Toggleable sidebar for navigation.
- Filter videos by category (e.g., Entertainment).
- Grid layout of video cards.

### User Authentication:
- Signup/Login with JWT auth.
- Username displayed after login.

### Video Player:
- Play videos from Cloudinary or YouTube.
- Like/dislike + comments (for logged-in users).

### Channel Page:
- Authenticated users can create channels.
- `/my-channel` to edit/delete uploads.

### Search & Filter:
- Search by title.
- Filter using category buttons.

### Responsive:
- Mobile, tablet, and desktop friendly.

---

## Technologies Used
- React
- React Router
- Material-UI
- Axios
- React Toastify
- Vite
- CSS

---

## Folder Structure

```bash
client/
├── public/
│   ├── index.html
│   
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── NavBar/
│   │   │   │   ├── NavBar.js
│   │   │   │   └── NavBar.css
│   │   │   └── SideBar/
│   │   │       ├── Sidebar.js
│   │   │       └── Sidebar.css
│   ├── Pages/
│   │   ├── CreateChannel/
│   │   │   └── CreateChannel.js
│   │   ├── Edit Video/
│   │   │   ├── EditVideo.js
│   │   │   └── VideoUpload.css
│   │   ├── Home/
│   │   │   ├── Home.js
│   │   │   └── HomePage.css
│   │   ├── LogIn/
│   │   │   ├── LogIn.js
│   │   │   └── LogIn.css
│   │   ├── My Channel/
│   │   │   ├── MyChannelPage.js
│   │   │   └── MyChannelPage.css
│   │   ├── Profile/
│   │   │   └── ProfilePage.js
│   │   ├── SignUp/
│   │   │   ├── SignUp.js
│   │   │   └── SingUp.css
│   │   ├── UploadVideoPage/
│   │   │   ├── VideoUpload.js
│   │   │   └── VideoUpload.css
│   │   └── VideoPlayer/
│   │       ├── VideoPage.js
│   │       └── VideoPage.css
│   ├── App.js
│   ├── app.css
│   └── index.js
├── package.json
├── vite.config.js
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Node.js and npm
- Backend running at: http://localhost:8000

### Steps

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Usage

- **Home**: Video grid + sidebar + category filters
- **Sign up / Log in**: `/signup` or `/login`
- **Create Channel**: `/create-channel`
- **Upload Video**: `/upload-video`
- **Watch Video**: `/video/:id`
- **My Channel**: `/my-channel`
- **Filter**: Use category buttons on home

---

## Responsive Design

- **Mobile**: Sidebar overlays content with hamburger
- **Tablet/Desktop**: Sidebar shifts layout for clarity


