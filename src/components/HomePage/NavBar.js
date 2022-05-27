import React, { useCallback } from "react";
import styled from "styled-components";
import { useLocation, Link, NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useAuthenticator } from "../../context/AuthContext";
import { Dropdown } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import { Image, Transformation } from "cloudinary-react";
import "../Fonts/icomoon/style.css";

const NavBar = () => {
  const location = useLocation();
  const { loggedIn } = useAuthenticator();
  const { userLogOut, userImage } = useUser();
  const navigate = useNavigate();
  const logOut = useCallback(() => {
	userLogOut();
	navigate("/SignIn");
  });

  return (
    <Header pathname={location.pathname}>
      <div className="hamburger-menu"></div>

      <Nav>
        <NavLink
          className={({ isActive }) => "navlink " + (isActive && "active")}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => "navlink " + (isActive && "active")}
          to="/find-therapists"
        >
          Therapists
        </NavLink>
        <NavLink
          className={({ isActive }) => "navlink " + (isActive && "active")}
          to="/Journal"
        >
          Journal
        </NavLink>
        <NavLink
          className={({ isActive }) => "navlink " + (isActive && "active")}
          to="/about"
        >
          About Us
        </NavLink>

        <Dropdown className="btn-primary">
          <Dropdown.Toggle>
            <StyledImage
              publicId={
                userImage ? userImage : "samples/Profile/navbar-profile"
              }
              alt="profile"
            >
              <Transformation fetchFormat="auto" />
            </StyledImage>
          </Dropdown.Toggle>
          {loggedIn ? (
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to="/profile"
                style={{ textDecorationLine: "none", color: "#212529" }}
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={logOut}
                style={{ fontSize: 15, fontWeight: "500" }}
              >
                Log out
              </Dropdown.Item>
            </Dropdown.Menu>
          ) : (
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to="/SignIn"
                style={{
                  textDecoration: "none",
                  color: "#212529",
                }}
              >
                Login
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                as={Link}
                to="/SignUp"
                style={{
                  textDecoration: "none",
                  color: "#212529",
                }}
              >
                Sign Up
              </Dropdown.Item>
            </Dropdown.Menu>
          )}
        </Dropdown>
      </Nav>
    </Header>
  );
};

const Header = styled.header`
  background-color: #ffffff;
  height: 108px;
  position: ${(props) => (props.pathname === "/" || props.pathname === "/about" ? "fixed" : "")};
  // position: fixed;
  width: 100%;
  top: 0;
  font-family: FuturaLight;
  padding-bottom: 15px;
  z-index: 1;

  @media (max-width: 991px) {
    height: 73px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 5%;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledImage = styled(Image)`
  height: 25px;
  width: 25px;
  border-radius: 50%;
`;

export default NavBar;
