import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuthenticator } from "../../context/AuthContext";
import JournalEntries from "./Entries";
import { useJournal } from "../../context/JournalContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Journal = () => {
  const { loggedIn } = useAuthenticator();
  const { journalEntries } = useJournal();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  return (
    <div>
      {loggedIn ? (
        // journalEntries?.length === 0
        // ? <>
        <>
          <PageBanner>
            <BannerHeader>Journal</BannerHeader>
            <BannerPara>
              How was your day? Use your private journal to express your
              feelings and write down your thoughts.
            </BannerPara>
          </PageBanner>

          <JournalEntries setMessage={setMessage} setError={setError} />
        </>
      ) : (
        <LoggedOutPage>
          <PageBanner>
            <BannerHeader>You Are Not Logged In</BannerHeader>
            <BannerPara>Please login to access your journal.</BannerPara>
          </PageBanner>
          <ButtonHolder>
            <Link to="/SignIn">
              <SignInButton>Sign In</SignInButton>
            </Link>
            <Link to="/SignUp">
              <SignUpButton>Sign Up</SignUpButton>
            </Link>
          </ButtonHolder>
        </LoggedOutPage>
        // : <JournalEntries setMessage={setMessage} setError={setError} />
      )}
      {error ? (
        <div style={{ paddingTop: 20, flex: 1 }}>
          <Alert variant="danger">{error}</Alert>
        </div>
      ) : null}
    </div>
  );
};

export default Journal;

const PageBanner = styled.div`
  font-family: FuturaLight;
  line-height: 1.5;
  color: #212529;
  height: 200px;
  text-align: center;
  display: grid;
  align-content: center;
  justify-content: center;

  @media (max-width: 991px) {
    height: unset;
    padding: 20px;
  }
`;

const BannerHeader = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;

const BannerPara = styled.p`
  max-width: 600px;
  margin-top: 10px;
`;

const LoggedOutPage = styled.div`
  font-family: FuturaLight;
  line-height: 1.5;
  color: #212529;
  height: 65vh;
`;

const SignUpButton = styled.button`
  width: 404px;
  justify-self: center;
  border: 1px solid #edbec4;
  background-color: transparent;
  height: 54px;
  color: #212529;
  border-radius: 0.25rem;

  &:hover {
    background-color: #fbfbfb;
  }

  @media (max-width: 991px) {
    width: 350px;
  }
`;

const SignInButton = styled.button`
  width: 404px;
  justify-self: center;
  background-color: #edbec4;
  border: none;
  height: 54px;
  color: #ffffff;
  border-radius: 0.25rem;

  &:hover {
    background-color: #edafb6;
  }

  @media (max-width: 991px) {
    width: 350px;
  }
`;

const ButtonHolder = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  @media (max-width: 991px) {
    display: grid;
  }
`;
