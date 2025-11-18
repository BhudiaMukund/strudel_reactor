import React from "react";

const PlayButtons = ({onPlay, onStop}) => {
  return (
    <>
      <button id="play" onClick={onPlay} className="btn btn-outline-success">
        <i className="bi bi-play-fill"></i><span>Play</span>
      </button> 
      <button id="stop" onClick={onStop} className="btn btn-outline-danger">
        <i className="bi bi-stop-fill"></i><span>Stop</span>
      </button>
    </>
  );
};

export default PlayButtons;
