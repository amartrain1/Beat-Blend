import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import jwtDecode from 'jwt-decode';
import './profile.css';
import pfp from '../../../photos/pfp placeholder.png';
import Posts from './Posts/Posts';
import MyRecordings from './myRecordings/myRecordings';

const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(id: $userId) {
      username
      bio
    }
  }
`;

const Profile = () => {
  const token = localStorage.getItem('id_token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.data._id;
  console.log("userId:", userId);

  const [botHalf, setBotHalf] = useState("Posts");

  const botHalfRender = () => {
    if (botHalf === "Posts") {
      return <Posts />;
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


  // <div className="userProfileInfo">
  //           <img className="profilePfp" src={data.getUser.profilePicture} alt="Profile Picture" />
  //           <div className="profileUsername">{data.getUser.username}</div>
  //           <p className="profileBio">{data.getUser.bio}</p>
  //         </div>
  return (
    <>
      <div className="profileHeader">Your Profile</div>
      <div className="mainProfileContainer">
        {/* Render the user data */}
        {data && data.getUser && (
            <div className="userProfileInfo">
              <img className="profilePfp" src={pfp}></img>
              {/* <div className="profileName">FName LName</div> */}
              <div className="profileUsername">{`@${data.getUser.username}`}</div>
              <p className="profileBio">
                {data.getUser.bio}
              </p>
            </div>
        )}
      </div>
    </>
    
  );
};

export default Profile;
