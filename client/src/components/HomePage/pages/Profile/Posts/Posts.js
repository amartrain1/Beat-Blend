import React, { useState } from "react";
import pfp from "../../../../photos/pfp placeholder.png";
import pfpNav from "../../../../photos/pfp nav.png";
import play from "../../../../photos/play button.png";
import playBar from "../../../../photos/play bar.png";
import download from "../../../../photos/download.png";
import heart from "../../../../photos/heart.png";
import liked from "../../../../photos/heart full.png";

const Posts = ({ posts }) => {
  const [like, setLike] = useState(false);

  const handleLike = () => {
    if (!like) {
      setLike(true);
    }
    if (like) {
      setLike(false);
    }
  };

  const reversedPosts = [...posts].reverse();
  
  const reversedPosts = [...posts].reverse();
  
  return (
    <>
    {reversedPosts.map((post) => (  
      <div key={post._id} className="feedElement">
        <div className="topBar">
          <div className="userInfo">
            <img className="pfp" src={pfp}></img>
            <div className="username">{`${post.postAuthor} | ${post.createdAt}`}</div>
          </div>
          <div className="likeBtn">
            <img
              className="heart"
              onClick={handleLike}
              src={!like ? heart : liked}
            />
          </div>
        </div>
        <p>
       {post.postText}
        </p>
        <div className="recordingContainer">
          
          <img className="playBtn" src={play} />
          <img className="playBar" src={playBar} />
          <img className="download" src={download} />
        </div>
      </div>
    ))}
    </>
  );
};

export default Posts;
