import React from "react";
import LoginForm from "./LoginForm";
import styled from "styled-components";
import "./loginStyle.css";
import "./icomoon/style.css";

const LoginPage = () => {
  return (
    <MainContainer>
      <MainSection>
        <SectionContainer>
          <TabContainer>
            <Anchor
              className="tab login"
              style={{
                borderRadius: "0.25rem 0 0 0.25rem",
                backgroundColor: "#EDBEC4",
              }}
            >
              Login
            </Anchor>

            <Anchor
              className="tab"
              style={{
                borderRadius: "0.25rem 0 0 0.25rem",
                backgroundColor: "#EFEFEF",
                color: "#212529",
              }}
              href={"/SignUp"}
            >
              Sign Up
            </Anchor>
          </TabContainer>
          <LoginForm />
        </SectionContainer>
      </MainSection>
      <Image src={require("./bg_4.jpg")} />
    </MainContainer>
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
const Image = styled.img`
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
  background: #f6f7fc;

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

const Button = styled.button`
  cursor: pointer;
  height: 54px;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
`;
const Anchor = styled.a`
  cursor: pointer;
  height: 54px;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  text-decoration: none;
  color: #ffffff;
`;
export default LoginPage;
