import React from "react";
import styled from "styled-components";
import { useLocation, Link, NavLink } from "react-router-dom";
import "./navbar.css";
import { useAuthenticator } from "../../context/AuthContext";
import { Dropdown } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import { Image, Transformation } from "cloudinary-react";
import "./font/icomoon/style.css";

const NavBar = () => {
  const location = useLocation();
  const { loggedIn } = useAuthenticator();
  const { userLogOut, userImage } = useUser();

  return (
    <Header pathname={location.pathname}>
      <div class="hamburger-menu"></div>

      <Nav>
        {/* <StyledLink to={"/"} className="navlink">
          Home
        </StyledLink>

        <StyledLink to={"/find-therapists"} className="navlink">
          Therapists
        </StyledLink>

        <StyledLink to={"/Journal"} className="navlink">
          Journal
        </StyledLink>

        <StyledLink to={"/about"} className="navlink">
          About Us
        </StyledLink> */}

        <NavLink activeClassName="active" className={"navlink"} to="/">Home</NavLink>
        <NavLink activeClassName="active" className={"navlink"} to="/find-therapists">Therapists</NavLink>
        <NavLink activeClassName="active" className={"navlink"} to="/Journal">Journal</NavLink>
        <NavLink activeClassName="active" className={"navlink"} to="/about">About Us</NavLink>

        <Dropdown className="btn-primary">
          <Dropdown.Toggle>
            <StyledImage publicId={userImage ?  userImage : "samples/Profile/navbar-profile"}>
              <Transformation fetchFormat="auto" />
            </StyledImage>
          </Dropdown.Toggle>
          {loggedIn ? (
            <Dropdown.Menu>
			  <Dropdown.Item as={Link} to="/profile" style={{ textDecorationLine: 'none', color: '#212529' }}>
                Profile
			  </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={userLogOut}
                style={{ fontSize: 15, fontWeight: '500' }}
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
			  }}>
                  Login
			  </Dropdown.Item>
              <Dropdown.Divider />
			  <Dropdown.Item 
			  as={Link} 
			  to="/SignUp"
              style={{
                textDecoration: "none",
                color: "#212529",
			  }}>
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
  background-color: white;
  height: 108px;
  position: ${(props) => (props.pathname === "/" ? "fixed" : "")};
  width: 100%;
  top: 0;
  font-family: FuturaLight;
  padding-bottom: 15px;

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

// const StyledLink = styled(Link)`
//   font-size: 15px;
//   text-decoration: none;
//   color: #212529;
// `;

const StyledImage = styled(Image)`
  height: 25px;
  border-radius: 50%;
`;

export default NavBar;
