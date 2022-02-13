import React from "react";
import SignUpForm from "./SignUpForm";
import styled from "styled-components";

const SignUpPage = () => {
  return (
    <MainContainer>
      <MainSection>
        <SectionContainer>
          <TabContainer>
            <Anchor
              className="tab"
              style={{
                borderRadius: "0.25rem 0 0 0.25rem",
                backgroundColor: "#EFEFEF",
                color: "#212529",
              }}
              href={'/SignIn'}
            >
              Login
            </Anchor>

            <Anchor
              className="tab"
              style={{
                borderRadius: "0 0.25rem 0.25rem 0",
                backgroundColor: "#EDBEC4",
              }}
              href={"/SignUp"}
            >
              Sign Up
            </Anchor>
          </TabContainer>

          <SignUpForm />
        </SectionContainer>
      </MainSection>
      <Image src={require("./bg_4.jpg")} alt="Eirene plant" />
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
  height: 100%;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 3rem;
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
export default SignUpPage;
