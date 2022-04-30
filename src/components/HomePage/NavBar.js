import React from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import "./HomePage.css";
import { useAuthenticator } from "../../context/AuthContext";
import { Dropdown } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import { Image, Transformation } from "cloudinary-react";

const NavBar = () => {
  const location = useLocation();
  const { loggedIn } = useAuthenticator();
  const { userLogOut, userImage } = useUser();

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
        <StyledLink to={"/Meditations"} className="navlink">
          Meditations
        </StyledLink>
        <StyledLink to={"/about"} className="navlink">
          About Us
        </StyledLink>
        <StyledLink to={"/contact"} className="navlink">
          Contact
        </StyledLink>
        <Dropdown className="btn-primary">
          <Dropdown.Toggle>
            <StyledImage publicId={userImage ?  userImage : "samples/Profile/navbar-profile"}>
              <Transformation fetchFormat="auto" />
            </StyledImage>
          </Dropdown.Toggle>
          {loggedIn ? (
            <Dropdown.Menu>
              <Link to="/profile" style={{ marginLeft: 10, textDecorationLine: 'none', color: '#212529' }}>
                Profile
              </Link>
              <Dropdown.Divider />
              <button
                onClick={userLogOut}
                style={{ marginLeft: 5, fontSize: 15, fontWeight: '500' }}
              >
                Log out
              </button>
            </Dropdown.Menu>
          ) : (
            <Dropdown.Menu>
              <div>
                <Link
                  to="/SignIn"
                  style={{
                    marginLeft: 10,
                    textDecoration: "none",
                    color: "#212529",
                  }}
                >
                  Login
                </Link>
                <Dropdown.Divider />
                <Link
                  to="/SignUp"
                  style={{
                    marginLeft: 10,
                    textDecoration: "none",
                    color: "#212529",
                  }}
                >
                  SignUp
                </Link>
              </div>
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

const StyledImage = styled(Image)`
  height: 25px;
  border-radius: 50%;
`;

export default NavBar;
