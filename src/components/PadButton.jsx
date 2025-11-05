import React from "react";
import styled from "styled-components";

const PadButton = () => {
  return <Container></Container>;
};

export default PadButton;

const Container = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin: 16px;
  cursor: pointer;
  transition: all 100ms linear;

  background: radial-gradient(#01c6bd 35%, white);
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.3), 0 6px 0 #a009a3a0,
    3px 3px 10px rgba(0, 0, 0, 0.3);
  background: #ffb8d7;
  background: radial-gradient(at center, #ffb8d7, #a109a3);
`;
