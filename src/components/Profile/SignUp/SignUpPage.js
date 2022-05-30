import React, { useEffect, useCallback, useState } from "react";
import SignUpForm from "./SignUpForm";
import styled from "styled-components";
import { useAuthenticator } from "../../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import CheckEmailModal from "./verify/CheckEmailModal";
import { Image, Transformation } from "cloudinary-react";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { loggedIn } = useAuthenticator();
  const [showModal, setShowModal] = useState(false);
  const handleModal = useCallback(() => setShowModal(true), []);

  const handleHomeRedirect = useCallback(() => {
    return navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (loggedIn) return navigate("/");
  }, [loggedIn, navigate]);


  return (
    <>
      <MainContainer>
        <MainSection>
          <SectionContainer>
            <TabContainer>
              <StyledLink
                className="tab secondaryButton"
                style={{
                  borderRadius: "0.25rem 0 0 0.25rem",
                  backgroundColor: "#EFEFEF",
                  color: "#212529",
                }}
                to="/SignIn"
              >
                Login
              </StyledLink>

              <StyledLink
                className="tab signup signUpButton "
                style={{
                  borderRadius: "0 0.25rem 0.25rem 0",
                  backgroundColor: "#EDBEC4",
                }}
                to={"/SignUp"}
              >
                Sign Up
              </StyledLink>
            </TabContainer>

            <SignUpForm handleModal={handleModal} />
          </SectionContainer>
        </MainSection>
        <StyledImage
          publicId={"samples/Profile/login-image.jpg"}
          alt="Eirene plant"
          rel="preconnect"
        >
          <Transformation fetchFormat="auto" />
        </StyledImage>
      </MainContainer>
      <CheckEmailModal
        handleHomeRedirect={handleHomeRedirect}
        showModal={showModal}
        handleModal={handleModal}
      />
    </>
  );
};

// main
const MainContainer = styled.main`
  display: flex;
  min-height: 100vh;
  font-family: "Roboto", sans-serif;
  line-height: 1.5;
  color: #212529;

  @media (max-width: 991px) {
    display: grid;
    grid-template-areas:
      "image"
      "form";
    grid-template-rows: auto 1fr;
  }
`;

// right side
const StyledImage = styled(Image)`
  width: 50%;
  object-fit: cover;
  object-position: right;

  @media (max-width: 991px) {
    grid-area: image;
    width: 100%;
    height: 200px;
  }
`;

// left side
const MainSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 20px 0;
  // background: #f6f7fc;

  @media (max-width: 991px) {
    grid-area: form;
    width: 100%;
  }
`;

const SectionContainer = styled.div`
  width: 55%;

  @media (max-width: 991px) {
    width: 80%;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 3rem;
`;
const StyledLink = styled(Link)`
  cursor: pointer;
  height: 54px;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  text-decoration: none;
  color: #ffffff;
`;
export default SignUpPage;
