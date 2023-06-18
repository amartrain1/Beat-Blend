import React, { useState } from "react";
import './feed.css'
import pfp from "../../../photos/pfp placeholder.png";
import pfpNav from "../../../photos/pfp nav.png";
import play from "../../../photos/play button.png";
import playBar from "../../../photos/play bar.png";
import download from "../../../photos/download.png";
import heart from "../../../photos/heart.png";
import liked from "../../../photos/heart full.png";

const Feed = () => {
  const [likes, setLikes] = useState(Array(6).fill(false));

 const handleLike = (index) => {
   const updatedLikes = [...likes];
   updatedLikes[index] = !updatedLikes[index];
   setLikes(updatedLikes);
 };

 const handlePlay = () => {
   console.log("Play button has been clicked");
 };

 const handleDownload = () => {
   console.log("Download button has been clicked");
 };

  return (
    <>
      <div className="feedHeader">Your Feed</div>
      <div className="feed">
        <div className="feedElement">
          <div className="topBar">
            <div className="userInfo">
              <img className="pfp" src={pfp} alt="Profile" />
              <div className="username">@username | 1h</div>
            </div>
            <div className="likeBtn">
              <img
                className="heart"
                onClick={() => handleLike(0)}
                src={!likes[0] ? heart : liked}
                alt="Like"
              />
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="recordingContainer">
            <img
              className="playBtn"
              src={play}
              alt="Play"
              onClick={handlePlay}
            />
            <img className="playBar" src={playBar} alt="Progress Bar" />
            <img
              className="download"
              src={download}
              alt="Download"
              onClick={handleDownload}
            />
          </div>
        </div>
        <div className="feedElement">
          <div className="topBar">
            <div className="userInfo">
              <img className="pfp" src={pfp} alt="Profile" />
              <div className="username">@username | 1h</div>
            </div>
            <div className="likeBtn">
              <img
                className="heart"
                onClick={() => handleLike(1)}
                src={!likes[1] ? heart : liked}
                alt="Like"
              />
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="recordingContainer">
            <img
              className="playBtn"
              src={play}
              alt="Play"
              onClick={handlePlay}
            />
            <img className="playBar" src={playBar} alt="Progress Bar" />
            <img
              className="download"
              src={download}
              alt="Download"
              onClick={handleDownload}
            />
          </div>
        </div>
        <div className="feedElement">
          <div className="topBar">
            <div className="userInfo">
              <img className="pfp" src={pfp} alt="Profile" />
              <div className="username">@username | 1h</div>
            </div>
            <div className="likeBtn">
              <img
                className="heart"
                onClick={() => handleLike(2)}
                src={!likes[2] ? heart : liked}
                alt="Like"
              />
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="recordingContainer">
            <img
              className="playBtn"
              src={play}
              alt="Play"
              onClick={handlePlay}
            />
            <img className="playBar" src={playBar} alt="Progress Bar" />
            <img
              className="download"
              src={download}
              alt="Download"
              onClick={handleDownload}
            />
          </div>
        </div>
        <div className="feedElement">
          <div className="topBar">
            <div className="userInfo">
              <img className="pfp" src={pfp} alt="Profile" />
              <div className="username">@username | 1h</div>
            </div>
            <div className="likeBtn">
              <img
                className="heart"
                onClick={() => handleLike(3)}
                src={!likes[3] ? heart : liked}
                alt="Like"
              />
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="recordingContainer">
            <img
              className="playBtn"
              src={play}
              alt="Play"
              onClick={handlePlay}
            />
            <img className="playBar" src={playBar} alt="Progress Bar" />
            <img
              className="download"
              src={download}
              alt="Download"
              onClick={handleDownload}
            />
          </div>
        </div>
        <div className="feedElement">
          <div className="topBar">
            <div className="userInfo">
              <img className="pfp" src={pfp} alt="Profile" />
              <div className="username">@username | 1h</div>
            </div>
            <div className="likeBtn">
              <img
                className="heart"
                onClick={() => handleLike(4)}
                src={!likes[4] ? heart : liked}
                alt="Like"
              />
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="recordingContainer">
            <img
              className="playBtn"
              src={play}
              alt="Play"
              onClick={handlePlay}
            />
            <img className="playBar" src={playBar} alt="Progress Bar" />
            <img
              className="download"
              src={download}
              alt="Download"
              onClick={handleDownload}
            />
          </div>
        </div>
        <div className="feedElement">
          <div className="topBar">
            <div className="userInfo">
              <img className="pfp" src={pfp} alt="Profile" />
              <div className="username">@username | 1h</div>
            </div>
            <div className="likeBtn">
              <img
                className="heart"
                onClick={() => handleLike(5)}
                src={!likes[5] ? heart : liked}
                alt="Like"
              />
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="recordingContainer">
            <img
              className="playBtn"
              src={play}
              alt="Play"
              onClick={handlePlay}
            />
            <img className="playBar" src={playBar} alt="Progress Bar" />
            <img
              className="download"
              src={download}
              alt="Download"
              onClick={handleDownload}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
