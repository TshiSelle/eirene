import React from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom'

const NavBar = () => {
    const location = useLocation();
  console.log(location.pathname);
  return (
      <Header pathname={location.pathname}>
        <Nav>
          <Anchor href={"/"}>Home</Anchor>
          <Anchor href={"/find-therapists"}>Therapists</Anchor>
          <Anchor href={"/Journal"}>Journal</Anchor>
          <Anchor href={"/radio"}>Radio</Anchor>
          <Anchor href={"/meditation"}>Meditations</Anchor>
          <Anchor href={"/about"}>About Us</Anchor>
          <Anchor href={"/contact"}>Contact</Anchor>
        </Nav>
      </Header>
      );
};
const Header = styled.header`
  background-color: white;
  height: 108px;
  position: ${props => props.pathname === '/' ? 'fixed' : ''};
  width: 100%;
  top: 0;
`;

const Nav = styled.nav`
  display: flex;
  gap: 5%;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Anchor = styled.a`
  font-size: 14px;
  text-decoration: none;
  color: #212529;
`;
export default NavBar;