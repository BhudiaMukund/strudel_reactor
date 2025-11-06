import React from "react";

const PlayButtons = ({onPlay, onStop}) => {
  return (
    <>
      <button id="play" onClick={onPlay} className="btn btn-outline-success">
        Play
      </button> 
      <button id="stop" onClick={onStop} className="btn btn-outline-danger">
        Stop
      </button>
    </>
  );
};

export default PlayButtons;
