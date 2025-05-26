import React from 'react'
import Sidebar from '../../Navbar/SideBar/Sidebar'
import HomePage from '../HomePage/HomePage'

function Home({showSideBar,searchQuery}) {
  return (
    <div className="home-page">
      <div className="sidebar">
        {showSideBar && <Sidebar />}
      </div>
      <div className="homepage">
        <HomePage showSideBar={showSideBar} searchQuery={searchQuery} />
      </div>
      
    </div>
  )
}

export default Home
