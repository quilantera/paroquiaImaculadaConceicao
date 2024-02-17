"use client"
import React from "react";
import ReactPlayer from "react-player";



export function VideoPlayer(){
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url={"./videoEjc1.mp4"}
        controls
        width="30%"
        height="40%"
      />
    </div>
  );
};
