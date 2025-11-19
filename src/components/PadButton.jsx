import React, { useEffect, useState } from "react";
import styled from "styled-components";

const PadButton = ({ label, active, onToggle, colours }) => {
  /// Changing state restarts animation.
  const [rippleKey, setRippleKey] = useState(0);

  const handleClick = (e) => {
    // Restart ripple animation
    setRippleKey((prev) => prev + 1);

    // Slight delay so the ripple shows before toggling the instrument.
    setTimeout(() => {
      onToggle();
    }, 100);
  };
  return (
    <Container
      $active={active}
      $priColor={colours.primary}
      $secColor={colours.secondary}
      $terColor={colours.tertiary}
      onClick={handleClick}
    >
      <Ripple key={rippleKey} $color={colours.secondary} />
      {label}
    </Container>
  );
};

export default PadButton;

const Container = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #373737;
  font-size: 16px;
  position: relative;
  overflow: hidden;
  margin: 16px;
  cursor: pointer;
  transition: all 50ms linear;
  background: ${(props) => (props.$active ? `${props.$priColor}` : "#888")};
  background: ${(props) =>
    props.$active
      ? `radial-gradient(at center, ${props.$priColor}, ${props.$secColor})`
      : "radial-gradient(at center, #c5c5c5, #888)"};

  /* Dynamic properties based on the active state
  of the button to animate a click. */
  box-shadow: ${(props) =>
    props.$active
      ? `inset 0 2px 6px rgba(0, 0, 0, 0.4), 0px 2px 0px ${props.$terColor},1px 1px 4px rgba(0, 0, 0, 0.3)`
      : `inset 0 2px 10px rgba(0, 0, 0, 0.3), 0 6px 0 #8888889a,3px 3px 10px rgba(0, 0, 0, 0.3)`};

  transform: ${(props) => (props.$active ? "translateY(2px)" : "")};
`;

const Ripple = styled.span`
  position: absolute;
  width: 20px;
  height: 20px;
  background: ${(p) => p.$color};
  opacity: 0.6;
  border-radius: 50%;
  transform: scale(0);
  animation: rippleEffect 500ms ease-out forwards;

  @keyframes rippleEffect {
    to {
      transform: scale(12);
      opacity: 0;
    }
  }
`;
