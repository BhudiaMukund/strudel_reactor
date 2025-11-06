import React from "react";

const PreprocessText = ({defaultValue, handleChange}) => {
  return (
    <>
      <label htmlFor="exampleFormControlTextarea1" className="form-label">
        Preprocessing text:
      </label>
      <textarea className="form-control" defaultValue={defaultValue} onChange={handleChange} rows="8" id="proc"></textarea>
    </>
  );
};

export default PreprocessText;
