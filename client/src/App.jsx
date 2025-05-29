import React, { useState,useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'; 
import NavBar from './components/Navbar/Navbar/NavBar';
import Home from './components/Pages/Home/Home';
import VideoPage from './components/Pages/VideoPlayer/VideoPage';
import './app.css';
import ProfilePage from './components/Pages/Profile/ProfilePage';
import SignUp from './components/Pages/SignUp/SignUp';
import axios from 'axios';
import CreateChannel from './components/Pages/CreateChannel/CreateChannel';
import MyChannelPage from './components/Pages/My Channel/MyChannelPage';
import VideoUpload from './components/Pages/UploadVideoPage/VideoUpload';
import EditVideo from './components/Pages/Edit Video/EditVideo';

function App() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [searchQuery, setSeachQuery]=useState('')
  
  function toggleSideBar() { 
    setShowSideBar(!showSideBar);
    
  }
 

  return (
    <div className="app">
      <NavBar toggleSideBar={toggleSideBar} onSearch={setSeachQuery}/>

      {/* Wrapped Routes */}
      <Routes>
        <Route path="/video/:id" element={<VideoPage showSideBar={showSideBar} /> } />
        <Route path="/" element={<Home showSideBar={showSideBar} searchQuery={ searchQuery} />} />
        <Route path='/profile/:id' element={<ProfilePage showSideBar={showSideBar} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-channel" element={<CreateChannel />} /> 
        <Route path="/mychannel/:id" element={<MyChannelPage />} />
        <Route path="/upload-video" element={<VideoUpload />} />
        <Route path="/edit-video/:id" element={<EditVideo/>}/>
      </Routes>
    </div>
  );
}

export default App;