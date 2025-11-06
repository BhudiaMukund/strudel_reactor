import React from "react";

const VolumeSlider = ({volume, handleVolumeChange}) => {
  return (
    <>
      <label htmlFor="customRange1" class="form-label" style={{textAlign:"end",width:"100%",marginTop:"4px",marginBottom:"-10px"}}>
        Volume
      </label>
      <input
        type="range"
        class="form-range"
        id="customRange1"
        min={0}
        max={1}
        step={0.05}
        value={volume}
        onChange={handleVolumeChange}
      ></input>
    </>
  );
};

export default VolumeSlider;
