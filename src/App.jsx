import React, { useState } from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import './app.css'


function App() {
  const [showSideBar, setShowSideBar] = useState(false)
  function toggeleSideBar() {
    setShowSideBar(!showSideBar)
  }
  return (
    <div className="app">
      <NavBar toggeleSideBar={toggeleSideBar} />
      <Home showSideBar={showSideBar } />
    </div>
  )
}

export default App
