import React from 'react';
import "./HomePage.css";

function HomePage({ showSideBar }) {
  const options = [
    "all", "Live", "News", "Music", "Mixes", "Indiana", "soapoperas", "Indian Army",
    "comedy nights with Kapil", "train station", "satire", "Cricket Batting Score",
    "gamer thriller"
  ];

  return (
    <div className="homepage-content">
      <div className={`top-bar ${showSideBar ? 'with_sidebar' : 'without_sidebar'}`}>
        {options.map((item, index) => (
          <div className="top-icon" key={index}>
            {item}
          </div>
        ))}
      </div>
      <div className={`show-videos ${showSideBar ? 'with_sidebar' : 'without_sidebar'}`}>
        <div className="video-box">
          <div className="thumbnail-box">
            <img src="https://purepng.com/public/uploads/large/purepng.com-youtube-iconsymbolsiconsapple-iosiosios-8-iconsios-8-721522596145hip8d.png" alt="Video Thumbnail" />
            <p className="time">8:60:20</p>
          </div>
          <div className="video_detail_box">
            <b className="title">Title</b>
            <p className="channel-name">Channel Name</p>
            <p className="views">123K views</p>
          </div>
        </div>

        <div className="video-box">
          <div className="thumbnail-box">
            <img src="https://via.placeholder.com/320x180" alt="Video Thumbnail" />
            <p className="time">8:60:20</p>
          </div>
          <div className="video_detail_box">
            <b className="title">Title</b>
            <p className="channel-name">Channel Name</p>
            <p className="views">123K views</p>
          </div>
        </div>

        <div className="video-box">
          <div className="thumbnail-box">
            <img src="https://via.placeholder.com/320x180" alt="Video Thumbnail" />
            <p className="time">8:60:20</p>
          </div>
          <div className="video_detail_box">
            <b className="title">Title</b>
            <p className="channel-name">Channel Name</p>
            <p className="views">123K views</p>
          </div>
        </div>

        <div className="video-box">
          <div className="thumbnail-box">
            <img src="https://via.placeholder.com/320x180" alt="Video Thumbnail" />
            <p className="time">8:60:20</p>
          </div>
          <div className="video_detail_box">
            <b className="title">Title</b>
            <p className="channel-name">Channel Name</p>
            <p className="views">123K views</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default HomePage;
