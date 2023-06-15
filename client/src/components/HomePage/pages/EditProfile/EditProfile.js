import React, { useState, useRef } from "react";
//useRef hook accepts one argument as the initial value and returns a reference(ref)
import "./editProfile.css";
import pfp from "../../../photos/pfp placeholder.png";

const EditProfile = () => {
  const [privateAcc, setPrivateAcc] = useState("Public");

  const [length, setLength] = useState(0);
  const inputFileRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  //inputFileRef adds a reference to hidden file input element
  //selectedImage variable stores the selected image file

  function countLength() {
    const textarea = document.getElementById("textInput");
    var string = textarea.value;
    setLength(string.length);
  }

  const handleImageSelection = (event) => {
    //handleImageSelection function to handle the image selection from the file input, retrieves the selected image file from the event object and updates the selectedImage state variable
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <>
      <div className="settingsHeader">Edit Profile</div>
      <div className="mainSettingsContainer">
        <div className="pfpEdit">
          <img
          //Modifies the src attribute of the profile picture <img> element to display the selected image if available otherwise it falls back to the placeholder image
            className="settingsPfp"
            src={selectedImage ? URL.createdObjectURL(selectedImage) : pfp}
            alt="profile"
          />
          <button
          //Adds and onClick event handler to the "Update Image" button that triggers a click event on the hidden file input element, allowing user to select image
            className="pfpChangeBtn"
            onClick={() => inputFileRef.current.click()}
          >
            Update Image
          </button>
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
      <input
      //Sets the ref(reference) attribute to the inputFileRef to access the input element
      //Adds a hidden file input element (input type="file") that allows user to select an image from local file system
        ref={inputFileRef}
        type="file"
        //restricts the file selection to image files
        accept="image/*"
        //hides the file input element
        style={{ display: "none" }}
        //sets the onChange event handler to handleImageSelection to handle the image selection
        onChange={handleImageSelection}
      />
    </>
  );
};

export default EditProfile;
