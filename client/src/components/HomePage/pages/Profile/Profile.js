import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import jwtDecode from "jwt-decode";
import "./profile.css";
import pfp from "../../../photos/pfp placeholder.png";
import Posts from "./Posts/Posts";
import MyRecordings from "./myRecordings/myRecordings";
import { GET_USER } from "../../../../utils/queries";

const Profile = () => {
  const token = localStorage.getItem("id_token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.data._id;
  console.log("userId:", userId);

  const [botHalf, setBotHalf] = useState("Posts");

  const botHalfRender = () => {
    if (botHalf === "Posts") {
      return <Posts posts={data.getUser.posts} />;
    }
    if (botHalf === "myRecordings") {
      return <MyRecordings />;
    }
  };

  const handleBotHalfChange = (prop) => {
    setBotHalf(prop);
  };

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      userId: userId,
    },
  });

  console.log(data);  //!

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!loading && data) {
      console.log("Retrieved user data", data.getUser);
      setUserData(data.getUser);
    }
  }, [loading, data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="profileHeader">Your Profile</div>
      {data && data.getUser && (
        <div className="mainProfileContainer">
          {/* Render the user data */}
          <div className="userProfileInfo">
            <img className="profilePfp" src={pfp}></img>
            <div className="profileName">{data.getUser.name}</div>
            <div className="profileUsername">{`@${data.getUser.username}`}</div>
            <p className="profileBio">{data.getUser.bio}</p>
          </div>
          <div className="profileButtons">
            <div
              className={
                botHalf === "Posts" ? "profileBtn active" : "profileBtn"
              }
              onClick={() => handleBotHalfChange("Posts")}
            >
              Posts
            </div>
            <div
              className={
                botHalf === "myRecordings" ? "profileBtn active" : "profileBtn"
              }
              onClick={() => handleBotHalfChange("myRecordings")}
            >
              My Recordings
            </div>
          </div>
          {botHalfRender()}
        </div>
      )}
    </>
  );
};

export default Profile;
