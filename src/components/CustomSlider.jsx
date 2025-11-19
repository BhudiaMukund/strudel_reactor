import React from "react";
import styled from "styled-components";

const CustomSlider = ({
  label,
  min,
  max,
  step,
  value,
  onChange,
  onMouseUp,
  precision,
  displayValue,
}) => {
  return (
    <SliderContainer>
      {/* Label and formatted value */}
      <label>
        {label} :{" "}
        <span>{Number(displayValue || value).toFixed(precision || 0)}</span>
      </label>

      {/* Range input slider */}
      <input
        className="slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        onMouseUp={onMouseUp}
      />
    </SliderContainer>
  );
};

export default CustomSlider;

const SliderContainer = styled.div`
  margin: 1rem 0;
  font-family: Inter, Arial, sans-serif;

  label {
    display: block;
    margin-bottom: 0.4rem;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .slider {
    width: 100%;
    height: 8px;
    border-radius: 6px;
    background: linear-gradient(90deg, #a109a3, #ffb8d7);
    outline: none;
    transition: background 0.3s;
    cursor: pointer;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background: white;
      border: 2px solid #a109a3;
      border-radius: 50%;
      box-shadow: 0px 0px 4px #00000050;
      transition: transform 0.1s ease-in-out;
    }

    &::-webkit-slider-thumb:hover {
      transform: scale(1.15);
    }

    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: white;
      border: 2px solid #a109a3;
      border-radius: 50%;
    }
  }
`;
