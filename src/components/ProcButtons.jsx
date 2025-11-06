import React from "react";

const ProcButtons = ({onProc, onProcPlay}) => {
  return (
    <>
      <button id="process" onClick={onProc} className="btn btn-outline-secondary">
        Preprocess
      </button>
      <button id="process_play" onClick={onProcPlay} className="btn btn-outline-secondary">
        Proc & Play
      </button>
    </>
  );
};

export default ProcButtons;
