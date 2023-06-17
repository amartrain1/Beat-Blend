import React, { useState, useRef, useEffect } from "react";
import jwtDecode from "jwt-decode";
import "./editProfile.css";
import pfp from "../../../photos/pfp placeholder.png";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "../../../../utils/mutations";
import { GET_USER } from "../../../../utils/queries";

const EditProfile = () => {
  const token = localStorage.getItem("id_token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.data._id;

  const [selectedImage, setSelectedImage] = useState(null);
  const [privateAcc, setPrivateAcc] = useState("Public");
  const inputFileRef = useRef(null);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      userId: userId,
    },
  });

  const [formState, setFormState] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
  });

  const [updateUser, { loading: updateLoading, error: updateError }] = useMutation(
    UPDATE_USER
  );

  useEffect(() => {
    if (data && data.getUser) {
      setFormState({
        name: data.getUser.name,
        username: data.getUser.username,
        email: data.getUser.email,
        bio: data.getUser.bio,
      });
    }
  }, [data]);

  const handleUpdate = async (event, context) => {
    event.preventDefault();
    try {
      await updateUser({
        variables: {
          id: userId,
          name: formState.name,
          username: formState.username,
          email: formState.email,
          bio: formState.bio,
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageSelection = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const [length, setLength] = useState(0);
  const countLength = (event) => {
    setLength(event.target.value.length);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  return (
    <>
      <div className="settingsHeader">Edit Profile</div>
      <div className="mainSettingsContainer">
        <form onSubmit={(e) => handleUpdate(e)}>
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
            <div className="bioContainer">
              <div className="settingLabel">Bio:</div>
              <p>
                <span className={length > 150 ? "red" : "green"}>{length}</span>
                /150
              </p>
              <textarea
                id="textInput1"
                className="bioInput"
                type="text"
                placeholder="Enter Bio (150 char max)"
                onChange={(e) => {
                  setFormState({ ...formState, bio: e.target.value });
                  countLength(e);
                }}
                rows="3"
                value={formState.bio}
              />
            </div>
          </div>
          <div className="settings">
            <div className="singleSetting">
              <div className="settingLabel">Name:</div>
              <input
                className="settingInput"
                placeholder="Enter a name"
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                value={formState.name}
              />
            </div>
            <div className="singleSetting">
              <div className="settingLabel">Username:</div>
              <input
                className="settingInput"
                placeholder="Enter a username"
                onChange={(e) =>
                  setFormState({ ...formState, username: e.target.value })
                }
                value={formState.username}
              />
            </div>
            <div className="singleSetting">
              <div className="settingLabel">Email:</div>
              <input
                className="settingInput"
                placeholder="Enter an email"
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                value={formState.email}
              />
            </div>
            <div className="singleSetting">
              <div className="settingLabel">Private Account:</div>
              <div className="privateButtonsContainer">
                <div className="privateButton">
                  <div
                    className={
                      privateAcc === "Public"
                        ? "active privateBtn"
                        : "privateBtn"
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
            <button type="submit" className="saveBtn">
              Save
            </button>
          </div>
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