import React, { useState } from "react";
import { useMutation, gql } from '@apollo/client';
import "./editProfile.css";
import pfp from "../../../photos/pfp placeholder.png";

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

  const [updateUser, { error: errorUser }] = useMutation(UPDATE_USER);
  const [addBio, { error: errorBio }] = useMutation(ADD_BIO);

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
            <input className="settingInput" placeholder="Enter a name" onChange={e => setName(e.target.value)} />
          </div>
          <div className="singleSetting">
            <div className="settingLabel">Username:</div>
            <input className="settingInput" placeholder="Enter a username" onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="singleSetting">
            <div className="settingLabel">Email:</div>
            <input className="settingInput" placeholder="Enter a email" onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="singleSetting">
            <div className="settingLabel">Password:</div>
            <input className="settingInput" placeholder="Enter a password" onChange={e => setPassword(e.target.value)} />
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
        <div className="saveBtn" onClick={handleSubmit}>Save</div>
      </div>
    </>
  );
};

export default EditProfile;
