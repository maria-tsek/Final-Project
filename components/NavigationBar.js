import React from "react";
import styled from "styled-components";
import Link from "next/link";

const NavbarWrapper = styled.nav`
  background-color: #002447;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
  box-shadow: 0 10px 7px rgba(0, 0, 0, 0.1);
`;

const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
`;

const ListItem = styled.li`
  margin: 0 20px;
  font-size: 1.2em;
`;

const StyledLink = styled.a`
  color: white;
  text-decoration: none;
  transition: color 0.2s;
  font-weight: bold;

  &:hover {
    color: #79c5e7;
  }
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
