import React from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import "./HomePage.css";
import { useAuthenticator } from "../../context/AuthContext";
import { Dropdown } from "react-bootstrap";
import { useUser } from "../../context/UserContext";

const NavBar = () => {
  const location = useLocation();
  const { loggedIn } = useAuthenticator();
  const { userLogOut } = useUser();

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
        <Dropdown className="btn">
          <Dropdown.Toggle>
            <Image src={require("./images/placeholder.png")} />
          </Dropdown.Toggle>
          {loggedIn
            ? <Dropdown.Menu>
                <Dropdown.Item eventKey="1">
                  <Link to='/profile'>Profile</Link>
                </Dropdown.Item>
                <button onClick={userLogOut} style={{ marginLeft: 10, fontSize: 14 }}>Log out</button>
              </Dropdown.Menu>
            : <Dropdown.Menu>
                <Dropdown.Item eventKey="1">
                  <Link to='/SignIn'>Login</Link>
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">
                  <Link to='/SignUp'>SignUp</Link>
                </Dropdown.Item>
              </Dropdown.Menu>}
        </Dropdown>
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
