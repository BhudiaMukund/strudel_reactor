import React from "react";
import styled from "styled-components";

const PreprocessText = ({defaultValue, handleChange}) => {
  return (
    <>
      <label htmlFor="exampleFormControlTextarea1" className="form-label element-title">
        Preprocessing text:
      </label>
      <TextArea className="form-control" defaultValue={defaultValue} onChange={handleChange} rows="8" id="proc"></TextArea>
    </>
  );
};

export default PreprocessText;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  color: #f8f9fa;
`
