import React, { useState, useRef } from "react";
import jwtDecode from "jwt-decode";
import "./editProfile.css";
import pfp from "../../../photos/pfp placeholder.png";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../../utils/mutations";

const EditProfile = () => {
  const token = localStorage.getItem('id_token');
  console.log(token);
  let decoded, id;

  if (token) {
    try {
      decoded = jwtDecode(token);
      id = decoded.userID;
    } catch (error) {
      console.error('Invalid JWT', error);
    }
  } else {
    console.error('No JWT found');
  }

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [length, setLength] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [privateAcc, setPrivateAcc] = useState("Public");
  const inputFileRef = useRef(null);

  const [updateUser, { loading: updating, error: updateError }] = useMutation(UPDATE_USER, {
    onCompleted: (data) => {
      console.log("Update successful");
    },
    onError: (error) => {
      console.log("Update error", error);
    }
  });

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await updateUser({ variables: { id, name, username, email, bio } });
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  const handleImageSelection = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const countLength = (event) => {
    setBio(event.target.value);
    setLength(event.target.value.length);
  }

  return (
    <>
      <div className="settingsHeader">Edit Profile</div>
      <div className="mainSettingsContainer">
        <form onSubmit={handleUpdate}>
          <div className="pfpEdit">
            <img
              className="settingsPfp"
              src={selectedImage ? URL.createObjectURL(selectedImage) : pfp}
              alt="profile"
            />
            <button
              className="pfpChangeBtn"
              onClick={() => inputFileRef.current.click()}
            >
              Update Image
            </button>
          </div>
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
              value={bio}
            />
          </div>
          <div className="settings">
            <div className="singleSetting">
              <div className="settingLabel">Name:</div>
              <input className="settingInput" placeholder="Enter a name" onChange={(event) => setName(event.target.value)} value={name} />
            </div>
            <div className="singleSetting">
              <div className="settingLabel">Username:</div>
              <input className="settingInput" placeholder="Enter a username" onChange={(event) => setUsername(event.target.value)} value={username} />
            </div>
            <div className="singleSetting">
              <div className="settingLabel">Email:</div>
              <input className="settingInput" placeholder="Enter an email" onChange={(event) => setEmail(event.target.value)} value={email} />
            </div>
            <div className="singleSetting">
              <div className="settingLabel">Private Account:</div>
              <div className="privateButtonsContainer">
                <div className="privateButton">
                  <div
                    className={privateAcc === "Public" ? "active privateBtn" : "privateBtn"}
                    onClick={() => setPrivateAcc("Public")}
                  >
                    Public
                  </div>
                </div>
                <div className="privateButton">
                  <div
                    className={privateAcc === "Private" ? "active privateBtn" : "privateBtn"}
                    onClick={() => setPrivateAcc("Private")}
                  >
                    Private
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="saveBtn">Save</button>
        </form>
        <input
          ref={inputFileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageSelection}
        />
      </div>
    </>
  );
};

export default EditProfile;
