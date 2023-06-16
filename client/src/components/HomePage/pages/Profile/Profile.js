import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(id: $userId) {
      username
      bio
    }
  }
`;

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId: 'user-id-here' }, // Replace with the actual user ID
  });

  useEffect(() => {
    if (!loading && data) {
      setUserData(data.getUser);
    }
  }, [loading, data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching user data</div>;
  }

  return (
    <>
      <div className="profileHeader">Your Profile</div>
      <div className="mainProfileContainer">
        {/* Render the user data */}
        {userData && (
          <div className="userProfileInfo">
            <img className="profilePfp" src={userData.profilePicture}></img>
            <div className="profileUsername">{userData.username}</div>
            <p className="profileBio">{userData.bio}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
