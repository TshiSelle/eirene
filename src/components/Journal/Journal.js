import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuthenticator } from "../../context/AuthContext";
import JournalEntries from "./Entries";
import { useJournal } from "../../context/JournalContext";
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
        // : <JournalEntries setMessage={setMessage} setError={setError} />
        <div className="journal-header-login">
          <h2>Please login to access the journal</h2>
        </div>
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
  height: 255px;
  text-align: center;
  display: grid;
  align-content: center;
  justify-content: center;
`;

const BannerHeader = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;

const BannerPara = styled.p`
  max-width: 600px;
  margin-top: 10px;
`;
