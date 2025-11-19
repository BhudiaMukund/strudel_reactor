import React from "react";
import {CustomSlider} from ".";
import styled from "styled-components";

const PerformanceControls = ({
  cps,
  reverb,
  lpf,
  setCps,
  setReverb,
  setLpf,
  handleProcAndPlay,
}) => {
  return (
    <PerformanceControlsContainer className="accordion element" id="performanceControlsParent">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#performanceControls"
          >
            <span className="element-title">Performance Controls</span>
          </button>
        </h2>
        <div
          id="performanceControls"
          className="accordion-collapse show"
          data-bs-parent="#performanceControlsParent"
        >
          <CustomSlider
            label="Reverb"
            min={0}
            max={1}
            step={0.01}
            value={reverb}
            onChange={(e) => {
              setReverb(e.target.value);
              handleProcAndPlay();
            }}
            precision={2}
          />
          <CustomSlider
            label={"Low Pass Filter"}
            min={200}
            max={8000}
            step={10}
            value={lpf}
            onChange={(e) => {
              setLpf(e.target.value);
            }}
            onMouseUp={handleProcAndPlay}
          />
          <CustomSlider
            label="Tempo"
            min={0.5}
            max={3}
            step={0.01}
            value={cps}
            onChange={(e) => {
              setCps(e.target.value);
              handleProcAndPlay();
            }}
            precision={2}
          />
        </div>
      </div>
    </PerformanceControlsContainer>
  );
};

export default PerformanceControls;

const PerformanceControlsContainer = styled.div`
    #performanceControls {
        padding: 0.5rem 1rem;
    }
`