import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuthenticator } from "../../context/AuthContext";
import JournalEntries from "./Entries";
import { useJournal } from "../../context/JournalContext";

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
          <div className="journal-banner">
            <h2>Journal</h2>
            <p>Express Your Thoughts</p>
          </div>

          <JournalEntries setMessage={setMessage} setError={setError} />
        </>
        // : <JournalEntries setMessage={setMessage} setError={setError} />
      ) : (
        <div className="journal-header-login">
          <h2>Please login to access the journal</h2>
        </div>
      )}
      {error ? (
        <div style={{ paddingTop: 20, flex: 1 }}>
          <Alert variant="danger">{error}</Alert>
        </div>
      ) : message ? (
        <div style={{ paddingTop: 20, flex: 1 }}>
          <Alert variant="success">{message}</Alert>
        </div>
      ) : null}
    </div>
  );
};

export default Journal;
