import React from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import "./HomePage.css";

const NavBar = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <Header pathname={location.pathname}>
      <Nav>
        <StyledLink to={"/"} className="navlink">
          Home
        </StyledLink>
        <StyledLink to={"/find-therapists"} className="navlink">
          Therapists
        </StyledLink>
        <StyledLink to={"/Journal"} className="navlink">
          Journal
        </StyledLink>
        <StyledLink to={"/radio"} className="navlink">
          Radio
        </StyledLink>
        <StyledLink to={"/meditation"} className="navlink">
          Meditations
        </StyledLink>
        <StyledLink to={"/about"} className="navlink">
          About Us
        </StyledLink>
        <StyledLink to={"/contact"} className="navlink">
          Contact
        </StyledLink>

        {/* in case of not logged in */}
        <StyledLink to={""} className="loginnav">
          <Image src={require("./images/placeholder.png")} />
          Login
        </StyledLink>

        {/* todo: in case of logged in */}
      </Nav>
    </Header>
  );
};
const Header = styled.header`
  background-color: white;
  height: 108px;
  position: ${(props) => (props.pathname === "/" ? "fixed" : "")};
  width: 100%;
  top: 0;
  font-family: FuturaLight;
`;

const Nav = styled.nav`
  display: flex;
  gap: 5%;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledLink = styled(Link)`
  font-size: 16px;
  text-decoration: none;
  color: #212529;
`;

const Image = styled.img`
  height: 25px;
  border-radius: 50%;
`;

export default NavBar;
