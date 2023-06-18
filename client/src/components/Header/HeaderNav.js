import React from "react";
import "./headerNav.css";
import logo from "../photos/beat_blend_logo_1_transparent.png";
import soundFile from "../audio/beatblendtheme.mp3"

const HeaderNav = () => {
  const handleClick = () => {
    const audio = new Audio(soundFile);
    audio.play();
  }
  return (
    <div className="mainHeaderContainer">
      <div className="headerNav">
        <img className="logoTop" src={logo} onClick={handleClick} alt="Beat Blend Logo">
         </img>
        <h1>Beat Blend</h1>
      </div>
    </div>
  );
};

export default HeaderNav;
