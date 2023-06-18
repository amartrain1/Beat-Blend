import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import "./feed.css";
import pfp from "../../../photos/pfp placeholder.png";
import pfpNav from "../../../photos/pfp nav.png";
import play from "../../../photos/play button.png";
import playBar from "../../../photos/play bar.png";
import download from "../../../photos/download.png";
import heart from "../../../photos/heart.png";
import liked from "../../../photos/heart full.png";
import { GET_POSTS } from "../../../../utils/queries";

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

  const { data, loading, error } = useQuery(GET_POSTS);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    if (!loading && data) {
      console.log("Retrieved post data", data.getPosts);
      setPostData(data.getPosts);
    }
  }, [loading, data]);

  return (
    <>
      <div className="feedHeader">Your Feed</div>
      <div className="feed">
        {postData &&
          postData.map((post) => (
            <div key={post._id} className="feedElement">
              <div className="topBar">
                <div className="userInfo">
                  <img className="pfp" src={pfp} alt="Profile" />
                  <div className="username">{`@${post.postAuthor} | ${post.createdAt}`}</div>
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
                {post.postText}
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
          ))}
        </div>
    </>
  );
};

export default Feed;
