import React from 'react'
import Sidebar from './Sidebar'
import HomePage from './HomePage'

function Home({showSideBar}) {
  return (
    <div className="home-page">
      <div className="sidebar">
        {showSideBar && <Sidebar />}
      </div>
      <div className="homepage">
        <HomePage showSideBar={showSideBar} />
      </div>
      
    </div>
  )
}

export default Home
