import React from "react";
import styled from "styled-components";
import { useLocation, Link } from 'react-router-dom'

const NavBar = () => {
    const location = useLocation();
  console.log(location.pathname);
  return (
      <Header pathname={location.pathname}>
        <Nav>
          <StyledLink to={"/"}>Home</StyledLink>
          <StyledLink to={"/find-therapists"}>Therapists</StyledLink>
          <StyledLink to={"/Journal"}>Journal</StyledLink>
          <StyledLink to={"/radio"}>Radio</StyledLink>
          <StyledLink to={"/meditation"}>Meditations</StyledLink>
          <StyledLink to={"/about"}>About Us</StyledLink>
          <StyledLink to={"/contact"}>Contact</StyledLink>
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

const StyledLink = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  color: #212529;
`;
export default NavBar;