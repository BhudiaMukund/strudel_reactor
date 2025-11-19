import React from "react";
import styled from "styled-components";

const PreprocessText = ({ defaultValue, handleChange }) => {
  return (
    <>
      <div className="accordion element" id="preprocessTextParent">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#preprocessText"
            >
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label element-title"
              >
                Preprocessing text:
              </label>
            </button>
          </h2>
          <div
            id="preprocessText"
            className="accordion-collapse show"
            data-bs-parent="#preprocessTextParent"
          >
            <TextArea
              className="form-control"
              value={defaultValue}
              onChange={handleChange}
              rows="8"
              id="proc"
            ></TextArea>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreprocessText;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  color: #f8f9fa;
  &:focus {
    color: #f8f9fa;
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.15);
  }
`;
