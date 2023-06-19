import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import "../feed.css";
import pfp from "../../../../photos/pfp placeholder.png";
import pfpNav from "../../../../photos/pfp nav.png";
import play from "../../../../photos/play button.png";
import playBar from "../../../../photos/play bar.png";
import download from "../../../../photos/download.png";
import heart from "../../../../photos/heart.png";
import liked from "../../../../photos/heart full.png";

const FeedElement = ({ post }) => {
  // const [likes, setLikes] = useState(Array(6).fill(false));
  // const handleLike = (index) => {
  //   const updatedLikes = [...likes];
  //   updatedLikes[index] = !updatedLikes[index];
  //   setLikes(updatedLikes);
  // };

  const [postLiked, setPostLiked] = useState(false);
  const handleLike = (index) => {
    if (!postLiked) {
      setPostLiked(true);
    }
    if (postLiked) {
      setPostLiked(false);
    }
  };

  return (
    <>
      <div key={post._id} className="feedElement">
        <div className="topBar">
          <div className="userInfo">
            <img className="pfp" src={pfp} alt="Profile" />
            <div className="username">{`@${post.postAuthor} | ${post.createdAt}`}</div>
          </div>
          <div className="likeBtn">
            <img
              className="heart"
              onClick={() => handleLike(post._id)}
              src={!postLiked ? heart : liked}
              alt="Like"
            />
          </div>
        </div>
        <p>{post.postText}</p>
        <p>{post.postAudio}</p>
        <div className="recordingContainer">
          <img className="playBtn" src={play} alt="Play" />
          <img className="playBar" src={playBar} alt="Progress Bar" />
          <img
            className="download"
            src={download}
            alt="Download"
            // onClick={handleDownload}
          />
        </div>
      </div>
    </>
  );
};

export default FeedElement;
