import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMap } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const IconsWrapper = styled.nav`
  position: absolute;
  top: 10px;
  right: 0px;
  z-index: 1;
  background-color: white;
  color: black;
  display: flex;
`;

const IconLink = styled.a`
  color: ${(props) => props.color || "black"};
  text-decoration: none;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export default function Icons() {
  const [userColor, setUserColor] = useState("black");
  const [mapColor, setMapColor] = useState("black");

  return (
    <IconsWrapper>
      <IconLink
        href="#"
        color={userColor}
        onMouseEnter={() => setUserColor("blue")}
        onMouseLeave={() => setUserColor("black")}
      >
        <FontAwesomeIcon icon={faUser} />
      </IconLink>
      <IconLink
        href="#"
        color={mapColor}
        onMouseEnter={() => setMapColor("blue")}
        onMouseLeave={() => setMapColor("black")}
      >
        <FontAwesomeIcon icon={faMap} />
      </IconLink>
    </IconsWrapper>
  );
}
