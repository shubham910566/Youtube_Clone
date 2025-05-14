import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom'; // Corrected import
import NavBar from './components/NavBar';
import Home from './components/Home';
import VideoPage from './components/VideoPage';
import './app.css';
import ProfilePage from './components/ProfilePage';
import SignUp from './components/SignUp';

function App() {
  const [showSideBar, setShowSideBar] = useState(false);
  
  function toggleSideBar() { 
    setShowSideBar(!showSideBar);
    
  }

  return (
    <div className="app">
      <NavBar toggleSideBar={toggleSideBar} />

      {/* Wrapped Routes */}
      <Routes>
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/" element={<Home showSideBar={showSideBar} />} />
        <Route path='/profile/:id' element={<ProfilePage showSideBar={showSideBar} />} />
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;