import React from "react";

const PreprocessText = ({defaultValue, handleChange}) => {
  return (
    <>
      <label htmlFor="exampleFormControlTextarea1" className="form-label">
        Text to preprocess:
      </label>
      <textarea className="form-control" defaultValue={defaultValue} onChange={handleChange} rows="15" id="proc"></textarea>
    </>
  );
};

export default PreprocessText;
