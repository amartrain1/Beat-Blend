import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import "./feed.css";
import { GET_POSTS } from "../../../../utils/queries";
import FeedElement from './FeedElement/FeedElement'

const Feed = () => {
  const [likes, setLikes] = useState(Array(6).fill(false));

  const handleLike = (index) => {
    const updatedLikes = [...likes];
    updatedLikes[index] = !updatedLikes[index];
    setLikes(updatedLikes);
  };

  // const handlePlay = () => {
  //   console.log("Play button has been clicked");
  // };

  // const handleDownload = () => {
  //   console.log("Download button has been clicked");
  // };

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
            <FeedElement key={post._id} post={post} />
          ))}
        </div>
    </>
  );
};

export default Feed;
