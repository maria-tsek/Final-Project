import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { signOut, signIn, useSession } from "next-auth/react";
import { btn, login, logout } from "./auth-button/AuthButton.module.css";

const IconsWrapper = styled.nav`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  background-color: rgba(173, 216, 230, 0.8);
  color: black;
  display: flex;
`;

const IconLink = styled.a`
  color: ${(props) => props.color || "black"};
  text-decoration: none;
  margin-left: 10px; /* Adjust the left margin as needed */

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const AuthButtonWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
`;

const AuthForm = styled.div`
  background: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

export default function AuthButton() {
  const { data: session } = useSession();
  const [showSignIn, setShowSignIn] = useState(false);
  const [userColor, setUserColor] = useState("black");

  const handleUserIconClick = () => {
    setShowSignIn(true);
  };

  return (
    <IconsWrapper>
      <IconLink
        href="#"
        color={userColor}
        onMouseEnter={() => setUserColor("blue")}
        onMouseLeave={() => setUserColor("black")}
        onClick={handleUserIconClick}
      >
        <FontAwesomeIcon icon={faUser} size="lg" />{" "}
        {/* Adjust the size with "lg", "2x", "3x", etc. */}
      </IconLink>
      {showSignIn && (
        <AuthButtonWrapper>
          <AuthForm>
            {session ? (
              <button className={`${btn} ${logout}`} onClick={() => signOut()}>
                Sign out
              </button>
            ) : (
              <button className={`${btn} ${login}`} onClick={() => signIn()}>
                Sign in
              </button>
            )}
          </AuthForm>
        </AuthButtonWrapper>
      )}
    </IconsWrapper>
  );
}
