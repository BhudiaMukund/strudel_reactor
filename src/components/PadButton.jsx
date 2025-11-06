import React, { useEffect, useState } from "react";
import styled from "styled-components";

const PadButton = ({active, onToggle, colours}) => {
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

  return <Container $active={active} $priColor={colours.primary} $secColor={colours.secondary} $terColor={colours.tertiary} onClick={onToggle}></Container>;
};

export default PadButton;

const Container = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin: 16px;
  cursor: pointer;
  transition: all 100ms linear;
  background: ${(props => (props.$active ? `${props.$priColor}` : "#888"))};
  background: ${(props => (props.$active ? `radial-gradient(at center, ${props.$priColor}, ${props.$secColor})` : "radial-gradient(at center, #c5c5c5, #888)"))};

  /* Dynamic properties based on the active state
  of the button to animate a click. */
  box-shadow: ${(props) =>
    props.$active
      ? `inset 0 2px 6px rgba(0, 0, 0, 0.4), 0px 2px 0px ${props.$terColor},1px 1px 4px rgba(0, 0, 0, 0.3)`
      : `inset 0 2px 10px rgba(0, 0, 0, 0.3), 0 6px 0 #8888889a,3px 3px 10px rgba(0, 0, 0, 0.3)`};

  transform: ${(props) => (props.$active ? "translateY(2px)" : "")};
`;
