import React, { useEffect, useState } from "react";
import styled from "styled-components";

const PadButton = ({active, onToggle}) => {
//   const [active, setActive] = useState(false);

  //   Animate a click by controlling the Active state.
//   useEffect(() => {
//     if (active) {
//       const timer = setTimeout(() => {
//         setActive(false);
//       }, 150);

//       return () => clearTimeout(timer);
//     }
//   }, [active]);

  const handleClick = () => {
    // setActive(true);
  };

  return <Container $active={active} onClick={onToggle}></Container>;
};

export default PadButton;

const Container = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin: 16px;
  cursor: pointer;
  transition: all 100ms linear;

  /* background: radial-gradient(#01c6bd 35%, white); */
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.3), 0 6px 0 #a009a3a0,
    3px 3px 10px rgba(0, 0, 0, 0.3);
  background: #ffb8d7;
  background: radial-gradient(at center, #ffb8d7, #a109a3);

  /* Dynamic properties based on the active state
  of the button to animate a click. */
  box-shadow: ${(props) =>
    props.$active
      ? "inset 0 2px 6px rgba(0, 0, 0, 0.4), 0px 2px 0px #a009a3a0,1px 1px 4px rgba(0, 0, 0, 0.3)"
      : "inset 0 2px 10px rgba(0, 0, 0, 0.3), 0 6px 0 #a009a3a0,3px 3px 10px rgba(0, 0, 0, 0.3)"};

  transform: ${(props) => (props.$active ? "translateY(2px)" : "")};
`;
