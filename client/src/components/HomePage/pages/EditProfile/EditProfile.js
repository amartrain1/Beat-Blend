import React, { useEffect, useState } from "react";
import { useMutation, gql } from '@apollo/client';
import "./editProfile.css";
import pfp from "../../../photos/pfp placeholder.png";
import jwtDecode from "jwt-decode";

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String!, $username: String!, $email: String!, $password: String!, $bio: String!) {
    updateUser(id: $id, name: $name, username: $username, email: $email, password: $password, bio: $bio) {
      id
      name
      username
      email
      password
      bio
    }
  }
`;

const ADD_BIO = gql`
  mutation AddBio($bioText: String!) {
    addBio(bioText: $bioText) {
      id
      bioText
    }
  }
`;

const EditProfile = () => {
  const [privateAcc, setPrivateAcc] = useState("Public");
  const [length, setLength] = useState(0);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [user, setUser] = useState(null);

  const [updateUser, { error: errorUser }] = useMutation(UPDATE_USER);
  const [addBio, { error: errorBio }] = useMutation(ADD_BIO);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      getUserFromToken(decodedToken).then(setUser);
    }
  }, []);

  // You need to define this function to retrieve the user from the token
  const getUserFromToken = async (token) => {
    // Implementation here
  };

  const countLength = (e) => {
    setLength(e.target.value.length);
    setBio(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await updateUser({
        variables: { id: user.id, name, username, email, password, bio },
      });
    } catch (error) {
      console.error(error);
      try {
        await addBio({
          variables: { bioText: bio },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="settingsHeader">Edit Profile</div>
      <div className="mainSettingsContainer">
        <div className="pfpEdit">
          <img className="settingsPfp" src={pfp}></img>
          <button className="pfpChangeBtn">Update Image</button>
          <div className="bioContainer">
            <div className="settingLabel">Bio:</div>
            <p>
              <span className={length > 150 ? "red" : "green"}>{length}</span>
              /150
            </p>
            <textarea
              id="textInput"
              className="bioInput"
              type="text"
              placeholder="Enter Bio (150 char max)"
              onChange={countLength}
              rows="3"
            />
          </div>
        </div>
        <div className="settings">
          <div className="singleSetting">
            <div className="settingLabel">Name:</div>
            <input className="settingInput" placeholder="Enter a name" />
          </div>
          <div className="singleSetting">
            <div className="settingLabel">Username:</div>
            <input className="settingInput" placeholder="Enter a username" />
          </div>
          <div className="singleSetting">
            <div className="settingLabel">Email:</div>
            <input className="settingInput" placeholder="Enter a email" />
          </div>
          <div className="singleSetting">
            <div className="settingLabel">Password:</div>
            <input className="settingInput" placeholder="Enter a password" />
          </div>
          <div className="singleSetting">
            <div className="settingLabel">Private Account:</div>
            <div className="privateButtonsContainer">
              <div className="privateButton">
                <div
                  className={
                    privateAcc === "Public" ? "active privateBtn" : "privateBtn"
                  }
                  onClick={() => setPrivateAcc("Public")}
                >
                  Public
                </div>
              </div>
              <div className="privateButton">
                <div
                  className={
                    privateAcc === "Private"
                      ? "active privateBtn"
                      : "privateBtn"
                  }
                  onClick={() => setPrivateAcc("Private")}
                >
                  Private
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="saveBtn">Save</div>
      </div>
    </>
  );
};

export default EditProfile;
