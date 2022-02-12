import React from "react";
import LoginForm from "./LoginForm";
import styled from "styled-components";
import "./loginStyle.css";

const LoginPage = () => {
  return (
    <MainContainer>
      <MainSection>
        <SectionContainer>
          <TabContainer>
            <Anchor
              style={{
                width: "50%",
                borderRadius: "0.25rem 0 0 0.25rem",
                backgroundColor: "#EDBEC4",
              }}
            >
              <p>Login</p>
            </Anchor>

            <Anchor
              style={{ width: "50%", borderRadius: "0 0.25rem 0.25rem 0" }}
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
  height: 100vh;
  font-family: "Roboto", sans-serif;
  line-height: 1.5;
  color: #212529;
`;

// right side
const Image = styled.img`
  width: 50%;
  object-fit: cover;
  object-position: right;
`;

// left side
const MainSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  background: #f6f7fc;
`;

const SectionContainer = styled.div`
  width: 55%;
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
