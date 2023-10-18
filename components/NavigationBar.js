import React from "react";
import styled from "styled-components";
import Link from "next/link";

const NavbarWrapper = styled.nav`
  background-color: #add8e6;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  display: flex; /* Align list items horizontally */
`;

const ListItem = styled.li`
  margin: 0 20px;
`;

const StyledLink = styled.a`
  color: black;
  text-decoration: none;
`;

export default function NavigationBar() {
  return (
    <NavbarWrapper>
      <ListWrapper>
        <ListItem>
          <Link href="/popular-destinations">
            <StyledLink>Popular Destinations</StyledLink>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/other-destinations">
            <StyledLink>Other Destinations</StyledLink>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/favorite-destinations">
            <StyledLink>Favorite Destinations</StyledLink>
          </Link>
        </ListItem>
      </ListWrapper>
    </NavbarWrapper>
  );
}
