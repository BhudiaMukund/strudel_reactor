import React from "react";

const ProcButtons = ({onProc, onProcPlay}) => {
  return (
    <>
      <button id="process" onClick={onProc} className="btn btn-secondary">
        Preprocess
      </button>
      <button id="process_play" onClick={onProcPlay} className="btn btn-secondary">
        Proc & Play
      </button>
    </>
  );
};

export default ProcButtons;
